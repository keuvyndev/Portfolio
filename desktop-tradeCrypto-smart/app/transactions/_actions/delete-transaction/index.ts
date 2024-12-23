"use server";

import { db } from "@/app/_lib/prisma";
import { deleteTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async ({
  transactionId,
}: deleteTransactionSchema) => {
  await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });

  revalidatePath("/transactions");
  revalidatePath("/");
};
