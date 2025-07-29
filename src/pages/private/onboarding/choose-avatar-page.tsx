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
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-white px-2 sm:px-4">
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10 bg-white rounded-xl shadow-md p-4 sm:p-8 md:p-12">
          <div className="flex justify-center w-full">
            <Typography as="h3" align="center" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              {t('onboarding.avatar.title')}
            </Typography>
          </div>

          <div className="flex justify-center items-center py-4 sm:py-6 w-full">
            <div className="avatar-profil">
              <img src="/assets/images/avatars/frame_26088240.png" alt="" className="avatar-profile w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-meko-blue-light-1 shadow-lg" />
            </div>
          </div>

          <div className="flex justify-center w-full">
            <Typography as="p" align="center" className="w-full max-w-2xl text-base sm:text-lg md:text-xl text-meko-blue-dark">
              {t('onboarding.avatar.description')}
            </Typography>
          </div>
          {avatars?.length === 0 && (
            <div className="flex justify-center items-center w-full p-5">
              <Typography as="p" align="center" className="text-red-500">
                {t('onboarding.avatar.noAvatars')}
              </Typography>
            </div>
          )}

          <div className="avatar-grid w-full py-6 sm:py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
              {avatars?.map((avatar, index) => (
                <div
                  key={index}
                  onClick={() => handleChoice(avatar)}
                  className="shadow-lg rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 overflow-hidden cursor-pointer border-2 border-transparent hover:border-meko-blue-light-1 transition-all duration-200"
                >
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
