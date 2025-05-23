// import { parentRegister } from "@/app/auth/api/parent-register";
import { Button, Input, Label, Typography } from "@/components";
// import { Link, redirect } from "react-router"; 

function CreateChildAccountPage() {
  const register = async () => {
    // await parentRegister({
    //   name: "Armel Wanes",
    //   email: "armelgeek5@gmail.com",
    //   password: "password",
    // }, {
    //   onSuccess: () => {
    //     console.log("User successfully registered");
    //     redirect('/');
    //   },
    //   onError: (error) => {
    //     console.error("Registration failed:", error);
    //   },
    // });
  }
  return <div className="w-full h-screen flex flex-col justify-center items-center">

    <div className="w-[35%]">
      <form action="" className="w-full space-y-4">

        <Typography as="h3" align={"center"}>
          Création compte enfant
        </Typography>

        <Typography as="p" align={"left"}>
          Renseignez les informations concernant l'enfant
        </Typography>

        <div className="grid  grid-cols-2 gap-4">
          <div className="input-container">
            <Label uppercase>
              <span className="text-[13px]">
                Nom
              </span>
            </Label>
            <Input size="w-full" />
          </div>
          <div className="input-container">
            <Label uppercase>
              <span className="text-[13px]">
                Prénom
              </span>
            </Label>
            <Input size="w-full" />
          </div>
        </div>

        <div className="w-full">
          <div className="input-container">
            <div className="w-full">
              <Label  uppercase>
                <span className="text-[13px]" >
                  Date de naissance
                </span>
              </Label>
              <Input size="w-full" />
            </div>
          </div>
        </div>


        <div className="w-full flex justify-center">
          <Button onClick={register} size="small" color="secondary">
            Créer le compte
          </Button>
        </div>


      </form>
    </div>


  </div>;
}

export { CreateChildAccountPage };
