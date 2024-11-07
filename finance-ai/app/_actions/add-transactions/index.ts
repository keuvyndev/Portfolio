"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

// Definindo interface da operação
interface UpsertTransactionParams {
  id?: string; // Recebe apenas se for uma atualização, por isso é "opcional".
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  // Validação a operação
  upsertTransactionSchema.parse(params);

  // Captura o userId do usuário para efetuar a adição
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  /* Faz uma operação condicional
  1. Se no banco houver uma ID igual a id que recebeu: Faz um UPDATE atualizando tudo.
  2. Se não: Cria um novo usando todos os parâmetros.
  */
  await db.transaction.upsert({
    where: {
      id: params.id,
    },
    update: { ...params, userId },
    create: { ...params, userId },
  });

  //Forçar recarregamento da página
  revalidatePath("/transactions");
};
