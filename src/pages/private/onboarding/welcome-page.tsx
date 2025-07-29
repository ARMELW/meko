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

  return <div className="w-full h-screen flex flex-col justify-center items-center">
    <div className="w-[50%]">
      <div className="w-full typo-container flex justify-center">
        <Typography as="h3" align={"center"}>
          {t('onboarding.welcome.title', { name })}
        </Typography>
      </div>

      <div className="w-full flex items-center justify-center p-5">
        <div className="avatar-profil ">
          <img src="/assets/images/avatars/frame_26088240.png" alt="" className="avatar-profile w-[70px] h-[70px]" />
        </div>
      </div>

      <div className="w-full typo-container flex justify-center">
        <Typography as="p" align={"center"} className="w-[91%] ">
          {t('onboarding.welcome.description')}
        </Typography>
      </div>

      <div className="w-full action-container flex justify-center p-4">
        <div 
          onClick={handleNavigate}
          className="cursor-pointer px-2 py-1 flex items-center justify-center rounded-lg bg-[#000F4733]"
        >
          <ArrowRight className="w-[34px] h-[34px] text-[#7EDAFD]" />
        </div>
      </div>

    </div>
  </div>;
}

export { WelcomePage };
