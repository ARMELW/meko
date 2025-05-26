
import { Input, Props } from '@/components/atoms/forms/input';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
type ControlledTextInputProps<T extends FieldValues> = UseControllerProps<T> & {
  disabled?: boolean;
} & Omit<Props, 'value' | 'onChange' | 'onBlur' | 'name'>;


export function ControlledTextInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  ...props
}: ControlledTextInputProps<T>) {
  const { t } = useTranslation();
  const { field, fieldState } = useController<T>({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <>
      <Input
        {...props}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        value={field.value ?? ''}
      />
      {fieldState.error && (
        <p className="mt-1 font-bold text-meko-red text-xs">{t(fieldState.error.message || '')}</p>
      )}
    </>
  );
}