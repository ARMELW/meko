import { useAvatarActions, useAvatars } from "@/app/avatar/hooks/use-avatar";
import { Avatar } from "@/app/avatar/types";
import { useChildrenStore } from "@/app/children/store";
import { Typography } from "@/components";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
function ChooseAvatarPage() {
  const navigate = useNavigate();
  const { data: avatars, isLoading } = useAvatars();
  const { select } = useAvatarActions();
  
  const currentChild = useChildrenStore(state => state.currentChild);
  const clearCurrentChild = useChildrenStore(state => state.clearCurrentChild);

  useEffect(() => {
    if (!currentChild) {
      navigate("/profile/choose");
    }
  }, [currentChild, navigate]);

  const handleChoice = async (avatar: Avatar) => {
    if (!currentChild) {
      return;
    }

    try {
      await select({
        id: currentChild.id,
        avatarUrl: avatar.url
      });
      toast('Avatar sélectionné avec succès', {
        description: 'Tu peux le changer à tout moment dans les paramètres de ton profil.',
        duration: 5000,
        icon: '✅'
      })
     clearCurrentChild(); 
     navigate("/profile/choose");
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'avatar:', error);
    }
  };

  if (isLoading || !currentChild) {
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
          Choisi ton avatar
        </Typography>
      </div>

      <div className="flex justify-center items-center p-5 w-full">
        <div className="avatar-profil">
          <img src="/assets/images/avatars/frame_26088240.png" alt="" className="w-[70px] h-[70px] avatar-profile" />
        </div>
      </div>

      <div className="flex justify-center w-full typo-container">
        <Typography as="p" align={"center"} className="w-[91%]">
          Commence par choisir ton avatar. Tu pourras toujours le changer plus tard si tu le souhaites.
        </Typography>
      </div>
      {avatars?.length === 0 && (
        <div className="flex justify-center items-center w-full p-5">
          <Typography as="p" align={"center"} className="text-red-500">
            Aucun avatar disponible pour le moment.
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
