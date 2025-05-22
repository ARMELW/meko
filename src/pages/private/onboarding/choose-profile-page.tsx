import { Typography } from "@/components";

type Avatar = {
  id: number;
  name: string;
  src: string;
};

function ChooseProfilePage() {

  const avatars: Avatar[] = [
    { id: 1, src: '/assets/images/avatars/frame_26088240_1.png', name: 'john' },
    { id: 2, src: '/assets/images/avatars/image.png', name: 'Jane' },
    { id: 3, src: '/assets/images/avatars/frame_26088240_2.png', name: 'Jennifer' },
  ];

  const handleChoice = (id: number) => {
    alert(`Avatar cliqué: ID ${id}`);
  };

  return <div className="w-full  flex flex-col justify-center items-center">
    <div className="w-[50%]">

      <div className="w-full typo-container flex justify-center">
        <Typography as="h3" align={"center"}>
          Choisis ton profil
        </Typography>
      </div>
      <div className="w-full avatar-grid p-12">
        <div className="grid grid-cols-3 gap-6 justify-center items-center">
          {avatars.map((avatar, index) => (
            <div className="avatar-item flex flex-col items-center" key={index}>
              <div onClick={() => handleChoice(avatar.id)} className="w-[70px] h-[70px] rounded-full overflow-hidden  shadow-lg cursor-pointer">
                <img src={avatar.src} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
              </div>
              <Typography as="span" align={"center"} className="uppercase">
                <span className="text-[#7EDAFD] font-[700]">
                  {avatar.name}
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
