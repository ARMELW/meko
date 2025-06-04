import { useAvatarActions, useAvatars } from "@/app/avatar/hooks/use-avatar";
import { Avatar } from "@/app/avatar/types";
import { useChildrenStore } from "@/app/children/store";
import { Typography } from "@/components";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useSession as useChildrenSession } from '@/services/session/store';

function ChooseAvatarPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: avatars, isLoading } = useAvatars();
  const { select } = useAvatarActions();
  
  const sessionChild = useChildrenSession(state => state.selectedChild);
  const login = useChildrenSession(state => state.login);
  const clearCurrentChild = useChildrenStore(state => state.clearCurrentChild);

  useEffect(() => {
    if (!sessionChild) {
      navigate("/profile/choose");
    }
  }, [sessionChild, navigate]);

  const handleChoice = async (avatar: Avatar) => {
    if (!sessionChild) {
      return;
    }
    console.log('Avatar selected:', avatar);
    try {
      await select({
        id: sessionChild?.id || '',
        avatarUrl: avatar.url
      });
      login({
        ...sessionChild,
        avatarUrl: avatar.url
      });
      toast(t('onboarding.avatar.success'), {
        position: 'bottom-right',
        description: t('onboarding.avatar.successDescription'),
        duration: 5000,
        icon: '✅'
      })
     clearCurrentChild(); 
     navigate("/profile/choose");
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'avatar:', error);
    }
  };

  if (isLoading || !sessionChild) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return <div className="flex flex-col justify-center items-center w-full h-full">
    <div className="w-[50%]">

      <div className="flex justify-center w-full typo-container">
        <Typography as="h3" align={"center"}>
          {t('onboarding.avatar.title')}
        </Typography>
      </div>

      <div className="flex justify-center items-center p-5 w-full">
        <div className="avatar-profil">
          <img src="/assets/images/avatars/frame_26088240.png" alt="" className="w-[70px] h-[70px] avatar-profile" />
        </div>
      </div>

      <div className="flex justify-center w-full typo-container">
        <Typography as="p" align={"center"} className="w-[91%]">
          {t('onboarding.avatar.description')}
        </Typography>
      </div>
      {avatars?.length === 0 && (
        <div className="flex justify-center items-center w-full p-5">
          <Typography as="p" align={"center"} className="text-red-500">
            {t('onboarding.avatar.noAvatars')}
          </Typography>
        </div>
      )}

      <div className="avatar-grid p-12 w-full">
        <div className="gap-12 grid grid-cols-4">

          {avatars?.map((avatar, index) => (
            <div key={index} onClick={() => handleChoice(avatar)} className="shadow-lg rounded-full w-[70px] h-[70px] overflow-hidden cursor-pointer">
              <img src={avatar.url} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />                           
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>;
}

export { ChooseAvatarPage };
