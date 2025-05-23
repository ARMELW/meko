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

  return <div className="flex flex-col justify-center items-center py-29 w-full">
    <div className="w-[50%]">

      <div className="flex justify-center w-full typo-container">
        <Typography as="h3" align={"center"}>
          Choisi ton profil
        </Typography>
      </div>
      <div className="avatar-grid p-12 w-full">
        <div className="justify-center items-center gap-6 grid grid-cols-3">
          {avatars.map((avatar, index) => (
            <div className="flex flex-col items-center avatar-item" key={index}>
              <div onClick={() => handleChoice(avatar.id)} className="shadow-lg rounded-full w-[70px] h-[70px] overflow-hidden cursor-pointer">
                <img src={avatar.src} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
              </div>
              <Typography as="span" align={"center"} className="uppercase">
                <span className="font-[700] text-[#7EDAFD]">
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
