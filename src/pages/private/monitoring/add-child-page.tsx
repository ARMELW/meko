import { addChildrenSchema } from "@/app/children/schema";
import { ChildrenPayload } from "@/app/children/type";
import { Label, Typography } from "@/components";
import { ControlledTextInput } from "@/components/molecules/form/controlled-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChildrenActions } from '../../../app/children/hooks/use-children-actions';
import { LoadingButton } from "@/components/atoms/actions/loading-button";
import { useNavigate } from "react-router";
import { useChildrenStore } from "@/app/children/store";
import { useTranslation } from "react-i18next";
import { ControlledDateTimePicker } from "@/components/molecules/form/controlled-date-picker";

const defaultValues: ChildrenPayload = {
    firstname: "",
    birthday: "",
};
function AddChildPage() {
    const navigate = useNavigate();
    const { create, isCreating } = useChildrenActions();
    const { t } = useTranslation();

    const {
        control,
        handleSubmit
    } = useForm<ChildrenPayload>({
        defaultValues,
        resolver: zodResolver(addChildrenSchema),
        mode: "onChange",
    });
    const onSubmit = async (data: ChildrenPayload) => {

        create({
            ...data
        }, {
            onSuccess: () => {

                navigate("/profile/avatar");
            }
        });
    };
    return (<div className="w-full h-screen flex flex-col justify-center items-center">

        <div className="w-[35%]">
            <form action="" className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>

                <Typography as="h3" align={"center"}>
                    {t('onboarding.createChild.title')}
                </Typography>

                <Typography as="p" align={"left"}>
                    {t('onboarding.createChild.subtitle')}
                </Typography>

                <div className="w-full">
                    <div className="input-container">
                        <Label uppercase>
                            <span className="text-[13px]">
                                {t('onboarding.createChild.firstName')}
                            </span>
                        </Label>
                        <ControlledTextInput
                            name="firstname"
                            size="small"
                            control={control}
                            placeholder={t('onboarding.createChild.placeholders.firstName')}
                            disabled={isCreating}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <div className="input-container">
                        <div className="w-full">
                            <Label uppercase>
                                <span className="text-[13px]" >
                                    {t('onboarding.createChild.birthday')}
                                </span>
                            </Label>
                            <ControlledDateTimePicker
                                name="birthday"
                                control={control}
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
                        {t('onboarding.createChild.submit')}
                    </LoadingButton>
                </div>


            </form>
        </div>


    </div>);
}

export { AddChildPage };
