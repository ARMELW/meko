import { Children, useChildren } from "@/app/children";
import { useChildrenStore } from "@/app/children/store";
import { useEffect } from "react";
import UserAvatar from "@/components/atoms/view/user-avatar";
import EditChild from "./components/edit-child";
import CreateChild from "./components/create-child";

const SidebarChildrenList = () => {
  const { data: avatars } = useChildren();
  const currentChild = useChildrenStore(state => state.currentChild);
  const setCurrentChild = useChildrenStore((state) => state.setCurrentChild);

  const data = avatars?.data ? avatars?.data : [];
  const formatted = data ? data.map((v) => ({
    ...v,
    avatarUrl: v.avatarUrl ? v.avatarUrl : ''
  })) : [];

  useEffect(() => {
    if (formatted.length > 0 && !currentChild) {
      setCurrentChild(formatted[0]);
    }
  }, [formatted, currentChild, setCurrentChild]);

  return (
    <div className="p-12 w-[200px]">
      <div className="flex flex-col space-y-3 justify-center  items-center gap-3">

        {formatted.map((children: Children, index: number) => (
          <div key={index} onClick={() => setCurrentChild(children)} className={`shadow-lg rounded-full w-[50px] h-[50px] overflow-hidden cursor-pointer ${children.id == currentChild?.id ? 'border-2 border-white' : ''}`}>
            <UserAvatar avatarUrl={children.avatarUrl} size={50} username={`${children.firstname} ${children.lastname}`} alt={`Avatar ${index + 1}`} />
          </div>
        ))}

        <CreateChild />
      </div>

    </div>
  )
}
export function ChildrenHomePage() {
  const clearCurrentChild = useChildrenStore((state) => state.clearCurrentChild);
    const setCurrentChild = useChildrenStore((state) => state.setCurrentChild);

  const currentChild = useChildrenStore(state => state.currentChild);

  const handleCloseEdit = () => {
    clearCurrentChild();
  };
  return (
    <div className="flex flex-row gap-3">
      <SidebarChildrenList />
      <div>

        {currentChild && (
          <EditChild
            childToEdit={currentChild}
            setChildToEdit={setCurrentChild}
            onClose={handleCloseEdit}
          />
        )}
      </div>

    </div>
  );
}