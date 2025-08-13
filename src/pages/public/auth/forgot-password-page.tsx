
import { Button, Input, Label, Typography } from "@/components";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";


function ForgotPasswordPage() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[35%]">
        <form action="" className="w-full space-y-4">
          <Typography as="h3" align={"center"}>
            {t('auth.forgotPassword.title', 'Mot de passe oublié')}
          </Typography>
          <Typography as="p" align={"center"}>
            {t('auth.forgotPassword.instructions', 'Entrez votre mail pour recevoir le lien de réinitialisation.')}
          </Typography>
          <div className="w-full">
            <div className="input-container">
              <div className="w-full">
                <Label uppercase>
                  <span className="text-[13px]" >
                    {t('auth.email', 'email')}
                  </span>
                </Label>
                <Input size="w-full" />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button size="small" color="secondary">
              {t('auth.forgotPassword.resetButton', 'réinitialiser le mot de passe')}
            </Button>
          </div>
          <div className="w-full">
            <Typography as={"p"} className="text-center">
              <Link to={'/login'} className="block text-center  text-sm">
                {t('auth.forgotPassword.loginLink', 'Se connecter')}
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}

export { ForgotPasswordPage };
