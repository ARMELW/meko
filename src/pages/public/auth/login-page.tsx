
import { LoginFormData, loginSchema, } from "@/app/auth";
import { useOtpAuth } from "@/app/auth/hooks/use-otp-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Typography } from "@/components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ControlledTextInput } from "@/components/molecules/form/controlled-input";
import { Loader2 } from 'lucide-react';
import { useTranslation } from "react-i18next";
const defaultValues: LoginFormData = {
  email: "",
};
function LoginPage() {
  const navigate = useNavigate();
   const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { loading, initiateOtpLogin } = useOtpAuth();

  const {
    control,
    handleSubmit
  } = useForm<LoginFormData>({
    defaultValues,
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
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

      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col justify-center items-center w-[350px]">
          <img src="/logo.svg" className="pb-10" />
          <Card className="flex flex-col justify-center items-center p-8">

            <div className="flex flex-col justify-center items-center">
              <Typography variant='h1'>
                Bienvenue sur Meko Academy
              </Typography>
              <Typography align="center">
                Entrez votre adresse email pour continuer !
              </Typography>
            </div>
            <div className="flex flex-col gap-3 py-4 w-full">
              <ControlledTextInput
                name="email"
                control={control}
                type="email"
                autoComplete="email"
                placeholder="mekoacademy@email.com"
                disabled={loading || isSubmitted}
              />
            </div>

            <Button
              type="submit"
              size="small"
              color="secondary"
            >
              {loading ? <Loader2 /> : t('auth.connect')}

            </Button>
          </Card>
        </div>

      </form>
    </div>
  );
}

export { LoginPage };
