import { useMutations } from "@/services/react-query/mutation";
import { childrenService } from "../query";
import { childrenKeys } from "../config";
import { Children, ChildrenPayload, DeleteRequestPayload, DeleteVerificationPayload } from "../type";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";
import { useChildrenStore } from "../store";
import { useLastActivityActions } from '@/app/game-sessions/hooks/use-last-activity-actions';
import { useNavigate } from 'react-router';
import { useSession } from '@/services/session/store';

export const useChildrenActions = () => {
    const { t } = useTranslation();
    const currentChild = useChildrenStore(state => state.currentChild);
    const queryClient = useQueryClient();
    const { invalidateLastActivity } = useLastActivityActions();
    const clearCurrentChild = useChildrenStore((state) => state.clearCurrentChild);
    const { logout } = useSession();
    const navigate = useNavigate();

    const mutations = useMutations<Children, ChildrenPayload>({
        service: childrenService,
        queryKeys: childrenKeys,
        successMessages: {
            create: t('monitoring.children.create.success')
        }
    });

    const { mutate: requestDelete, isPending: isRequestingDelete } = useMutation({
        mutationFn: async (payload: DeleteRequestPayload) => {
            const response = await childrenService.post(API_ENDPOINTS.children.requestDelete(currentChild?.id || ''), payload);
            return response;
        },
        onSuccess: () => {
            toast.success(t('monitoring.children.confirmDelete.verificationSent'));
        },
        onError: () => {
            toast.error(t('monitoring.children.confirmDelete.error'));
        }
    });


    const handleAfterDelete = (deletedChildId?: string) => {
        invalidateLastActivity(deletedChildId);
        logout();
        clearCurrentChild();
        navigate('/profile/choose');
    };

    const { mutate: verifyAndDelete, isPending: isVerifyingDelete } = useMutation({
        mutationFn: async (payload: DeleteVerificationPayload) => {
            const response = await childrenService.delete(API_ENDPOINTS.children.verifyDelete(currentChild?.id || ''), { data: payload });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: childrenKeys.lists() });
            toast.success(t('monitoring.children.confirmDelete.success'));
            handleAfterDelete(currentChild?.id);
        },
        onError: () => {
            toast.error(t('monitoring.children.confirmDelete.error'));
        }
    });

    return {
        create: mutations.create,
        update: mutations.modify,
        isUpdating: mutations.isModifing,
        isCreating: mutations.isCreating,
        invalidate: mutations.invalidate,
        requestDelete,
        isRequestingDelete,
        verifyAndDelete,
        isVerifyingDelete
    };
};