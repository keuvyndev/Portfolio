import { isMatch } from "date-fns";
import { z } from "zod";

// Valida o mês
export const generateAiReportSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM")),
});

// Cria o tipo de dado
export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;
