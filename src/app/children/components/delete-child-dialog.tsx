import { Button, Dialog, DialogCard, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Typography } from '@/components';
import { useState } from 'react';
import { useChildrenActions } from '../hooks/use-children-actions';
import useModalStore from '../modal';
import { OtpFormData, otpSchema } from '@/app/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledOtpInput from '@/components/molecules/form/controlled-otp-input';
import { useNavigate } from 'react-router';
import { useChildrenStore } from '../store';
const defaultValues: OtpFormData = {
    otp: "",
};
interface DeleteChildDialogProps {
    childId: string;
}

export function DeleteChildDialog({ childId }: DeleteChildDialogProps) {
    const navigate = useNavigate();
    const [step, setStep] = useState<'request' | 'verify'>('request');
      const clearCurrentChild = useChildrenStore((state) => state.clearCurrentChild);
    
    const { open, mode, openDelete, close } = useModalStore();
    const makeOpen = !!(open && mode == 'delete')
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
                navigate('/');
            }
        });
    };

    return (
        <Dialog open={makeOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    size="small"
                    color="secondary"
                >
                    Supprimer
                </Button>
            </DialogTrigger>
            <DialogCard className="max-w-[600px]">

                <DialogHeader>
                    <DialogTitle title="Supprimer le compte enfant" />
                </DialogHeader>

                <DialogContent>
                    {step === 'request' ? (
                        <>
                            <div className="py-4">
                                <Typography>
                                    Pour supprimer ce compte enfant, nous devons vérifier votre identité.
                                    Un code de vérification sera envoyé à votre adresse e-mail.
                                </Typography>
                            </div>
                            <DialogFooter>
                                <Button
                                    onClick={handleRequestDelete}
                                    disabled={isRequestingDelete}
                                    color="secondary"
                                >
                                    {isRequestingDelete ? 'Envoi en cours...' : 'Envoyer le code'}
                                </Button>
                            </DialogFooter>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="py-4 flex flex-col justify-center items-center">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <Typography variant='h1'>
                                        CODE A 6 CHIFFRES
                                    </Typography>
                                    <Typography align="center">
                                        Veuillez saisir le code envoyé à votre adresse email
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
                                    {isVerifyingDelete ? 'Vérification...' : 'Vérifier et supprimer'}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </DialogCard>
        </Dialog>
    );
}
