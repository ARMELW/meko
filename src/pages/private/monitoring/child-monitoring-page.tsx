import { Children, useChildren } from "@/app/children";
import { useChildrenStore } from "@/app/children/store";
import { Card, CardContent, CardTitle, Typography } from "@/components";
import UserAvatar from "@/components/atoms/view/user-avatar";
import { useEffect, useMemo } from "react";
import CreateChild from "./components/create-child";
import EditChild from "./components/edit-child";
import { DeleteChildDialog } from "@/app/children/components";


function ChildMonitoringPage() {

  const { data: avatars } = useChildren();
  const currentChild = useChildrenStore(state => state.currentChild);
  const setCurrentChild = useChildrenStore((state) => state.setCurrentChild);
  const clearCurrentChild = useChildrenStore((state) => state.clearCurrentChild);

  const handleCloseEdit = () => {
    clearCurrentChild();
  };
  const formatted = useMemo(() => {
    const data = avatars?.data ? avatars.data : [];
    return data.map((v) => ({
      ...v,
      avatarUrl: v.avatarUrl ? v.avatarUrl : ''
    }));
  }, [avatars?.data]);

  useEffect(() => {
    if (formatted.length > 0 && !currentChild) {
      setCurrentChild(formatted[0]);
    }
  }, [formatted, currentChild, setCurrentChild]);

  return <div className="min-h-screen text-white p-4 md:p-8">
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-20 md:w-32 flex flex-col items-center gap-4 ">
        <div className="child-item-wrapper flex flex-col items-center justify-center">
          {formatted.map((children: Children, index: number) => (
            <div className="mb-5  flex flex-col items-center justify-center">
              <div key={index} onClick={() => setCurrentChild(children)} className={`shadow-lg rounded-full w-[50px] overflow-hidden cursor-pointer ${children.id == currentChild?.id ? 'border-2 border-white' : ''}`}>
                <UserAvatar avatarUrl={children.avatarUrl} size={50} username={`${children.firstname} ${children.lastname}`} alt={`Avatar ${index + 1}`} />

              </div>
              <div>
                <Typography as="span" styleCase={"uppercase"} weight={"bold"} color={"secondary"} className="text-sm">
                  {children.firstname + " " + children.lastname}
                </Typography>
              </div>
            </div>
          ))}



          <div className="flex flex-col items-center">
            <CreateChild />
            <div className="account-label text-center">
              <Typography as="span" styleCase={"uppercase"} weight={"bold"} color={"secondary"} className="text-sm">
                Ajouter
              </Typography>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        {currentChild && (
          <Card className="text-white px-8 py-4 flex" style={{ boxShadow: "rgb(255 255 255 / 19%) 0px -1px 1px" }}>
            <div className="flex items-center space-x-4 flex-1">
              {currentChild && (
                <UserAvatar avatarUrl={currentChild?.avatarUrl} size={100} username={`${currentChild.firstname} ${currentChild.lastname}`} alt={`Avatar`} />
              )}

              <div className="space-y-2 flex-1 px-4">
                <div className="w-full flex space-x-8">
                  <div className="w-[50%]">
                    <Typography as="span" className="block text-sm" color={"secondary"} styleCase={"uppercase"} weight={"bold"}>
                      Nom
                    </Typography>
                    <p className="bg-meko-blue-transparent-2 rounded-xl focus:border-meko-blue-light-1 focus:border-2 outline-none py-2 px-5">
                      {currentChild?.lastname || ''}
                    </p>
                  </div>
                  <div className="w-[50%]">
                    <Typography as="span" className="block text-sm" color={"secondary"} styleCase={"uppercase"} weight={"bold"}>
                      Prénom
                    </Typography>
                    <p className="bg-meko-blue-transparent-2 rounded-xl focus:border-meko-blue-light-1 focus:border-2 outline-none py-2 px-5">
                      {currentChild?.firstname || ''}
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <Typography as="span" className="block text-sm" color={"secondary"} styleCase={"uppercase"} weight={"bold"}>
                    Date de naissance
                  </Typography>
                  <p className="bg-meko-blue-transparent-2 rounded-xl focus:border-meko-blue-light-1 focus:border-2 outline-none py-2 px-5">
                    {currentChild?.birthday
                      ? new Date(currentChild.birthday).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })
                      : ''}
                  </p>
                </div>
              </div>

            </div>

            <div className="flex items-center space-x-2">
              {currentChild && (
                <EditChild
                  childToEdit={currentChild}
                  setChildToEdit={setCurrentChild}
                  onClose={handleCloseEdit}
                />
              )}
              <DeleteChildDialog
                childId={currentChild?.id || ''}
              />
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              Jeux terminés
            </Typography>
            <Typography as="span" color={"default"} weight={"bold"} className="block text-[20px]">
              12
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              Jeux en cours
            </Typography>
            <Typography as="span" color={"default"} weight={"bold"} className="block text-[20px]">
              5
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              Progression
            </Typography>
            <Typography as="span" color={"default"} weight={"bold"} className="block text-[20px]">
              8.5%
            </Typography>
          </Card>
          <Card className="bg-[#000F4799] p-4">
            <Typography as="span" styleCase={"uppercase"} color={"secondary"} weight={"bold"}>
              Temps passé
            </Typography>
            <Typography as="span" color={"default"} weight={"bold"} className="block text-[20px]">
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
