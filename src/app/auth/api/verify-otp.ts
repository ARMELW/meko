
import { authClient } from "@/config/auth";
import { VerifyOtpData } from "../";

export async function verifyOtpLogin(data: VerifyOtpData): Promise<void> {

    const { error: authError } = await authClient.signIn.emailOtp({
        email: data.email,
        otp: data.otp,
    });
    if (authError) {
        throw new Error(`Erreur d'authentification: ${authError.message}`);
    }
}

export interface VerifyOtpRegisterOptions {
    firstName?: string;
    lastName?: string;
}

export async function verifyOtpRegister(
    data: VerifyOtpData,
    options: VerifyOtpRegisterOptions = {}
): Promise<void> {
    const authPromise = authClient.signIn.emailOtp({
        email: data.email,
        otp: data.otp,
    });
    let updatePromise: Promise<unknown> | undefined = undefined;
    if (options.firstName || options.lastName) {
        const name = [options.firstName, options.lastName]
            .filter(Boolean)
            .join(' ');
        if (name.trim()) {
            updatePromise = authClient.updateUser({
                name: name.trim(),
                firstname: options.firstName,
                lastname: options.lastName
            });
        }
    }
    const [authResult, updateResult] = await Promise.all([
        authPromise,
        updatePromise ?? Promise.resolve(undefined)
    ]);
    if (authResult.error) {
        throw new Error(`Erreur d'authentification: ${authResult.error.message}`);
    }
    if (updateResult && typeof updateResult === 'object' && 'error' in updateResult && updateResult.error) {
        const errorObj = updateResult.error as { message?: string };
        const msg = typeof errorObj.message === 'string' ? errorObj.message : 'Erreur inconnue';
        throw new Error(`Erreur de mise à jour du profil: ${msg}`);
    }
}
