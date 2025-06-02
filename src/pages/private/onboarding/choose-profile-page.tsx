import { useChildren } from "@/app/children";
import { Typography } from "@/components";
import UserAvatar from "@/components/atoms/view/user-avatar";
import { useSession } from "@/services/session/store";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";


function ChooseProfilePage() {
  const navigate = useNavigate();
  const { data: avatars, isLoading } = useChildren();
  const login = useSession(state => state.login);
  const { t } = useTranslation();
  
  const handleChoice = (child: { id: string; firstname: string; lastname: string; avatarUrl?: string }) => {
    if (!child) {
      return;
    }

    login({
      id: child.id,
      firstname: child.firstname,
      lastname: child.lastname,
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
  return <div className="flex flex-col justify-center items-center py-29 w-full">
    <div className="w-[50%]">

      <div className="flex justify-center w-full typo-container">
        <Typography as="h3" align={"center"}>
          {t('onboarding.profile.title')}
        </Typography>
      </div>
      {(!avatars?.data || avatars.data.length === 0) && (
          <div className="col-span-full text-center">
            <Typography as="p" className="text-gray-500">
              {t('onboarding.profile.noChildren')}
            </Typography>
          </div>
        )}
      <div className="avatar-grid p-12 w-full">
        <div className="justify-center items-center gap-6 grid grid-cols-3">
          {avatars?.data.map((avatar, index) => (
            <div className="flex flex-col items-center avatar-item" key={index}>
              <div onClick={() => handleChoice(avatar)} className="shadow-lg rounded-full w-[70px] h-[70px] overflow-hidden cursor-pointer">
                <UserAvatar avatarUrl={avatar.avatarUrl}   size={70} username={`${avatar.firstname} ${avatar.lastname}`} alt={'Avatar'} />
              </div>
              <Typography as="span" align={"center"} className="uppercase">
                <span className="font-[700] text-[#7EDAFD]">
                  {avatar.firstname} {avatar.lastname}
                </span>
              </Typography>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>;
}

export { ChooseProfilePage };
