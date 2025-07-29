import { Typography } from "@/components";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSession as useChildrenSession } from '@/services/session/store';
import { useNavigate } from "react-router";

function WelcomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentChild = useChildrenSession(state => state.selectedChild);
  const name = currentChild ? currentChild.firstname : '';

  const handleNavigate = () => {
    navigate(`/profile/avatar`, { state: { signUp: true } });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white px-2 sm:px-4">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10 bg-white rounded-xl shadow-md p-4 sm:p-8 md:p-12">
        <div className="w-full flex justify-center">
          <Typography as="h3" align="center" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {t('onboarding.welcome.title', { name })}
          </Typography>
        </div>

        <div className="w-full flex items-center justify-center py-4 sm:py-6">
          <div className="avatar-profil">
            <img src="/assets/images/avatars/frame_26088240.png" alt="" className="avatar-profile w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-meko-blue-light-1 shadow-lg" />
          </div>
        </div>

        <div className="w-full flex justify-center">
          <Typography as="p" align="center" className="w-full max-w-2xl text-base sm:text-lg md:text-xl text-meko-blue-dark">
            {t('onboarding.welcome.description')}
          </Typography>
        </div>

        <div className="w-full flex justify-center pt-2 sm:pt-4">
          <button
            onClick={handleNavigate}
            className="cursor-pointer px-4 py-2 flex items-center justify-center rounded-lg bg-[#000F4733] hover:bg-meko-blue-light-1/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-meko-blue-light-1"
            aria-label={t('onboarding.welcome.cta', 'Continuer')}
          >
            <ArrowRight className="w-8 h-8 sm:w-9 sm:h-9 text-[#7EDAFD]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export { WelcomePage };
