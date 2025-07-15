import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AvatarService } from '../service';
import { AvatarPayload } from '../types';

export const useAvatars = () => {
  return useQuery({
    queryKey: ['avatars'],
    queryFn: AvatarService.getAll,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useAvatarActions = () => {
  const queryClient = useQueryClient();

  const { mutate: select } = useMutation({
    mutationFn: (payload: AvatarPayload) => AvatarService.select(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatars'] });
      queryClient.invalidateQueries({ queryKey: ['children'] });
    },
  });

  return {
    select,
    isSelecting: false,
  };
};
