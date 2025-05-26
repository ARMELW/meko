import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BaseService } from "../api/http";

export interface MutationConfig<T, P> {
    service: Pick<BaseService<T, P>, 'create'>;
    queryKeys: { lists: () => QueryKey };
    successMessages?: {
      create?: string;
      update?: string;
      delete?: string;
    };
    callbacks?: {
      onCreateSuccess?: () => void;
      onUpdateSuccess?: () => void;
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
  
    const handleSuccess = (type: 'create' | 'update' | 'delete') => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
  
      toast.success(messages[type]);
  
      if (type === 'create' && callbacks?.onCreateSuccess) {
        callbacks.onCreateSuccess();
      } else if (type === 'update' && callbacks?.onUpdateSuccess) {
        callbacks.onUpdateSuccess();
      } else if (type === 'delete' && callbacks?.onDeleteSuccess) {
        callbacks.onDeleteSuccess();
      }
    };
  
    const createMutation = useMutation({
      mutationFn: (data: P) => service.create(data),
      onSuccess: () => handleSuccess('create'),
      onError: (error: Error) => {
        toast.error(`Erreur lors de la création: ${error.message}`);
      },
    });
  
   
  
    
  
    return {
      create: createMutation.mutate,
      isCreating: createMutation.isPending,
      invalidate: (queryKey: QueryKey) => queryClient.invalidateQueries({ queryKey })
    };
  }
  