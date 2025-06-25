import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { addChildrenSchema, ChildrenPayload, useChildrenActions, useChildren } from '@/app/children';
import useModalStore from '@/app/children/modal';
import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogCard,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components";
import { LoadingButton } from '@/components/atoms/actions/loading-button';
import ChildrenForm from './child-form';
import { useNavigate } from 'react-router';
const defaultValues: ChildrenPayload = {
    firstname: "",
    birthday: "",
};
const CreateChild = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { create, isCreating, invalidate } = useChildrenActions();
    const { open, mode, openCreate, close } = useModalStore();
    const { invalidate: invalidateChildren } = useChildren();
    const makeOpen = !!(open && mode == 'create')
    const {
        control,
        handleSubmit,
        reset,
    } = useForm<ChildrenPayload>({
        defaultValues,
        resolver: zodResolver(addChildrenSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: ChildrenPayload) => {
        await create(data);
        invalidate(["avatars"]);
        invalidateChildren(); // Invalide le cache des enfants du parent
        reset();
        close();
        navigate('/profile/avatar');
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            openCreate();
        } else {
            close();
        }
    };

    return (
        <Dialog open={makeOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <span className="w-[50px] h-[50px] cursor-pointer rounded-full bg-blue-900 flex flex-col justify-center items-center">
                    <Plus className="text-white" size={28} />
                </span>
            </DialogTrigger>
            <DialogCard className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle title={t('monitoring.children.create.title')} />
                </DialogHeader>
                <DialogContent>
                    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <ChildrenForm control={control} isLoading={isCreating} />

                        <div className="w-full flex justify-center">
                            <LoadingButton
                                type="submit"
                                loading={isCreating}
                                size="small"
                                color="secondary"
                            >
                                Créer
                            </LoadingButton>
                        </div>
                    </form>
                </DialogContent>
            </DialogCard>
        </Dialog>
    );
};

export default CreateChild;