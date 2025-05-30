import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addChildrenSchema, Children, ChildrenPayload, useChildrenActions } from '@/app/children';
import useModalStore from '@/app/children/modal';
import {
    Button,
    Dialog,
    DialogCard,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components";
import { LoadingButton } from '@/components/atoms/actions/loading-button';
import ChildrenForm from './child-form';
import { DialogTrigger } from '@radix-ui/react-dialog';
const defaultValues: ChildrenPayload = {
    firstname: "",
    lastname: "",
    birthday: "",
};
interface EditChildProps {
    childToEdit: ChildrenPayload & { id: string };
    onClose?: () => void;
    setChildToEdit: (child: Children) => void;
}

const EditChild = ({ childToEdit, setChildToEdit, onClose }: EditChildProps) => {
    const { update, isUpdating, invalidate } = useChildrenActions();
    const { open, mode, openUpdate, close } = useModalStore();
    const makeOpen = !!(open && mode == 'update')
    const {
        control,
        handleSubmit,
        reset,
        setValue,
    } = useForm<ChildrenPayload>({
        defaultValues,
        resolver: zodResolver(addChildrenSchema),
        mode: "onChange",
    });

    useEffect(() => {
        if (childToEdit) {
            setValue("firstname", childToEdit.firstname);
            setValue("lastname", childToEdit.lastname);
            setValue("birthday", new Date(childToEdit.birthday));
        }
    }, [childToEdit, setValue]);
    const onSubmit = async (data: ChildrenPayload) => {
        await update({
            id: childToEdit.id,
            data
        });
        //TODO: recuperer l'information depuis l'update pour mettre a jour le children edit
        setChildToEdit({
            id: childToEdit.id,
            ...data
        })
        invalidate(["children"]);
        reset();
        close();
        onClose?.();
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            openUpdate();
        } else {
            close();
        }
    };

    return (
        <Dialog open={makeOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    size="small"
                    color="secondary"
                >
                    Modifier
                </Button>
            </DialogTrigger>
            <DialogCard className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle title="Modifier compte enfant" />
                </DialogHeader>
                <DialogContent>
                    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <ChildrenForm control={control} isLoading={isUpdating} />


                        <div className="w-full flex justify-center">
                            <LoadingButton
                                type="submit"
                                loading={isUpdating}
                                size="small"
                                color="secondary"
                            >
                                Modifier
                            </LoadingButton>
                        </div>
                    </form>
                </DialogContent>
            </DialogCard>
        </Dialog>
    );
};

export default EditChild;