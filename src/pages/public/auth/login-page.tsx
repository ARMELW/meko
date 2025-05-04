import { login } from "@/app/auth/api/login";
import { Button } from "@/components";
import { redirect } from "react-router";

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
    return <div>
      <Button onClick={signIn} size="small" color="secondary">
        Login
      </Button>
    </div>;
}

export { LoginPage };
