import * as z from "zod";
import { authService } from "../services/auth.service";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .pipe(z.email("Invalid email address"))
      .refine(
        async (email: string) => {
          const isExist = await authService.existingEmail(email);
          return isExist === 0;
        },
        { message: "Email already exists" },
      ),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .pipe(z.email("Invalid email address")),
    password: z.string().min(1, "Password is required"),
  }),
});
