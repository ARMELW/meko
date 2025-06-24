
import { LoginFormData, loginSchema, } from "@/app/auth";
import { useOtpAuth } from "@/app/auth/hooks/use-otp-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Typography } from "@/components";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { ControlledTextInput } from "@/components/molecules/form/controlled-input";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@/components/atoms/actions/loading-button";
import { handleSimpleApiError } from "@/utils/error-handler";
import { toast } from "sonner";
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { loading, initiateOtpLogin } = useOtpAuth();

  // Récupérer l'email et le message depuis l'état de navigation
  const stateEmail = location.state?.email || "";
  const stateMessage = location.state?.message;

  const {
    control,
    handleSubmit,
    setValue
  } = useForm<LoginFormData>({
    defaultValues: {
      email: stateEmail
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  // Afficher le message si présent
  useEffect(() => {
    if (stateMessage) {
      toast.info(stateMessage);
    }
    if (stateEmail) {
      setValue("email", stateEmail);
    }
  }, [stateMessage, stateEmail, setValue]);
  const onSubmit = async (data: LoginFormData) => {
    try {
      await initiateOtpLogin({
        email: data.email,
      });
      setIsSubmitted(true);
      navigate("/verify-otp", {
        state: {
          email: data.email,
          isSignUp: false
        },
      });
    } catch (error) {
      handleSimpleApiError(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full p-4">


      <div className="flex flex-col justify-center items-center w-full max-w-md">
        <img src="/logo.svg" className="pb-10 w-32 sm:w-40" />
        <Card className="flex flex-col justify-center items-center p-4 sm:p-8 w-full">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col justify-center items-center">
              <Typography as="p" className="text-sm sm:text-base text-center">
                Bienvenue sur Meko Academy
              </Typography>
              <Typography align="center" as="p" className="text-sm sm:text-base mt-2">
                Entrez votre adresse email pour continuer !
              </Typography>
            </div>
            <div className="flex flex-col gap-3 py-4 w-full px-2 sm:px-4">
              <ControlledTextInput
                name="email"
                control={control}
                type="email"
                autoComplete="off"
                placeholder="mekoacademy@email.com"
                size="w-full"
                disabled={loading || isSubmitted}
              />
            </div>
            <div className="flex flex-row justify-center items-center w-full">
              <LoadingButton
                loading={loading}
                type="submit"
                size="small"
                color="secondary"
                className=""
              >
                {t('auth.connect')}

              </LoadingButton>
            </div>
          </form>
        </Card>

      </div>

    </div>
  );
}

export { LoginPage };
