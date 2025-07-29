import { addChildrenSchema } from "@/app/children/schema";
import { SubscriptionRequiredGuard } from '@/routes/components/subscription-required-guard';
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
function CreateChildAccountPage() {
  const navigate = useNavigate();
  const { create, isCreating } = useChildrenActions();
  const setCurrentChild = useChildrenStore((state) => state.setCurrentChild);
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
      onSuccess: (res) => {
        setCurrentChild(res);
        navigate("/profile/welcome");
      }
    });
  };
  return (
    <SubscriptionRequiredGuard>
      <div className="w-full min-h-screen flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-[90%] sm:max-w-[440px] md:max-w-[480px]">
          <form 
            className="w-full space-y-6" 
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <Typography 
                as="h3" 
                align="center"
                className="text-lg sm:text-xl md:text-2xl"
              >
                {t('onboarding.createChild.title')}
              </Typography>
              <Typography 
                as="p" 
                align="center"
                className="text-sm sm:text-base text-gray-400"
              >
                {t('onboarding.createChild.subtitle')}
              </Typography>
            </div>

            <div className="space-y-4">
              <div className="w-full">
                <ControlledTextInput
                  name="firstname"
                  size="small"
                  className="w-full"
                  control={control}
                  placeholder={t('onboarding.createChild.placeholders.lastName')}
                  disabled={isCreating}
                />
              </div>

              <div className="w-full">
                <div className="space-y-2">
                  <Label uppercase>
                    <span className="text-xs sm:text-sm">
                      {t('onboarding.createChild.birthday')}
                    </span>
                  </Label>
                  <ControlledDateTimePicker
                    name="birthday"
                    control={control}
                    disabled={isCreating}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <LoadingButton 
                type="submit"
                loading={isCreating}
                size="small"
                color="secondary"
                className="w-full sm:w-auto min-w-[200px]"
              >
                {t('onboarding.createChild.submit')}
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </SubscriptionRequiredGuard>
  );
}

export { CreateChildAccountPage };
