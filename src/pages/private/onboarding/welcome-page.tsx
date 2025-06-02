import { Typography } from "@/components";
import { ArrowRight } from "lucide-react";
import CustomLink from './../../../components/atoms/actions/custom-link';

import { useTranslation } from "react-i18next";
import { useChildrenStore } from "@/app/children/store";

function WelcomePage() {
  const { t } = useTranslation();
  const currentChild = useChildrenStore(state => state.currentChild);
  const name = currentChild ? currentChild.firstname : '';

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
          plein de choses tout en s'amusant ! Prêt(e) à commencer ?
        </Typography>
      </div>

      <div className="w-full action-container flex justify-center p-4">
        <CustomLink customClass="px-2 py-1" useLink linkTo="/profile/avatar">
          <ArrowRight className="w-[34px] h-[34px] text-[#7EDAFD]" />
        </CustomLink>
      </div>

    </div>
  </div>;
}

export { WelcomePage };
