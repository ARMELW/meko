
import { useOtpAuth } from "@/app/auth";
import { signUpSchema } from "@/app/auth/schema";
import { SignUpFormData } from "@/app/auth/types";
import { Button, Label, Typography } from "@/components";
import { ControlledTextInput } from "@/components/molecules/form/controlled-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
const defaultValues: SignUpFormData = {
  email: "",
  firstName: "",
  lastName: ""
};
function CreateParentAccountPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { loading, initiateOtpLogin } = useOtpAuth();
  const {
    control,
    handleSubmit
  } = useForm<SignUpFormData>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });
  const onSubmit = async (data: SignUpFormData) => {
    try {
      await initiateOtpLogin({
        email: data.email,
      });
      setIsSubmitted(true);
      //TODO: il faut que l'on assure le state soit bien recuperer coté verification
      navigate("/verify-otp", {
        state: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          isSignUp: true
        },
      });
    } catch (error) {

      console.error("Sign Up error:", error);
    }
  }
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
          <div className="input-container">
            <Label uppercase>
              <span className="text-[13px]">
                {t('auth.firstName')}
              </span>
            </Label>
            <ControlledTextInput
              name="firstName"
              control={control}
              placeholder="Nom"
              size="small"
              disabled={isSubmitted}
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
              size="small"
              disabled={isSubmitted}
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
                autoComplete="email"
                placeholder="mekoacademy@email.com"
                size="small"
                disabled={isSubmitted}
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
          <Button
            type="submit"
            size="small"
            color="secondary"
          >
            {loading ? <Loader2 /> : t('auth.signUp')}

          </Button>
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
