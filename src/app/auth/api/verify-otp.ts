import { authClient } from "@/config/auth";
import { VerifyOtpData } from "../";
import { VerifyOtpOptions } from "../types";


export async function verifyOtp(
    data: VerifyOtpData,
    options: VerifyOtpOptions = { isSignUp: false }
): Promise<void> {
    const { error: authError } = await authClient.signIn.emailOtp({
        email: data.email,
        otp: data.otp,
    });

    if (authError) {
        throw new Error(`Erreur d'authentification: ${authError.message}`);
    }

    if (options.isSignUp && (options.firstName || options.lastName)) {
        const name = [options.firstName, options.lastName]
            .filter(Boolean)
            .join(' ');

        if (name.trim()) {
            const { error: updateError } = await authClient.updateUser({
                name: name.trim(),
                firstname: options.firstName,
                lastname: options.lastName
            });

            if (updateError) {
                throw new Error(`Erreur de mise à jour du profil: ${updateError.message}`);
            }
        }
    }
}