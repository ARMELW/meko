import { Button, Input, Label, Typography } from "@/components";
import { Link } from "react-router";

function ForgotPasswordPage() {
  return <div className="w-full h-screen flex flex-col justify-center items-center">

    <div className="w-[35%]">
      <form action="" className="w-full space-y-4">

        <Typography as="h3" align={"center"}>
          Mot de passe oublié
        </Typography>

        <Typography as="p" align={"center"}>
          Entrez votre mail pour recevoir le lien de réinitialisation.
        </Typography>


        <div className="w-full">
          <div className="input-container">
            <div className="w-full">
              <Label uppercase>
                <span className="text-[13px]" >
                  email
                </span>
              </Label>
              <Input size="w-full" />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <Button  size="small" color="secondary">
            reinitialiser le mot de passe
          </Button>
        </div>
        <div className="w-full">
          <Typography as={"p"} className="text-center">
            <Link to={'/login'} className="block text-center  text-sm">Se connecter</Link>
          </Typography>
        </div>

      </form>
    </div>


  </div>;
}

export { ForgotPasswordPage };
