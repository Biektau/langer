import { z } from "zod";

export const createDictionarySchema = z.object({
  userId: z.string().min(1),
  languageId: z.string().min(1),
  name: z.string().min(1),
});
