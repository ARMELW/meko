import { ChildrenPayload } from '@/app/children';
import { Label } from '@/components';
import {ControlledDateTimePicker}  from '@/components/molecules/form/controlled-date-picker';
import { ControlledTextInput } from '@/components/molecules/form/controlled-input';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ChildrenFormProps {
  control: Control<ChildrenPayload>;
  isLoading: boolean;
}

const ChildrenForm = ({ control, isLoading }: ChildrenFormProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col space-y-2">
      <div className="w-full">
        <Label uppercase>
          <span className="text-[13px] uppercase">
            {t('monitoring.children.create.firstName')}
          </span>
        </Label>
        <ControlledTextInput
          name="firstname"
          size="small"
          control={control}
          className="custom-input w-full"
          placeholder={t('monitoring.children.create.placeholders.firstName')}
          disabled={isLoading}
        />
      </div>
      <div className="input-container">
        <Label uppercase>
          <span className="text-[13px] uppercase">
            {t('monitoring.children.create.lastName')}
          </span>
        </Label>
        <ControlledTextInput
          name="lastname"
          size="small"
          control={control}
          className="w-full"
          placeholder={t('monitoring.children.create.placeholders.lastName')}
          disabled={isLoading}
        />
      </div>
      <div className="input-container">
        <div className="w-full">
          <Label uppercase>
            <span className="text-[13px] uppercase">
              {t('monitoring.children.create.birthday')}
            </span>
          </Label>

          <ControlledDateTimePicker
            name="birthday"
            control={control}
          />

        </div>
      </div>
    </div>
  );
};

export default ChildrenForm;