// import { login } from "@/app/auth/api/login";
import { Button, Checkbox, Input, Label, Typography, Card } from "@/components";
import { Link, redirect } from "react-router";

import { LoginFormData, loginSchema, } from "@/app/auth";
import { useOtpAuth } from "@/app/auth/hooks/use-otp-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ControlledTextInput } from "@/components/molecules/form/controlled-input";
import { Loader2 } from 'lucide-react';
const defaultValues: LoginFormData = {
  email: "",
};
function LoginPage() {
  const signIn = async () => {
   {/** await login({
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
     */}
  }
  return <div className="mx-auto container">
    <div className="flex flex-col justify-center items-center w-full h-screen">


      <div className="w-full form-logo-title">
        <img src="/assets/images/logos/meko-logo.png" alt="" className="mx-auto mb-8 !h-[60px]" />
      </div>

      <div className="bg-meko-blue-transparent-2 p-5 rounded-xl w-[22%]">
        <form action="" className="space-y-4 w-full">


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


          <div className="flex justify-center w-full">
            <Button onClick={signIn} size="small" color="secondary" className="h-[53px]">
              Se connecter
            </Button>
          </div>
        </form>
      </div>

      <div className="my-8 w-full">
        <Typography as={"p"} className="text-center">
          <Link to={'/forgot-password'} className="block text-center">Mot de passe oublié ?</Link>
        </Typography>
      </div>

    </div>;
  </div>;
}

export { LoginPage };
