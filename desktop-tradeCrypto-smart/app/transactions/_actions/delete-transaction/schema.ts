import { z } from "zod";

export const deleteTransactionSchema = z.object({
  transactionId: z.string().uuid(),
});

export type deleteTransactionSchema = z.infer<typeof deleteTransactionSchema>;
