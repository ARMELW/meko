import { useState } from 'react';
import { verifyOtp, VerifyOtpData } from "..";
import { useTranslation } from 'react-i18next';
import { toast } from "sonner"
export function useVerifyOtpAuth() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);


    const initiateVerifyOtpLogin = async (
        data: VerifyOtpData
    ): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            await verifyOtp(
                data
            );
            toast(t('auth.success'))
        } catch (unexpectedError) {
            console.error("Unexpected error during OTP login:", unexpectedError);
            setError(unexpectedError);
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        initiateVerifyOtpLogin,
    };
}