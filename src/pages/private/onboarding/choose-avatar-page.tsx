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

  return <div className="w-full  flex flex-col justify-center items-center">
    <div className="w-[50%]">

      <div className="w-full typo-container flex justify-center">
        <Typography as="h3" align={"center"}>
          Choisis ton avatar
        </Typography>
      </div>

      <div className="w-full flex items-center justify-center p-5">
        <div className="avatar-profil ">
          <img src="/assets/images/avatars/frame_26088240.png" alt="" className="avatar-profile w-[70px] h-[70px]" />
        </div>
      </div>

      <div className="w-full typo-container flex justify-center">
        <Typography as="p" align={"center"} className="w-[91%] ">
          Commence par choisir ton avatar. Tu pourras toujours le changer plus tard si tu le souhaites.
        </Typography>
      </div>

      <div className="w-full avatar-grid p-12">
        <div className="grid grid-cols-4 gap-12">
          {avatars.map((avatar, index) => (
            <div key={index} onClick={() => handleChoice(avatar.id)} className="w-[70px] h-[70px] rounded-full overflow-hidden  shadow-lg cursor-pointer">
              <img src={avatar.src} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>;
}

export { ChooseAvatarPage };
