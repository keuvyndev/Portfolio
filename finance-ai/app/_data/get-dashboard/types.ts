import { TransactionType } from "@prisma/client";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};
