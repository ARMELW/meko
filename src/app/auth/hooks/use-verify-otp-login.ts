import { useState } from 'react';
import { verifyOtpLogin, VerifyOtpData } from "..";
import { toast } from 'sonner';

export function useVerifyOtpLogin() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);

    const initiateVerifyOtpLogin = async (
        data: VerifyOtpData
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await verifyOtpLogin(data);
            toast.success('Connexion réussie !', {
                position: 'bottom-right',
                description: 'Bienvenue sur Meko Academy',
                duration: 5000,
                icon: '✅'
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
                toast.error('Erreur de connexion', {
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
        initiateVerifyOtpLogin,
    };
}
