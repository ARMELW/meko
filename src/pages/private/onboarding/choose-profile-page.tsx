import { useChildren } from "@/app/children";
import { Typography } from "@/components";
import UserAvatar from "@/components/atoms/view/user-avatar";
import { useProfileSwitch } from "@/services/session";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";


function ChooseProfilePage() {
  const navigate = useNavigate();
  const { data: avatars, isLoading } = useChildren();
  const { switchProfile } = useProfileSwitch();
  const { t } = useTranslation();
  
  const handleChoice = (child: { id: string; firstname: string; lastname?: string; avatarUrl?: string }) => {
    if (!child) {
      return;
    }

    switchProfile({
      id: child.id,
      firstname: child.firstname,
      lastname: child.lastname || '',
      avatarUrl: child.avatarUrl
    });

    navigate("/home");
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if(!avatars || !avatars.data || avatars.data.length === 0){
     navigate("/profile/create-child");
     return null;
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full px-2 sm:px-4 md:px-8 py-10">
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
        <div className="flex justify-center w-full mb-6">
          <Typography as="h3" align="center" className="text-xl sm:text-2xl md:text-3xl font-bold">
            {t('onboarding.profile.title')}
          </Typography>
        </div>
        {(!avatars?.data || avatars.data.length === 0) && (
          <div className="col-span-full text-center">
            <Typography as="p" className="text-gray-500" align='center'>
              {t('onboarding.profile.noChildren')}
            </Typography>
          </div>
        )}
        <div className="p-4 sm:p-8 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center items-center">
            {avatars?.data.map((avatar, index) => (
              <div className="flex flex-col items-center avatar-item" key={index}>
                <div
                  onClick={() => handleChoice(avatar)}
                  className="shadow-lg rounded-full w-20 h-20 sm:w-[70px] sm:h-[70px] overflow-hidden cursor-pointer transition-transform hover:scale-105"
                >
                  <UserAvatar avatarUrl={avatar.avatarUrl} size={70} username={`${avatar.firstname} ${avatar.lastname}`} alt={'Avatar'} />
                </div>
                <Typography as="span" align="center" className="uppercase mt-2 text-xs sm:text-sm md:text-base">
                  <span className="font-[700] text-[#7EDAFD]">
                    {avatar.firstname} {avatar.lastname}
                  </span>
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ChooseProfilePage };
