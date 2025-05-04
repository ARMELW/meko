import { parentRegister } from "@/app/auth/api/parent-register";
import { Button } from "@/components";
import { redirect } from "react-router";

function CreateParentAccountPage() {
  const register = async () => {
    await parentRegister({
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
    });
  }
  return <div>
    <Button onClick={register} size="small" color="secondary">
      Create Parent Account
    </Button>
  </div>;
}

export { CreateParentAccountPage };
