import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(254, "Email must not exceed 254 characters")
    .pipe(z.email("Enter a valid email address")),

  password: z
    .string()
    .min(1, "Password is required")
    .max(72, "Password is too long"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
