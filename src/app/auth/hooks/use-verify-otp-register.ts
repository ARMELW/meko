import { useState } from 'react';
import { verifyOtpRegister, VerifyOtpData } from "..";
import type { VerifyOtpRegisterOptions } from "../api/verify-otp";
import { toast } from 'sonner';

export function useVerifyOtpRegister() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);

    const initiateVerifyOtpRegister = async (
        data: VerifyOtpData & VerifyOtpRegisterOptions,
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const { email, otp, firstName, lastName } = data;
            await verifyOtpRegister({ email, otp }, { firstName, lastName });
            toast.success('Compte créé avec succès !', {
                position: 'bottom-right',
                description: 'Bienvenue sur Meko Academy',
                duration: 5000,
                icon: '🎉'
            });
        } catch (unexpectedError) {
            setError(unexpectedError);
            const errorMessage = unexpectedError instanceof Error ? unexpectedError.message : String(unexpectedError);
            if (errorMessage.toLowerCase().includes('authentification') || 
                errorMessage.toLowerCase().includes('otp') ||
                errorMessage.toLowerCase().includes('code')) {
                toast.error('Code de vérification incorrect', {
                    position: 'bottom-right',
                    description: 'Veuillez vérifier le code et réessayer',
                    duration: 5000,
                    icon: '❌'
                });
            } else {
                toast.error('Erreur de création de compte', {
                    position: 'bottom-right',
                    description: 'Une erreur est survenue, veuillez réessayer',
                    duration: 5000,
                    icon: '⚠️'
                });
            }
            throw unexpectedError;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        initiateVerifyOtpRegister,
    };
}
// No trailing brace here
