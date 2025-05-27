import { addChildrenSchema } from "@/app/children/schema";
import { ChildrenPayload } from "@/app/children/type";
import {  Label, Typography } from "@/components";
import { ControlledTextInput } from "@/components/molecules/form/controlled-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChildrenActions } from '../../../app/children/hooks/use-children-actions';
import { LoadingButton } from "@/components/atoms/actions/loading-button";
import { useNavigate } from "react-router";
const defaultValues: ChildrenPayload = {
  firstname: "",
  lastname: "",
  birthday: "",
};
function CreateChildAccountPage() {
  const navigate = useNavigate();
  const { create, isCreating } = useChildrenActions();
  const {
    control,
    handleSubmit
  } = useForm<ChildrenPayload>({
    defaultValues,
    resolver: zodResolver(addChildrenSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: ChildrenPayload) => {

    await create({
      ...data
    })
    navigate("/profile/welcome");

  };
  return (<div className="w-full h-screen flex flex-col justify-center items-center">

    <div className="w-[35%]">
      <form action="" className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>

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
            <ControlledTextInput
              name="firstname"
              size="small"
              control={control}
              placeholder="Entrez le nom"
              disabled={isCreating}
            />
          </div>
          <div className="input-container">
            <Label uppercase>
              <span className="text-[13px]">
                Prénom
              </span>
            </Label>
            <ControlledTextInput
              name="lastname"
              size="small"
              control={control}
              placeholder="Entrez le  prénom"
              disabled={isCreating}
            />
          </div>
        </div>

        <div className="w-full">
          <div className="input-container">
            <div className="w-full">
              <Label uppercase>
                <span className="text-[13px]" >
                  Date de naissance
                </span>
              </Label>
              <ControlledTextInput
                name="birthday"
                size="small"
                type="date"
                control={control}
                placeholder=""
                disabled={isCreating}
              />
            </div>
          </div>
        </div>


        <div className="w-full flex justify-center">
          <LoadingButton type="submit"
            loading={isCreating}
            size="small"
            color="secondary">
            Créer le compte
          </LoadingButton>
        </div>


      </form>
    </div>


  </div>);
}

export { CreateChildAccountPage };
