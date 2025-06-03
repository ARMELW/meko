import { authClient } from "@/config/auth";
import { VerifyOtpData } from "../";
import { VerifyOtpOptions } from "../types";

export async function verifyOtp(
    data: VerifyOtpData,
    options: VerifyOtpOptions = { isSignUp: false }
): Promise<void> {
    const promises: Promise<{ error?: { message: string } | null }>[] = [];

    const otpPromise = authClient.signIn.emailOtp({
        email: data.email,
        otp: data.otp,
    }).then(result => 
        result.error ? { error: { message: result.error.message || "Unknown error" } } : {}
    );
    promises.push(otpPromise);

    let updatePromise: Promise<{ error?: { message: string } | null }> | null = null;
    if (options.isSignUp && (options.firstName || options.lastName)) {
        const name = [options.firstName, options.lastName]
            .filter(Boolean)
            .join(' ')
            .trim();

        if (name) {
            updatePromise = authClient.updateUser({
                name,
                firstname: options.firstName,
                lastname: options.lastName
            }).then(result =>
                result.error ? { error: { message: result.error.message || "Unknown error" } } : {}
            );
            promises.push(updatePromise);
        }
    }

    const results = await Promise.all(promises);
    
    const [otpResult, updateResult] = results;
    
    if (otpResult.error) {
        throw new Error(`Erreur d'authentification: ${otpResult.error.message}`);
    }

    if (updateResult && updateResult.error) {
        throw new Error(`Erreur de mise à jour du profil: ${updateResult.error.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, 100));
}