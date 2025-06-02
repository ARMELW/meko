import { Props } from '@/components/atoms/forms/input';
import { OtpInput } from '@/components/atoms/forms/otp-input';
import React, { useState, useRef, useEffect } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

type ControlledOtpInputProps<T extends FieldValues> = UseControllerProps<T> & {
    disabled?: boolean;
    inputCount?: number;
    className?: string;
    inputClassName?: string;
    inputCellLength?: number;
    tintColor?: string | string[];
    offTintColor?: string | string[];
    inputType?: React.HTMLInputTypeAttribute;
    autoFocus?: boolean;
    groupSize?: number;
    separator?: React.ReactNode;
} & Omit<Props, 'value' | 'onChange' | 'onBlur' | 'name'>;



function ControlledOtpInput<T extends FieldValues>({
    name,
    control,
    defaultValue,
    inputCount = 6,
    className = '',
    inputCellLength = 1,
    inputType = 'text',
    autoFocus = false,
    groupSize = 3,
    separator = <span className="mx-2 text-white text-2xl">-</span>,
    ...inputProps
}: ControlledOtpInputProps<T>) {
    const {
        field: { value, onChange },
        fieldState: { error }
    } = useController({
        name,
        control,
        defaultValue,
    });
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, inputCount);
        if (typeof value === 'string') {
            const chunks = getOTPTextChunks(inputCount, inputCellLength, value);
            setOtpText(chunks);
        }
    }, [value, inputCount, inputCellLength]);
    const getOTPTextChunks = (count: number, cellLength: number, text: string): string[] => {
        const matches = text.match(new RegExp(`.{1,${cellLength}}`, 'g')) || [];
        return matches.slice(0, count);
    };

    const [, setFocusedInput] = useState<number>(0);
    const [otpText, setOtpText] = useState<string[]>(() =>
        getOTPTextChunks(inputCount, inputCellLength, '')
    );


    const basicValidation = (text: string): RegExpMatchArray | null => {
        const validText = /^[0-9]+$/;
        return text.match(validText);
    };

    const getErrors = (): boolean[] => {
        const errors = new Array(inputCount).fill(false);
        const joinedOtpText = otpText.join('');

        if (joinedOtpText.length < inputCount) {
            const missingIndex = joinedOtpText.length;

            for (let i = missingIndex; i < inputCount; i++) {
                errors[i] = true;
            }
        }
        return errors;
    };

    const onTextChange = (text: string, index: number): void => {
        if (text && !basicValidation(text)) {
            return;
        }

        const newOtpText = [...otpText];
        newOtpText[index] = text;
        setOtpText(newOtpText);
        onChange(newOtpText.join(''));
        if (text.length === inputCellLength && index !== inputCount - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };


    const onInputFocus = (index: number): void => {
        const prevIndex = index - 1;

        if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
            inputRefs.current[prevIndex]?.focus();
            return;
        }

        setFocusedInput(index);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
        const val = otpText[index] || '';

        if (e.key === 'v' && e.ctrlKey) {
            navigator.clipboard.readText().then((pastedText) => {
                const cleaned = pastedText.replace(/\D/g, '').slice(0, inputCount * inputCellLength);
                const chunks = getOTPTextChunks(inputCount, inputCellLength, cleaned);

                const newOtpText = [...otpText];
                chunks.forEach((val, idx) => {
                    newOtpText[idx] = val;
                });

                setOtpText(newOtpText);
                onChange(newOtpText.join(''));

                const firstEmptyIndex = newOtpText.findIndex((val) => val.length < inputCellLength);
                const nextFocusIndex = firstEmptyIndex >= 0 ? firstEmptyIndex : inputCount - 1;

                setTimeout(() => {
                    inputRefs.current[nextFocusIndex]?.focus();
                }, 0);
            });

            e.preventDefault();
            return;
        }

        if (e.key.length === 1 && !/^[0-9]$/.test(e.key)) {
            e.preventDefault();
            return;
        }

        if (e.key !== 'Backspace' && val && val.length === inputCellLength && index !== inputCount - 1) {
            inputRefs.current[index + 1]?.focus();
            return;
        }

        if (e.key === 'Backspace' && index !== 0) {
            if (!val.length && otpText[index - 1] && otpText[index - 1].length === inputCellLength) {
                const newOtpText = [...otpText];
                newOtpText[index - 1] = newOtpText[index - 1]
                    .split('')
                    .slice(0, newOtpText[index - 1].length - 1)
                    .join('');

                setOtpText(newOtpText);
                onChange(newOtpText.join(''));
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {

        (document.activeElement as HTMLElement)?.blur();

        const pasted = e.clipboardData.getData('Text');
        const cleaned = pasted.replace(/\D/g, '').slice(0, inputCount * inputCellLength);
        const chunks = getOTPTextChunks(inputCount, inputCellLength, cleaned);

        const newOtpText = [...otpText];
        for (let i = 0; i < inputCount; i++) {
            newOtpText[i] = chunks[i] || '';
        }

        setOtpText(newOtpText);
        onChange(newOtpText.join(''));

        const firstEmptyIndex = newOtpText.findIndex((val) => val.length < inputCellLength);
        const nextFocusIndex = firstEmptyIndex >= 0 ? firstEmptyIndex : inputCount - 1;

        setTimeout(() => {
            inputRefs.current[nextFocusIndex]?.focus();
        }, 0);
    }



    const groupedInputs: React.ReactNode[] = [];

    for (let i = 0; i < inputCount; i++) {
        const isError = !!error && getErrors()[i];

        //TODO: reglé le probleme de typage du ref
        const inputElement = (
            <OtpInput
                key={`input-${i}`}
                ref={(el) => { inputRefs.current[i] = el; }}
                autoCorrect="off"
                type={inputType}
                autoFocus={autoFocus && i === 0}
                value={otpText[i] || ''}
                maxLength={inputCellLength}
                error={isError}
                onFocus={() => onInputFocus(i)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    onTextChange(inputValue, i);
                }}

                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyDown(e, i)}
                onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => onPaste(e)}


                {...inputProps}
            />
        );

        groupedInputs.push(inputElement);

        if ((i + 1) % groupSize === 0 && i < inputCount - 1) {
            groupedInputs.push(
                <React.Fragment key={`separator-${i}`}>
                    {separator}
                </React.Fragment>
            );
        }
    }


    return (
        <div className={`flex flex-row justify-between gap-3 items-center my-5 min-w-64 max-w-80 ${className}`}>
            {groupedInputs}
        </div>
    );
};

export default ControlledOtpInput;
