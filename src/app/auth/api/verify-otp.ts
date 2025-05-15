import { authClient } from "@/config/auth";
import { VerifyOtpData } from "../";

export async function verifyOtp(
    data: VerifyOtpData): Promise<void> {
    await authClient.signIn.emailOtp({
        email: data.email,
        otp: data.otp,
    })
}