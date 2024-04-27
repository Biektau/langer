import { z, ZodError } from "zod";

const createUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3),
});

const updateUserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(3).optional(),
});

export function validateCreateUserData(data: unknown): {
  success: boolean;
  errors?: string[];
} {
  return validateData(createUserSchema, data);
}

export function validateUpdateUserData(data: unknown): {
  success: boolean;
  errors?: string[];
} {
  return validateData(updateUserSchema, data);
}

function validateData<T>(
  schema: z.ZodSchema<T>,
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
