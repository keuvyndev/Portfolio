import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { auth } from "@clerk/nextjs/server";

export const getDashboard = async (month: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const where = {
    // Inclui validação do mês.
    userId,
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        // Retorna o somátorio de depósitos encontrados no banco
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        // Retorna o somátorio de investimentos encontrados no banco
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        // Retorna o somátorio de gastos encontrados no banco
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );

  const balance = depositsTotal - expensesTotal - investmentsTotal;

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  // Traz as porcentagens de forma tipada.
  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] =
    /* Agrupa todas as despesas por categoria e soma
       Exemplo: 
       {
        HOUSING: 2500,
        FOOD: 500,
        ...
       }
    */
    (
      await db.transaction.groupBy({
        by: ["category"],
        where: {
          ...where,
          type: TransactionType.EXPENSE,
        },
        _sum: {
          amount: true,
        },
      })
    )
      // Para cada item monta o objeto com nome da categoria, valorTotal e porcentagem.
      .map((category) => ({
        category: category.category,
        totalAmount: Number(category._sum.amount),
        percentageOfTotal: Math.round(
          (Number(category._sum.amount) / Number(expensesTotal)) * 100,
        ),
      }));

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 20,
  });

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};
