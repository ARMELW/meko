import { login } from "@/app/auth/api/login";
import { Button, Checkbox, Input, Label, Typography } from "@/components";
import { Link, redirect } from "react-router";

function LoginPage() {
  const signIn = async () => {
    await login({
      email: "armelgeek5@gmail.com",
      password: "password",
    }, {
      onSuccess: () => {
        console.log("User successfully login");
        redirect('/');
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    });
  }
  return <div className="container mx-auto">
    <div className="w-full h-screen flex flex-col justify-center items-center">


      <div className="w-full form-logo-title">
        <img src="/assets/images/logos/meko-logo.png" alt="" className="!h-[60px] mx-auto mb-8" />
      </div>

      <div className="w-[22%] bg-meko-blue-transparent-2 rounded-xl  p-5">
        <form action="" className="w-full space-y-4">


          <div className="input-container">
            <Label uppercase >
              <span className="text-[13px]">
                Identifiant
              </span>
            </Label>
            <Input size="w-full" />
          </div>
          <div className="input-container">
            <Label uppercase>
              <span className="text-[13px]">
                Mot de passe
              </span>
            </Label>
            <Input size="w-full" type="password" />
          </div>

          <div className="input-container">
            <Checkbox label="Se souvenir de moi" />
          </div>


          <div className="w-full flex justify-center">
            <Button onClick={signIn} size="small" color="secondary" className="h-[53px]">
              Se connecter
            </Button>
          </div>
        </form>
      </div>

      <div className="w-full my-8">
        <Typography as={"p"} className="text-center">
          <Link to={'/forgot-password'} className="block text-center">Mot de passe oublié ?</Link>
        </Typography>
      </div>

    </div>;
  </div>;
}

export { LoginPage };
