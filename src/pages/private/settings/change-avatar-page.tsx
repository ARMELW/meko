import { useAvatarActions, useAvatars } from "@/app/avatar/hooks/use-avatar";
import { Avatar } from "@/app/avatar/types";
import { Typography } from "@/components";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useSession as useChildrenSession } from '@/services/session/store';
import { useChildren } from "@/app/children";

function ChangeAvatarPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: avatars, isLoading } = useAvatars();
  const { select } = useAvatarActions();
  const sessionChild = useChildrenSession(state => state.selectedChild);
  const { invalidate } = useChildren();
  const login = useChildrenSession(state => state.login);

  const handleChoice = async (avatar: Avatar) => {
    if (!sessionChild) {
      return;
    }

    console.log('Avatar changed:', avatar);
    try {
      await select({
        id: sessionChild.id,
        avatarUrl: avatar.url
      });

      // Met à jour la session seulement si l'enfant n'a pas d'avatar ou si l'avatar change, et si ce n'est pas un sign up
      if (!sessionChild?.avatarUrl || sessionChild.avatarUrl !== avatar.url) {
        login({
          ...sessionChild,
          avatarUrl: avatar.url
        });
      }
      invalidate();

      toast(t('onboarding.avatar.success'), {
        position: 'bottom-right',
        description: t('onboarding.avatar.successDescription'),
        duration: 5000,
        icon: '✅'
      });
      // Retourner à l'accueil après le changement
      navigate("/home");
    } catch (error) {
      console.error('Erreur lors du changement d\'avatar:', error);
      toast("Erreur lors du changement d'avatar", {
        position: 'bottom-right',
        description: "Une erreur s'est produite lors du changement d'avatar",
        duration: 5000,
        icon: '❌'
      });
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
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-white px-2 sm:px-4">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10 bg-white rounded-xl shadow-md p-4 sm:p-8 md:p-12">
        {/* Header avec informations de l'enfant */}
        <div className="flex justify-center w-full mb-4 sm:mb-6">
          <Typography as="h3" align="center" weight="bold" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            {t('common.changeAvatar')}
          </Typography>
        </div>

        <div className="flex justify-center w-full mb-6 sm:mb-8">
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

        {/* Grille d'avatars */}
        <div className="avatar-grid w-full py-6 sm:py-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 md:gap-10 justify-items-center">
            {avatars?.map((avatar, index) => (
              <div
                key={index}
                onClick={() => handleChoice(avatar)}
                className={`
                  shadow-lg rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 overflow-hidden cursor-pointer 
                  transition-all duration-200 hover:scale-110 hover:shadow-xl
                  ${sessionChild.avatarUrl === avatar.url ? 'ring-4 ring-blue-400' : ''}
                `}
              >
                <img
                  src={avatar.url}
                  alt={`Avatar ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bouton retour */}
        <div className="flex justify-center mt-8 mb-6">
          <button
            onClick={() => navigate("/home")}
            className="bg-meko-blue-transparent-2 text-white px-6 py-2 rounded-lg hover:bg-meko-blue-transparent-1 transition-colors"
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    </div>
  );
}

export { ChangeAvatarPage };
