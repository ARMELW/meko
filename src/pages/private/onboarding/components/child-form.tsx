import { ChildrenPayload } from '@/app/children';
import { Label } from '@/components';
import { ControlledTextInput } from '@/components/molecules/form/controlled-input';
import { Control } from 'react-hook-form';

interface ChildrenFormProps {
  control: Control<ChildrenPayload>;
  isLoading: boolean;
}

const ChildrenForm = ({ control, isLoading }: ChildrenFormProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="w-full">
        <Label uppercase>
          <span className="text-[13px] uppercase">
            Nom de l'enfant
          </span>
        </Label>
        <ControlledTextInput
          name="firstname"
          size="small"
          control={control}
          placeholder="Entrez le nom"
          className="w-full"
          disabled={isLoading}
        />
      </div>
      <div className="input-container">
        <Label uppercase>
          <span className="text-[13px] uppercase">
            Prénom de l'enfant
          </span>
        </Label>
        <ControlledTextInput
          name="lastname"
          size="small"
          control={control}
          placeholder="Entrez le prénom"
          className="w-full"
          disabled={isLoading}
        />
      </div>
      <div className="input-container">
        <div className="w-full">
          <Label uppercase>
            <span className="text-[13px] uppercase">
              Date de naissance
            </span>
          </Label>
          <ControlledTextInput
            name="birthday"
            size="small"
            type="date"
            control={control}
            className="w-full"
            placeholder=""
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChildrenForm;