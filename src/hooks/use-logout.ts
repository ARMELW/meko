import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/config/auth';
import { useSession as useChildrenSession } from '@/services/session/store';

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout: clearChildSession } = useChildrenSession();

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['subscriptionPlans'] }),
        queryClient.invalidateQueries({ queryKey: ['currentSubscription'] }),
        queryClient.invalidateQueries({ queryKey: ['paymentMethod'] }),
        queryClient.invalidateQueries({ queryKey: ['invoices'] }),
        queryClient.invalidateQueries({ queryKey: ['child-activity-stats'] }),
        queryClient.invalidateQueries({ queryKey: ['progressSummary'] }),
        queryClient.invalidateQueries({ queryKey: ['gamesStats'] }),
        queryClient.invalidateQueries({ queryKey: ['modules'] }),
        queryClient.invalidateQueries({ queryKey: ['game-sessions'] }),
        queryClient.invalidateQueries({ queryKey: ['lastActivity'] }),
        queryClient.invalidateQueries()
      ]);
      
      queryClient.clear();
      clearChildSession();
      await authClient.signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut
  };
}
