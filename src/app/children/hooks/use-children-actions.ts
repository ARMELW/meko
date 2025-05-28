import { useMutations } from "@/services/react-query/mutation";
import { childrenService } from "../query";
import { childrenKeys } from "../config";
import { Children, ChildrenPayload } from "../type";

export const useChildrenActions = () => {
    const mutations = useMutations<Children, ChildrenPayload>({
        service: childrenService,
        queryKeys: childrenKeys,
        successMessages: {
            create: 'Enfant crée avec succès'
        }
    });
    return {
        create: mutations.create,
        update: mutations.modify,
        isUpdating: mutations.isModifing,
        isCreating: mutations.isCreating,
        invalidate: mutations.invalidate,
    };
};