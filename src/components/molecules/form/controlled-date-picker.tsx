import { DateTimePicker, DateTimePickerProps } from '@/components/atoms/forms/date-time-picker';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type ControlledDateTimePickerProps<T extends FieldValues> = UseControllerProps<T> & {
  disabled?: boolean;
} & Omit<DateTimePickerProps, 'value' | 'onChange' | 'name'>;

export function ControlledDateTimePicker<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
}: ControlledDateTimePickerProps<T>) {
  const { t } = useTranslation();
  const { field, fieldState } = useController<T>({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const handleChange = (date: Date | undefined) => {
    const stringValue = date ? date.toISOString() : '';
    field.onChange(stringValue);
  };

  return (
    <>
      <DateTimePicker 
        value={field.value ? new Date(field.value) : undefined}
        onChange={handleChange}
        placeholder={t('form.date-picker.placeholder')}
        className="w-[280px]" 
      />

      {fieldState.error && (
        <p className="mt-1 font-bold text-meko-red text-xs">
          {t(fieldState.error.message || '', { defaultValue: fieldState.error.message || '' })}
        </p>
      )}
    </>
  );
}