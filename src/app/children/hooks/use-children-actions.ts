import { useMutations } from "@/services/react-query/mutation";
import { childrenService } from "../query";
import { childrenKeys } from "../config";
import { Children, ChildrenPayload, DeleteRequestPayload, DeleteVerificationPayload } from "../type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";
import { useChildrenStore } from "../store";

export const useChildrenActions = () => {
    const currentChild = useChildrenStore(state => state.currentChild);
    const queryClient = useQueryClient();
    const mutations = useMutations<Children, ChildrenPayload>({
        service: childrenService,
        queryKeys: childrenKeys,
        successMessages: {
            create: 'Enfant crée avec succès'
        }
    });

    const { mutate: requestDelete, isPending: isRequestingDelete } = useMutation({
        mutationFn: async (payload: DeleteRequestPayload) => {
            const response = await childrenService.post(API_ENDPOINTS.children.requestDelete(currentChild?.id || ''), payload);
            return response;
        },
        onSuccess: () => {
            toast.success("Code de vérification envoyé par email");
        },
        onError: () => {
            toast.error("Erreur lors de l'envoi du code de vérification");
        }
    });

    const { mutate: verifyAndDelete, isPending: isVerifyingDelete } = useMutation({
        mutationFn: async (payload: DeleteVerificationPayload) => {
            const response = await childrenService.delete(API_ENDPOINTS.children.verifyDelete(currentChild?.id || ''), { data: payload });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: childrenKeys.lists() });
            toast.success("Compte enfant supprimé avec succès");
        },
        onError: () => {
            toast.error("Code de vérification incorrect");
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