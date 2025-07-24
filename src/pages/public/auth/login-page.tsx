import { LoginFormData, loginSchema, } from "@/app/auth";
import { useOtpAuth } from "@/app/auth/hooks/use-otp-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Typography } from "@/components";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { ControlledTextInput } from "@/components/molecules/form/controlled-input";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@/components/atoms/actions/loading-button";
import { handleSimpleApiError } from "@/utils/error-handler";
import { toast } from "sonner";
import { useSavedSessions } from '@/app/auth/hooks/use-saved-sessions';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [quickLoginLoadingIndex, setQuickLoginLoadingIndex] = useState<number | null>(null);
  const { loading, initiateOtpLogin } = useOtpAuth();

  const stateEmail = location.state?.email || "";
  const stateMessage = location.state?.message;

  const { savedSessions, saveSession } = useSavedSessions();

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

      saveSession(data.email);

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

  const handleSavedSessionLogin = async (email: string, idx: number) => {
    try {
      setQuickLoginLoadingIndex(idx);
      await initiateOtpLogin({ email });
      saveSession(email);
      setIsSubmitted(true);
      navigate("/verify-otp", {
        state: {
          email,
          isSignUp: false
        },
      });
    } catch (error) {
      handleSimpleApiError(error);
    } finally {
      setQuickLoginLoadingIndex(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full p-4">


      <div className="flex flex-col justify-center items-center w-full max-w-md">
        <img src="/logo.svg" className="pb-10 w-32 sm:w-40" />

        {savedSessions.length > 0 && !showManualEntry && (
          <Card className="flex flex-col justify-center items-center p-4 sm:p-8 w-full mb-4">
            <div className="flex flex-col justify-center items-center my-4">
              <Typography as="p" className="text-sm sm:text-base text-center font-bold">
                Connexion rapide
              </Typography>
              <Typography align="center" as="p" className="text-xs sm:text-sm mt-1 text-gray-600">
                Sélectionnez un compte récent
              </Typography>
            </div>

            <div className="flex flex-col gap-2 w-full">
              {savedSessions.map((session, index) => (
                <div
                  key={index}
                  onClick={() => !loading && !isSubmitted && quickLoginLoadingIndex === null && handleSavedSessionLogin(session.email, index)}
                  className={`flex items-center gap-3 p-3 border border-meko-blue-flat rounded-lg cursor-pointer hover:bg-meko-blue-darker transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${quickLoginLoadingIndex === index ? 'opacity-60' : ''}`}
                  style={{ opacity: loading || isSubmitted ? 0.5 : 1 }}
                >
                  <div className="w-8 h-8 bg-meko-blue-darker rounded-full flex items-center justify-center">
                    <Typography className="text-blue-600 font-bold text-sm">
                      {session.email.charAt(0).toUpperCase()}
                    </Typography>
                  </div>
                  <div className="flex-1">
                    <Typography className="text-xs text-meko-orange">
                      {session.email}
                    </Typography>
                  </div>
                  <div className="text-xs text-meko-orange flex items-center gap-2">
                    {quickLoginLoadingIndex === index ? (
                      <span className="loader border-2 border-meko-blue-light-1 border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
                    ) : (
                      new Date(session.lastUsed).toLocaleDateString()
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              size={'small'}
              onClick={() => setShowManualEntry(true)}
              className="mt-4"
              disabled={loading || isSubmitted}
            >
              Utiliser un autre email
            </Button>
          </Card>
        )}

        {(savedSessions.length === 0 || showManualEntry) && (
          <div className="flex flex-row justify-center">
            {savedSessions.length > 0 && (
              <button
                type="button"
                onClick={() => setShowManualEntry(false)}
                className="self-start mb-4 text-white text-sm underline cursor-pointer"
              >
                ← Retour aux comptes sauvegardés
              </button>
            )}
          </div>
        )}

        {/* Formulaire manuel */}
        {(savedSessions.length === 0 || showManualEntry) && (
          <Card className="flex flex-col justify-center text-center items-center p-4 sm:p-8 w-full">

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
        )}

      </div>

    </div>
  );
}

export { LoginPage };
