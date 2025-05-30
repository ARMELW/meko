import * as Popover from '@radix-ui/react-popover';
import { Typography } from '@/components';
import useModalStore from '@/app/children/modal';

export function PopupOver() {
  const { openDelete } = useModalStore();
  const handleOpenChange = () => {

    openDelete();

  };
  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="p-2  text-white cursor-pointer">
            <div className="flex flex-col justify-center items-center space-y-1">
              <div className="w-[6px] h-[6px] bg-white rounded-full" />
              <div className="w-[6px] h-[6px] bg-white rounded-full" />
              <div className="w-[6px] h-[6px] bg-white rounded-full" />
            </div>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            className="z-50 rounded-md p-3 w-40 bg-[#0040B6] shadow-lg border border-[#006EB6]"
          >
            <div className="flex flex-col text-sm">
              <button
                onClick={handleOpenChange}
                className="text-left text-[#7EDAFD] cursor-pointer"
              >
                <Typography as="span" className="text-[13px]" styleCase={"uppercase"} >
                  Supprimer
                </Typography>
              </button>
            </div>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
}
