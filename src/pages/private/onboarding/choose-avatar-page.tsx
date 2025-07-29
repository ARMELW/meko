import { useAvatarActions, useAvatars } from "@/app/avatar/hooks/use-avatar";
import { Avatar } from "@/app/avatar/types";
import { useChildrenStore } from "@/app/children/store";
import { Typography } from "@/components";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useSession as useChildrenSession } from '@/services/session/store';
import { useChildren } from "@/app/children";
import { SubscriptionRequiredGuard } from "@/routes/components/subscription-required-guard";

function ChooseAvatarPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: avatars, isLoading } = useAvatars();
  const { select } = useAvatarActions();
  const sessionChild = useChildrenSession(state => state.selectedChild);
  const selectedChild = useChildrenStore(state => state.currentChild);
  const { invalidate } = useChildren();

  const signUp = location.state?.signUp || selectedChild;
  const login = useChildrenSession(state => state.login);
  const clearCurrentChild = useChildrenStore(state => state.clearCurrentChild);

  const childId = location.state?.id || sessionChild?.id || '';
  const childFirstname = location.state?.firstname || sessionChild?.firstname || '';

  useEffect(() => {
    if (!signUp) {
      navigate("/profile/choose");
    }
  }, [selectedChild, navigate]);

  const handleChoice = async (avatar: Avatar) => {
    if (!childId) {
      return;
    }
    try {
      await select({
        id: childId,
        avatarUrl: avatar.url
      });
      // Met à jour la session seulement si l'enfant n'a pas d'avatar ou si l'avatar change, et si ce n'est pas un sign up
      if (!signUp && (!sessionChild?.avatarUrl || sessionChild.avatarUrl !== avatar.url)) {
        login({
          ...sessionChild,
          id: childId,
          firstname: childFirstname,
          avatarUrl: avatar.url
        });
      }
      if (typeof invalidate === 'function') {
        invalidate(); // Invalide le cache des enfants pour forcer le refresh
      }
      toast(t('onboarding.avatar.success'), {
        position: 'bottom-right',
        description: t('onboarding.avatar.successDescription'),
        duration: 5000,
        icon: '✅'
      })
      clearCurrentChild();
      setTimeout(() => {
        navigate("/profile/choose");
      }, 0);
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

  return (
    <SubscriptionRequiredGuard>
      <div className="flex flex-col justify-center items-center w-full h-full">
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
      </div>
    </SubscriptionRequiredGuard>
  );
}

export { ChooseAvatarPage };
