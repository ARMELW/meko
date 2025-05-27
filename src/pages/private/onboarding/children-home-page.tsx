import { useAvatars } from "@/app/avatar/hooks/use-avatar";
import { Avatar } from "@/app/avatar/types";

const SidebarChildrenList = () => {
  const { data: avatars, isLoading } = useAvatars();
 
 const handleChoice = async (avatar: Avatar) => {
    
  };
  
  return (
    <div className="avatar-grid p-12 w-full">
      <div className="gap-12 flex flex-col gap-3">

        {avatars?.map((avatar, index) => (
          <div key={index} onClick={() => handleChoice(avatar)} className="shadow-lg rounded-full w-[70px] h-[70px] overflow-hidden cursor-pointer">
            <img src={avatar.url} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
export function ChildrenHomePage() {
  return (
    <div>
     <SidebarChildrenList/>
    </div>
  );
}