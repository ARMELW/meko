import { z } from "zod";
import { loginSchema, otpSchema, signUpSchema } from './schema';
export interface LoginOtpData {
    email: string;
}

export interface VerifyOtpData {
    email: string;
    otp: string;
}
export interface VerifyOtpOptions {
    isSignUp?: boolean;
    firstName?: string;
    lastName?: string;
}


export type LoginFormData = z.infer<typeof loginSchema>;

export type OtpFormData = z.infer<typeof otpSchema>;

export type SignUpFormData = z.infer<typeof signUpSchema>;