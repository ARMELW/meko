import { useState } from 'react';
import { verifyOtp, VerifyOtpData } from "..";
import { VerifyOtpOptions } from '../types';

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

            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (unexpectedError) {
            console.error("Unexpected error during OTP login:", unexpectedError);
            setError(unexpectedError);
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