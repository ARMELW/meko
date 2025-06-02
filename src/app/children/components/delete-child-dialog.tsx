import { Button, Dialog, DialogCard, DialogContent, DialogFooter, DialogHeader, DialogTitle, Typography } from '@/components';
import { useState } from 'react';
import { useChildrenActions } from '../hooks/use-children-actions';
import useModalStore from '../modal';
import { OtpFormData, otpSchema } from '@/app/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledOtpInput from '@/components/molecules/form/controlled-otp-input';
import { useNavigate } from 'react-router';
import { useChildrenStore } from '../store';
import * as Popover from '@radix-ui/react-popover';
import { useTranslation } from 'react-i18next';

const defaultValues: OtpFormData = {
    otp: "",
};

interface DeleteChildDialogProps {
    childId: string;
}

export function DeleteChildDialog({ childId }: DeleteChildDialogProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [step, setStep] = useState<'request' | 'verify'>('request');
    const clearCurrentChild = useChildrenStore((state) => state.clearCurrentChild);
    
    const { open, mode, openDelete, close } = useModalStore();
    const makeOpen = !!(open && mode == 'delete');
    const { requestDelete, isRequestingDelete, verifyAndDelete, isVerifyingDelete } = useChildrenActions();
    const {
        control,
        handleSubmit,
    } = useForm<OtpFormData>({
        defaultValues,
        resolver: zodResolver(otpSchema),
        mode: "onSubmit",
    });

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            openDelete();
        } else {
            close();
        }
    };

    const handleRequestDelete = () => {
        requestDelete({ id: childId }, {
            onSuccess: () => {
                setStep('verify');
            }
        });
    };

    const onSubmit = async (data: OtpFormData) => {
        verifyAndDelete({ verificationCode: data.otp }, {
            onSuccess: () => {
                close();
                setStep('request');
                clearCurrentChild();
                navigate('/monitoring');
            }
        });
    };

    return (
        <>
            <Dialog open={makeOpen} onOpenChange={handleOpenChange}>
                <DialogCard className="max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle title={t('monitoring.children.confirmDelete.title')} />
                    </DialogHeader>

                    <DialogContent>
                        {step === 'request' ? (
                            <>
                                <div className="py-4">
                                    <Typography>
                                        {t('monitoring.children.confirmDelete.message')}
                                    </Typography>
                                </div>
                                <DialogFooter>
                                    <Button
                                        onClick={handleRequestDelete}
                                        disabled={isRequestingDelete}
                                        color="secondary"
                                    >
                                        {isRequestingDelete ? t('monitoring.children.confirmDelete.sending') : t('monitoring.children.confirmDelete.sendCode')}
                                    </Button>
                                </DialogFooter>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="py-4 flex flex-col justify-center items-center">
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <Typography variant='h1'>
                                            {t('monitoring.children.confirmDelete.codeTitle')}
                                        </Typography>
                                        <Typography align="center">
                                            {t('monitoring.children.confirmDelete.codeMessage')}
                                        </Typography>
                                    </div>
                                    <div className="mt-4">
                                        <ControlledOtpInput name="otp" control={control} />
                                    </div>
                                </div>
                                <DialogFooter className='flex flex-col justify-center items-center'>
                                    <Button
                                        type="submit"
                                        disabled={isVerifyingDelete}
                                        color="secondary"
                                    >
                                        {isVerifyingDelete ? t('monitoring.children.confirmDelete.verifying') : t('monitoring.children.confirmDelete.verify')}
                                    </Button>
                                </DialogFooter>
                            </form>
                        )}
                    </DialogContent>
                </DialogCard>
            </Dialog>

            <Popover.Root>
                <Popover.Trigger asChild>
                    <button className="p-2 text-white cursor-pointer">
                        <div className="flex flex-col justify-center items-center space-y-1">
                            <div className="w-[6px] h-[6px] bg-white rounded-full" />
                            <div className="w-[6px] h-[6px] bg-white rounded-full" />
                            <div className="w-[6px] h-[6px] bg-white rounded-full" />
                        </div>
                    </button>
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content
                        sideOffset={8}
                        className="z-50 rounded-md p-3 w-40 bg-[#0040B6] shadow-lg border border-[#006EB6]"
                    >
                        <div className="flex flex-col text-sm">
                            <button
                                onClick={() => handleOpenChange(true)}
                                className="text-left text-[#7EDAFD] cursor-pointer"
                            >
                                <Typography as="span" className="text-[13px]" styleCase={"uppercase"}>
                                    {t('monitoring.children.delete')}
                                </Typography>
                            </button>
                        </div>
                        <Popover.Arrow className="fill-white" />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </>
    );
}
