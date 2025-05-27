import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AvatarService } from '../service';
import { AvatarPayload } from '../types';

export const useAvatars = () => {
  return useQuery({
    queryKey: ['avatars'],
    queryFn: AvatarService.getAll,
  });
};

export const useAvatarActions = () => {
  const queryClient = useQueryClient();

  const { mutate: select } = useMutation({
    mutationFn: (payload: AvatarPayload) => AvatarService.select(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatars'] });
    },
  });

  return {
    select,
    isSelecting: false,
  };
};
