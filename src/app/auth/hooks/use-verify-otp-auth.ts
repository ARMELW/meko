import { useState } from 'react';
import { verifyOtp, VerifyOtpData } from "..";
import { VerifyOtpOptions } from '../types';
import { toast } from 'sonner';

export function useVerifyOtpAuth() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);

    const initiateVerifyOtpLogin = async (
        data: VerifyOtpData,
        options: VerifyOtpOptions = { isSignUp: false }
    ): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            await verifyOtp(data, options);

            // Toast de succès selon le type de connexion (seulement si pas d'erreur)
            if (options.isSignUp) {
                toast.success('Compte créé avec succès !', {
                    position: 'bottom-right',
                    description: 'Bienvenue sur Meko Academy',
                    duration: 5000,
                    icon: '🎉'
                });
            } else {
                toast.success('Connexion réussie !', {
                    position: 'bottom-right',
                    description: 'Bienvenue sur Meko Academy',
                    duration: 5000,
                    icon: '✅'
                });
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (unexpectedError) {
            console.error("Unexpected error during OTP login:", unexpectedError);
            setError(unexpectedError);
            
            // Vérifier si c'est une erreur d'OTP incorrect
            const errorMessage = unexpectedError instanceof Error ? unexpectedError.message : String(unexpectedError);
            
            if (errorMessage.toLowerCase().includes('authentification') || 
                errorMessage.toLowerCase().includes('otp') ||
                errorMessage.toLowerCase().includes('code')) {
                // Toast d'erreur spécifique pour OTP incorrect
                toast.error('Code de vérification incorrect', {
                    position: 'bottom-right',
                    description: 'Veuillez vérifier le code et réessayer',
                    duration: 5000,
                    icon: '❌'
                });
            } else {
                // Toast d'erreur générique pour autres erreurs
                toast.error('Erreur de connexion', {
                    position: 'bottom-right',
                    description: 'Une erreur est survenue, veuillez réessayer',
                    duration: 5000,
                    icon: '⚠️'
                });
            }
            
            // Re-lancer l'erreur pour que le composant parent puisse la gérer
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