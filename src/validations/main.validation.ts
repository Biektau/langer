import { ZodError, ZodSchema } from "zod";
export function validateData<T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: boolean; errors?: string[] } {
  try {
    schema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue) => issue.message);
      return { success: false, errors: errorMessages };
    }
    throw error;
  }
}
