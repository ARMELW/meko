import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "email.required")
    .email("email.invalid"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "otp.required")  
    .max(6, "otp.length")         
    .regex(/^\d+$/, "otp.invalid"),
});
