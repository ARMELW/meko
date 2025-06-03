import { Label } from '@/components/atoms/typography/label';
import { Card, CardContent, CardTitle } from '@/components/atoms/view/card';
import * as Dialog from '@radix-ui/react-dialog';
import { ControlledTextInput } from '../../form/controlled-input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms/actions/button';
import { ControlledDateTimePicker } from '../../form/controlled-date-picker';

type ChilCreationForm = {
  firstName: string;
  lastName: string;
  birthDate: string;
};




function CloseCard() {
  return (
    <Dialog.Close asChild>
      <button
        className="text-gray-500 hover:text-gray-700 cursor-pointer"
        aria-label="Fermer"
      >
        <img src="/assets/images/icons/close-icon.png" className="w-5 h-5" alt="" />
      </button>
    </Dialog.Close>
  )
}


function CreateChildModal() {

  const {
    control,
    handleSubmit
  } = useForm<ChilCreationForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: ''
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: ChilCreationForm) => {
    console.log("submitted");
    console.log(data);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-white bg-[#000F4733] p-0 font-bold  focus:outline-none w-[60px] h-[60px] rounded-[60px] cursor-pointer flex items-center justify-center">
          <span className="text-[40px] leading-none">+</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-0 rounded-md shadow-xl z-50 w-[90%] max-w-md">
          <Card className="w-full bg-[#0040B6] transition-all duration-300">
            <CardTitle
              title={"Création compte enfant"}
              className="flex  justify-between items-center text-sm"
              titleColor={"default"}
              actions={CloseCard()}
            />

            <CardContent className="flex flex-col justify-center">
              <form className="space-y-4 w-full" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}>

                <div className="input-container w-full">
                  <Label uppercase>
                    <span className="text-[13px]">
                      Nom de l’enfant
                    </span>
                  </Label>
                  <ControlledTextInput
                    name="lastName"
                    control={control}
                    size="w-full"
                  />
                </div>

                <div className="input-container w-full">
                  <Label uppercase>
                    <span className="text-[13px]">
                      Prenom de l’enfant
                    </span>
                  </Label>
                  <ControlledTextInput
                    name="firstName"
                    control={control}
                    size="w-full"
                  />
                </div>

                <div className="input-container w-full">
                  <Label uppercase>
                    <span className="text-[13px]">
                      Date de naissance
                    </span>
                  </Label>
                  <ControlledDateTimePicker
                    name="birthDate"
                    control={control}
                  />
                </div>

                <div className="flex justify-center w-full">
                  <Button
                    type="submit"
                    size={"normal"}
                    color="secondary"
                  >
                    creer
                  </Button>
                </div>

              </form>
            </CardContent>

          </Card>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { CreateChildModal }