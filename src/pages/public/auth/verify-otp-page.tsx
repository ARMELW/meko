
import { OtpFormData, otpSchema, useVerifyOtpAuth, } from "@/app/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Typography } from "@/components";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
const defaultValues: OtpFormData = {
  otp: "",
};
function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, initiateVerifyOtpLogin } = useVerifyOtpAuth();
  const email = location.state?.email;

  if (!email) {
    navigate("/login");
  }
  const {
    //control,
    handleSubmit,
  } = useForm<OtpFormData>({
    defaultValues,
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
  });
  const onSubmit = async (data: OtpFormData) => {
    try {
      await initiateVerifyOtpLogin({
        email: email,
        otp: data.otp,
      });
      navigate("/");
    } catch (error) {
      console.error("Verify tokenn error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col justify-center items-center">
          <img src="/logo.svg" className="pb-10" />
          <Card className="flex flex-col justify-center items-center p-8">

            <div className="flex flex-col justify-center items-center gap-2">
              <Typography variant='h1'>
                CODE A 6 CHIFFRES
              </Typography>
              <Typography align="center">
                Veuillez saisir le code envoyé à votre adresse email
              </Typography>
            </div>
            <div className="flex flex-col gap-3 py-4 w-full">
              {/**<ControlledOtpInput name="otp" control={control} />**/}
            </div>
            <Button
              type="submit"
              size="small"
              color="secondary"
            >
              {loading ? <Loader2 /> : "Valider"}

            </Button>

          </Card>
        </div>

      </form>
    </div>
  );
}

export { VerifyOtpPage };
