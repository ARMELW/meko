import { Button, Card, CardContent, CardTitle, Typography } from "@/components";
import { Avatar } from '@/components/molecules/avatars/Avatar';
import { ControlledTextInput } from "@/components/molecules/form/controlled-input";
import { CreateChildModal } from "@/components/molecules/popup/modal/create-child-modal";
import { PopupOver } from "@/components/molecules/popup/popover/popover";
import { useForm } from "react-hook-form";


function ChildMonitoringPage() {

  const {
    control,
    handleSubmit
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: ''
    },
    mode: "onSubmit",
  });

  const onSubmit = () => {
    console.log('eto');
  }

  return <div className="min-h-screen  text-white p-4 md:p-8">
    <div className="flex gap-6">
      <aside className="w-20 md:w-32 flex flex-col items-center gap-4">
        <div className="child-item-wrapper flex flex-col space-y-8">
          <div className="child-account-item flex flex-col items-center">
            <Avatar src="/assets/images/avatars/frame_26088240_1.png" />
            <div className="account-label text-center">
              <Typography as="span" styleCase={"uppercase"} weight={"bold"} color={"secondary"} className="text-sm">
                John
              </Typography>
            </div>
          </div>
          <div className="child-account-item flex flex-col items-center">
            <Avatar src="/assets/images/avatars/image.png" />
            <div className="account-label text-center">
              <Typography as="span" styleCase={"uppercase"} weight={"bold"} color={"secondary"} className="text-sm">
                Jane
              </Typography>
            </div>
          </div>
          <div className="child-account-item flex flex-col items-center">
            <Avatar src="/assets/images/avatars/frame_26088240_2.png" />
            <div className="account-label text-center">
              <Typography as="span" styleCase={"uppercase"} weight={"bold"} color={"secondary"} className="text-sm">
                Jennifer
              </Typography>
            </div>
          </div>
          <div className="child-account-item flex flex-col items-center">
            <CreateChildModal />
            <div className="account-label text-center">
              <Typography as="span" styleCase={"uppercase"} weight={"bold"} color={"secondary"} className="text-sm">
                Ajouter
              </Typography>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="text-white px-8 py-4 flex" style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
            <div className="flex items-center space-x-4 flex-1">
              <Avatar src="/assets/images/avatars/frame_26088240_1.png" size={"100px"} />


              <div className="space-y-2 flex-1 px-4">
                <div className="w-full flex space-x-8">
                  <div className="w-[50%]">
                    <Typography as="span" className="block text-sm" color={"secondary"} styleCase={"uppercase"} weight={"bold"}>
                      Nom
                    </Typography>

                    <ControlledTextInput
                      name="lastName"
                      control={control}
                      size="w-full"
                      className="custom-input w-full"
                    />
                  </div>
                  <div className="w-[50%]">
                    <Typography as="span" className="block text-sm" color={"secondary"} styleCase={"uppercase"} weight={"bold"}>
                      Prénom
                    </Typography>
                    <ControlledTextInput
                      name="firstName"
                      control={control}
                      size="w-full"
                      className="custom-input w-full"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Typography as="span" className="block text-sm" color={"secondary"} styleCase={"uppercase"} weight={"bold"}>
                    Date de naissance
                  </Typography>
                  <ControlledTextInput
                    name="birthDate"
                    control={control}
                    size="w-full"
                    className="custom-input w-full"
                  />
                </div>
              </div>

            </div>

            <div className="flex items-center space-x-2">
              <Button variant={'primary'} type="submit"
                size={'small'} className="h-[48px]" >Modifier</Button>
              <PopupOver />
            </div>
          </Card>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 ">
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              Jeux terminés
            </Typography>
            <Typography as="span"  color={"default"} weight={"bold"} className="block text-[20px]">
              12
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              Jeux en cours
            </Typography>
            <Typography as="span"  color={"default"} weight={"bold"} className="block text-[20px]">
              5
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              Progression
            </Typography>
            <Typography as="span"  color={"default"} weight={"bold"} className="block text-[20px]">
              8.5%
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              Temps passé
            </Typography>
            <Typography as="span"  color={"default"} weight={"bold"} className="block text-[20px]">
              32h 30mn
            </Typography>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="w-full bg-[#0040B6] transition-all duration-300">
            <CardTitle
              title={"Dernière activité"}
              className="flex  justify-between items-center text-sm"
              titleColor={"default"}
            />

            <CardContent className="flex flex-col justify-center">
           
            </CardContent>

          </Card>
          <Card className="w-full bg-[#0040B6] transition-all duration-300">
            <CardTitle
              title={"Taux de progression"}
              className="flex  justify-between items-center text-sm"
              titleColor={"default"}
            />

            <CardContent className="flex flex-col justify-center">
             
            </CardContent>

          </Card>


        </div>

        <Card className="bg-[#000F4799] p-4 mt-4">
          <div className="flex flex-wrap justify-between text-sm">
            <div className="mb-2">Modules terminés: 2</div>
            <div className="mb-2">Leçons complétées: 8</div>
            <div className="mb-2">Réussite aux jeux: 80%</div>
            <div className="mb-2">Jeux joués: 36</div>
            <div className="mb-2">Temps de jeu: 8h 21m</div>
            <div className="mb-2">Temps moyen par jeu: 31m</div>
            <div className="mb-2">Nb. sessions: 3</div>
            <div className="mb-2">Durée moyenne session: 2h 05m</div>
          </div>
        </Card>

        <Card className="w-full bg-[#0040B6] transition-all duration-300 mt-4">
          <CardTitle
            title={"Progression par module"}
            className="flex  justify-between items-center text-sm"
            titleColor={"default"}
          />

          <CardContent className="flex flex-col justify-center">

          </CardContent>

        </Card>

      </main>
    </div>
  </div>;
}

export { ChildMonitoringPage };
