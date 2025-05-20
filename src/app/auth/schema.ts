import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "auth.errors.email.required")
    .email("auth.errors.email.invalid"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "auth.errors.otp.required")  
    .max(6, "auth.errors.otp.length")         
    .regex(/^\d+$/, "auth.errors.otp.invalid"),
});

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "auth.errors.email.required")
    .email("auth.errors.email.invalid"),
  firstName: z
    .string()
    .min(1, "auth.errors.firstName.required"),
  lastName: z
    .string()
    .optional()
});