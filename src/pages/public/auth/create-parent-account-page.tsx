
import { useOtpAuth, useCheckEmail } from "@/app/auth";
import { signUpSchema } from "@/app/auth/schema";
import { SignUpFormData } from "@/app/auth/types";
import { Label, Typography } from "@/components";
import { LoadingButton } from "@/components/atoms/actions/loading-button";
import { ControlledTextInput } from "@/components/molecules/form/controlled-input";
import { handleSimpleApiError } from "@/utils/error-handler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
const defaultValues: SignUpFormData = {
  email: "",
  firstName: "",
  lastName: ""
};
function CreateParentAccountPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { loading, initiateOtpLogin } = useOtpAuth();
  const { checkEmail, loading: checkingEmail, clearCache } = useCheckEmail();
  const {
    control,
    handleSubmit
  } = useForm<SignUpFormData>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });
  const onSubmit = useCallback(async (data: SignUpFormData) => {
    // Éviter les soumissions multiples
    if (isProcessing || loading || checkingEmail) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Vérifier si l'email existe déjà
      const { exists } = await checkEmail({ email: data.email });
      
      if (exists) {
        // Email déjà utilisé, afficher un message et rediriger vers login
        toast.error(t('auth.errors.email.alreadyExists'));
        
        // Attendre un petit délai pour que l'utilisateur puisse voir le toast
        setTimeout(() => {
          navigate("/login", {
            state: {
              email: data.email,
              message: t('auth.errors.email.alreadyExists')
            }
          });
        }, 1500);
        return;
      }

      // Email disponible, procéder à la création du compte
      await initiateOtpLogin({
        email: data.email
      });
      
      setIsSubmitted(true);
      
      navigate("/verify-otp", {
        state: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          isSignUp: true
        },
      });
    } catch (error) {
      handleSimpleApiError(error);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, loading, checkingEmail, checkEmail, t, navigate, initiateOtpLogin]);
  return <div className="flex flex-col justify-center items-center w-full h-screen">

    <div>
      <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>


        <Typography as="h3" align={"center"}>
          {t('auth.createAccount')}
        </Typography>

        <Typography as="p" align={"left"}>
          {t('auth.provideInfo')}
        </Typography>

        <div className="flex flex-row gap-4">
          <div className="input-container w-[50%]">
            <Label uppercase>
              <span className="text-[13px]">
                {t('auth.firstName')}
              </span>
            </Label>
            <ControlledTextInput
              name="firstName"
              control={control}
              placeholder="Nom"
              size="w-full"
              disabled={isSubmitted || isProcessing}
            />
          </div>
          <div className="input-container">
            <Label uppercase>
              <span className="text-[13px]">
                {t('auth.lastName')}
              </span>
            </Label>
            <ControlledTextInput
              name="lastName"
              control={control}
              placeholder="Prénom"
              size="w-full"
              disabled={isSubmitted || isProcessing}
            />
          </div>
        </div>

        <div className="w-full">
          <div className="input-container">
            <div className="w-full">
              <Label uppercase>
                <span className="text-[13px]" >
                  {t('auth.email')}
                </span>
              </Label>
              <ControlledTextInput 
                name="email"
                control={control}
                type="email"
                autoComplete="off"
                placeholder="mekoacademy@email.com"
                size="w-full"
                disabled={isSubmitted || isProcessing}
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <Typography as={"p"} className="text-sm text-center">
            {t('auth.termsAgreement')} <Link to="#" className="text-meko-blue-light-1">{t('auth.termsLink')}</Link>.
          </Typography>
        </div>

        <div className="flex justify-center w-full">
          <LoadingButton
            loading={loading || checkingEmail || isProcessing}
            type="submit"
            size="small"
            color="secondary"
          >
            {t('auth.signUp')}

          </LoadingButton>
        </div>
        <div className="flex justify-center w-full">
          <Typography as={"p"} className="text-center">
            <Link to={'/login'} className="block text-meko-blue-light-1 text-sm text-center">{t('auth.alreadyHaveAccount')}</Link>
          </Typography>
        </div>

      </form>
    </div>


  </div>;
}

export { CreateParentAccountPage };
