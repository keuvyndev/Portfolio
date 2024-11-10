import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "./types";

export const getDashboard = async (month: string) => {
  const where = {
    // Inclui validação do mês.
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

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
  };
};
