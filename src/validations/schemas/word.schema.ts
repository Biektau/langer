import { z } from "zod";

export const createWordAISchema = z.object({
  userId: z.string().min(1),
  languageId: z.string().min(1),
  dictionaryId: z.string().min(1),
  original: z.string().min(1),
});

export const createWordManuallySchema = z.object({
  userId: z.string().min(1),
  languageId: z.string().min(1),
  dictionaryId: z.string().min(1),
  original: z.string().min(1),
  translate: z.string().min(1),
});
