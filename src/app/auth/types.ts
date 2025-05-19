import { z } from "zod";
import { loginSchema, otpSchema } from './schema';
export interface LoginOtpData {
    email: string;
}

export interface VerifyOtpData {
    email: string;
    otp: string;
}

export type LoginFormData = z.infer<typeof loginSchema>;

export type OtpFormData = z.infer<typeof otpSchema>;
