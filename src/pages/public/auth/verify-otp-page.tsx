import { OtpFormData, otpSchema, useVerifyOtpAuth, } from "@/app/auth";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Typography } from "@/components";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import ControlledOtpInput from "@/components/molecules/form/controlled-otp-input";
import { LoadingButton } from "@/components/atoms/actions/loading-button";
import { handleSimpleApiError } from "@/utils/error-handler";
import { useState } from "react";
const defaultValues: OtpFormData = {
  otp: "",
};
function VerifyOtpPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading,setLoading] = useState(false)
  const { initiateVerifyOtpLogin } = useVerifyOtpAuth();
  const email = location.state?.email;
  const firstName = location.state?.firstName || '';
  const lastName = location.state?.lastName || '';
  const isSignUp = location.state?.isSignUp || false;

  if (!email) {
    navigate("/login");
  }
  const {
    control,
    handleSubmit,
  } = useForm<OtpFormData>({
    defaultValues,
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
  });
  const onSubmit = async (data: OtpFormData) => {
    try {
      setLoading(true);
      
      await initiateVerifyOtpLogin({
        email: email,
        otp: data.otp,
      }, {
        isSignUp,
        firstName,
        lastName
      });
      
      if (isSignUp) {
        navigate("/subscription");
      } else {
        navigate("/profile/choose");
      }
      
    } catch (error) {
      // En cas d'erreur, ne pas naviguer et afficher l'erreur
      handleSimpleApiError(error);
    } finally {
      setLoading(false);
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
                {t('auth.otpTitle', 'CODE A 6 CHIFFRES')}
              </Typography>
              <Typography 
                align="center" 
                className="text-sm sm:text-base px-2 sm:px-4 text-gray-400"
              >
                {t('auth.otpInstruction', 'Veuillez saisir le code envoyé à votre adresse email')}
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
              {t('auth.validate', 'Valider')}
            </LoadingButton>
          </Card>
        </div>
      </form>
    </div>
  );
}

export { VerifyOtpPage };
