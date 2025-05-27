import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSession } from './store';
import { appPath } from '@/routes/path';

interface SessionGuardProps {
  children: React.ReactNode;
}

export function SessionGuard({ children }: SessionGuardProps) {
  const navigate = useNavigate();
  const selectedChild = useSession(state => state.selectedChild);
  const token = useSession(state => state.token);
  const accountType = useSession(state => state.accountType);

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    if (!token) {
      navigate(appPath.public.login);
      return;
    }

    // Si nous sommes sur une page qui nécessite un enfant sélectionné
    const requiresChildSelection = ![
      appPath.private.profile.choose,
      appPath.private.profile.createChild
    ].includes(window.location.pathname);

    // Si aucun enfant n'est sélectionné et que la page en nécessite un
    if (!selectedChild && requiresChildSelection) {
      navigate(appPath.private.profile.choose);
      return;
    }
  }, [selectedChild, token, accountType, navigate]);

  return <>{children}</>;
}
