import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Typography } from "@/components";
import { useForm } from "react-hook-form";
import ControlledOtpInput from "@/components/molecules/form/controlled-otp-input";
import { LoadingButton } from "@/components/atoms/actions/loading-button";
import { handleSimpleApiError } from "@/utils/error-handler";
import { useNavigate } from "react-router";
import { OtpFormData, otpSchema } from "@/app/auth";
import { useVerifyOtpRegister } from "@/app/auth/hooks/use-verify-otp-register";

export interface OtpRegisterStepProps {
  email: string;
  firstName?: string;
  lastName?: string;
}

export function OtpRegisterStep({ email, firstName = '', lastName = '' }: OtpRegisterStepProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, initiateVerifyOtpRegister } = useVerifyOtpRegister();
  const { control, handleSubmit } = useForm<OtpFormData>({
    defaultValues: { otp: "" },
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
  });

  if (!email) {
    navigate("/login");
    return null;
  }

  const onSubmit = async (data: OtpFormData) => {
    try {
      await initiateVerifyOtpRegister({
        email,
        otp: data.otp,
        firstName,
        lastName
      });
      navigate("/subscription");
    } catch (error) {
      handleSimpleApiError(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[90%] sm:max-w-[520px] md:max-w-[580px] mx-auto">
        <div className="flex flex-col justify-center items-center w-full">
          <img 
            src="/logo.svg" 
            className="w-32 sm:w-40 md:w-48 pb-6 sm:pb-8 md:pb-10" 
            alt="Meko Academy"
          />
          <Card className="w-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <Typography 
                variant='h1' 
                className="text-lg sm:text-xl md:text-2xl text-center"
              >
                {t('auth.otpTitle')}
              </Typography>
              <Typography 
                align="center" 
                className="text-sm sm:text-base px-2 sm:px-4 text-gray-400"
              >
                {t('auth.otpInstruction')}
              </Typography>
            </div>
            <div className="flex flex-col gap-3 py-8 w-full max-w-none sm:max-w-[400px] md:max-w-[480px]">
              <ControlledOtpInput 
                name="otp" 
                control={control} 
                className="w-full"
              />
            </div>
            <LoadingButton
              loading={loading}
              type="submit"
              size="small"
              color="secondary"
              className="w-full sm:w-[200px] md:w-[240px]"
            >
              {t('auth.validate')}
            </LoadingButton>
          </Card>
        </div>
      </form>
    </div>
  );
}
