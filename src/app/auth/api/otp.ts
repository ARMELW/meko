import { authClient } from "@/config/auth";
import { LoginOtpData } from "../";

export async function sendOtpVerification(
    data: LoginOtpData): Promise<void> {
    await authClient.emailOtp.sendVerificationOtp(
        {
            email: data.email,
            type: "sign-in"
        }, {
            headers: {
               'X-APP': 'ADMIN_APP',
            }
        }
    );
}