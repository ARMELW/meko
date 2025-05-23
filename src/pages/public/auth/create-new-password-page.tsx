import { Button, Input, Label, Typography } from "@/components";

function CreateNewPasswordPage() {
  return <div className="w-full h-screen flex flex-col justify-center items-center">

    <div className="w-[35%]">
      <form action="" className="w-full space-y-4">

        <Typography as="h3" align={"center"}>
          Création nouveau mot de passe
        </Typography>

        <Typography as="p" align={"left"}>
          Indiquez votre nouveau mot de passe.
        </Typography>


        <div className="w-full">
          <div className="input-container">
            <div className="w-full">
              <Label uppercase>
                <span className="text-[13px]" >
                  Nouveau mot de passe
                </span>
              </Label>
              <Input size="w-full" type="password" />
            </div>
          </div>
        </div>


        <div className="w-full">
          <div className="input-container">
            <div className="w-full">
              <Label uppercase>
                <span className="text-[13px]" >
                  Confirmer nouveau mot de passe
                </span>
              </Label>
              <Input size="w-full" type="password" />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <Button size="small" color="secondary">
            changer le mot de passe
          </Button>
        </div>

      </form>
    </div>


  </div>;
}

export { CreateNewPasswordPage };
