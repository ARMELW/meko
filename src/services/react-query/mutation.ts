import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BaseService } from "../api/http";
export interface MutationConfig<T, P> {
  service: Pick<BaseService<T, P>, 'create' | 'modify' | 'update' | 'remove'>;
  queryKeys: {
    lists: () => QueryKey;
    details?: () => QueryKey[]; 
  };
  successMessages?: {
    create?: string;
    update?: string;
    delete?: string;
  };
  callbacks?: {
    onCreateSuccess?: (data: T) => void;
    onUpdateSuccess?: (data: T) => void;
    onDeleteSuccess?: () => void;
  };
}

export function useMutations<T, P>(config: MutationConfig<T, P>) {
  const queryClient = useQueryClient();
  const { service, queryKeys, successMessages, callbacks } = config;

  const defaultMessages = {
    create: 'Élément créé avec succès',
    update: 'Élément mis à jour avec succès',
    delete: 'Élément supprimé avec succès'
  };

  const messages = {
    ...defaultMessages,
    ...successMessages
  };

  const handleSuccess = (type: 'create' | 'update' | 'delete', data: T) => {
 
    queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
    
    if (type === 'update') {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      
      if (queryKeys.details) {
        const detailsKeys = queryKeys.details();
        detailsKeys.forEach(key => {
          queryClient.invalidateQueries({ queryKey: key });
          queryClient.refetchQueries({ queryKey: key });
        });
      }
    }
    
    toast.success(messages[type]);

    if (type === 'create' && callbacks?.onCreateSuccess) {
      callbacks.onCreateSuccess(data);
    } else if (type === 'update' && callbacks?.onUpdateSuccess) {
      callbacks.onUpdateSuccess(data);
    } else if (type === 'delete' && callbacks?.onDeleteSuccess) {
      callbacks.onDeleteSuccess();
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data: P) => {
      const response = await service.create(data);
      if (!response.data) {
        throw new Error("No data returned from service.create");
      }

       const result = response.data;
      if (result && typeof result === 'object' && 'data' in result) {
        return result.data as T;
      }
      return result as T;
    },
    onSuccess: (data: T) => handleSuccess('create', data),
    onError: (error: Error) => {
      toast.error(`Erreur lors de la création: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: P }) => {

      const response = await service.update(id, data);
      if (!response.data) {
        throw new Error("No data returned from service.create");
      }

       const result = response.data;
      if (result && typeof result === 'object' && 'data' in result) {
        return result.data as T;
      }
      return result as T;
    },
    onSuccess: (data: T) => handleSuccess('update', data),
    onError: (error: Error) => {
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
    },
  });


  const modifyMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: P }) => {

      const response = await service.modify(id, data);
      if (!response.data) {
        throw new Error("No data returned from service.create");
      }

       const result = response.data;
      if (result && typeof result === 'object' && 'data' in result) {
        return result.data as T;
      }
      return result as T;
    },
    onSuccess: (data: T) => handleSuccess('update', data),
    onError: (error: Error) => {
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await service.remove(id);
      if (!response.data) {
        throw new Error("No data returned from service.create");
      }

      const result = response.data;
      if (result && typeof result === 'object' && 'data' in result) {
        return result.data as T;
      }
      return result as T;
    },
    onSuccess: (data: T) => handleSuccess('delete', data),
    onError: (error: Error) => {
      toast.error(`Erreur lors de la suppression: ${error.message}`);
    },
  });
  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
    modify: modifyMutation.mutate,
    createAsync: createMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isCreating: createMutation.isPending,
    isModifing: modifyMutation.isPending,
    invalidate: (queryKey: QueryKey) => queryClient.invalidateQueries({ queryKey })
  };
}