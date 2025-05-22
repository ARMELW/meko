
import { Button, Input, Label, Typography } from "@/components";
import { Link } from "react-router";

function CreateParentAccountPage() {
  const register = async () => {
    /**await parentRegister({
      name: "Armel Wanes",
      email: "armelgeek5@gmail.com",
      password: "password",
    }, {
      onSuccess: () => {
        console.log("User successfully registered");
        redirect('/');
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    });**/
  }
  return <div className="flex flex-col justify-center items-center w-full h-screen">

    <div className="w-[35%]">
      <form action="" className="space-y-4 w-full">

        <Typography as="h3" align={"center"}>
          Création compte parent
        </Typography>

        <Typography as="p" align={"left"}>
          Renseignez vos informations
        </Typography>

        <div className="gap-4 grid grid-cols-2">
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
                  email
                </span>
              </Label>
              <Input size="w-full" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="input-container">
            <div className="w-full">
              <Label uppercase>
                <span className="text-[13px]">
                  creation mot de passe
                </span>
              </Label>
              <Input size="w-full" type="password" />
            </div>
          </div>
        </div>

        <div className="input-container">
          <div className="w-full">
            <Label uppercase>
              <span className="text-[13px]">
                Confirmation mot de passe
              </span>
            </Label>
            <Input size="w-full" type="password" />
          </div>
        </div>

        <div className="w-full">
          <Typography as={"p"} className="text-sm text-center">
            En créant un compte, vous acceptez les <Link to="#">conditions générales</Link> de Meko Academy.
          </Typography>
        </div>

        <div className="flex justify-center w-full">
          <Button onClick={register} size="small" color="secondary">
            Créer le compte
          </Button>
        </div>
        <div className="w-full">
          <Typography as={"p"} className="text-center">
            <Link to={'/login'} className="block text-sm text-center">Vous avez déja un compte ?</Link>
          </Typography>
        </div>

      </form>
    </div>


  </div>;
}

export { CreateParentAccountPage };
