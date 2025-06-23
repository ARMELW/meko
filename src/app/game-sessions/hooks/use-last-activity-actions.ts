import { useQueryClient } from '@tanstack/react-query';

export const useLastActivityActions = () => {
  const queryClient = useQueryClient();

  const invalidateLastActivity = (childId?: string) => {
    if (childId) {
      queryClient.invalidateQueries({ queryKey: ['lastActivity', childId] });
    } else {
      queryClient.invalidateQueries({ queryKey: ['lastActivity'] });
    }
  };

  const refetchLastActivity = (childId?: string) => {
    if (childId) {
      queryClient.refetchQueries({ queryKey: ['lastActivity', childId] });
    } else {
      queryClient.refetchQueries({ queryKey: ['lastActivity'] });
    }
  };

  const setLastActivityData = (childId: string, data: import('../types').LastActivityResponse) => {
    queryClient.setQueryData(['lastActivity', childId], data);
  };

  return {
    invalidateLastActivity,
    refetchLastActivity,
    setLastActivityData
  };
};
