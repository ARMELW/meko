import { useState } from 'react';
import { sendOtpVerification } from '../api/otp';
import { LoginOtpData } from "../";
import { useTranslation } from 'react-i18next';
import { toast } from "sonner"
export function useOtpAuth() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);


    const initiateOtpLogin = async (
        data: LoginOtpData
    ): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            await sendOtpVerification(
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
        initiateOtpLogin,
    };
}