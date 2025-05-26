import { Typography } from "@/components";

type Avatar = {
  id: number;
  src: string;
};

function ChooseAvatarPage() {

  const avatars: Avatar[] = [
    { id: 1, src: '/assets/images/avatars/frame_26088240_1.png' },
    { id: 2, src: '/assets/images/avatars/image.png' },
    { id: 3, src: '/assets/images/avatars/frame_26088240_2.png' },
    { id: 4, src: '/assets/images/avatars/frame_26088240_3.png' },
    { id: 5, src: '/assets/images/avatars/frame_26088240_5.png' },
    { id: 7, src: '/assets/images/avatars/frame_26088240_6.png' },
    { id: 8, src: '/assets/images/avatars/frame_26088240_7.png' },
    { id: 9, src: '/assets/images/avatars/frame_26088240_8.png' },
    { id: 10, src: '/assets/images/avatars/frame_26088240_9.png' },
    { id: 11, src: '/assets/images/avatars/frame_26088240_10.png' },
    { id: 11, src: '/assets/images/avatars/frame_26088240_11.png' },
    { id: 12, src: '/assets/images/avatars/frame_26088240_12.png' },
  ];

  const handleChoice = (id: number) => {
    alert(`Avatar cliqué: ID ${id}`);
  };

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

      <div className="avatar-grid p-12 w-full">
        <div className="gap-12 grid grid-cols-4">
          {avatars.map((avatar, index) => (
            <div key={index} onClick={() => handleChoice(avatar.id)} className="shadow-lg rounded-full w-[70px] h-[70px] overflow-hidden cursor-pointer">
              <img src={avatar.src} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>;
}

export { ChooseAvatarPage };
