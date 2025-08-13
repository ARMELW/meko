import { useCurrentSubscription } from '@/app/subscription/hooks/use-current-subscription';
import { useSubscriptionFeatureEnabled } from '@/app/subscription/hooks/use-subscription-feature-enabled';
import { useNavigate } from 'react-router';
import { Card, Typography } from '@/components';
import { Button } from '@/components/atoms/actions/button';

export function SubscriptionRequiredGuard({ children }: { children: React.ReactNode }) {
  const { data: subscription, isLoading } = useCurrentSubscription();
  const isSubscriptionEnabled = useSubscriptionFeatureEnabled();
  const navigate = useNavigate();
  console.log('isSubscriptionEnabled',isSubscriptionEnabled);
  if (!isSubscriptionEnabled) {
    // Feature disabled: always allow access
    return <>{children}</>;
  }

  if (isLoading) return null;

  const isMissing = !subscription;
  const isExpired = !!subscription && (subscription.isExpired || subscription.isCanceled);
  const isInactive = !!subscription && (
    (!subscription.activeUntil && !subscription.accessEndsAt)
    || (subscription.activeUntil === null && subscription.accessEndsAt === null)
  );

  if (isMissing || isInactive) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <Card className="max-w-md w-full p-8 flex flex-col items-center gap-4 shadow-lg">
          <div className="text-meko-blue-light-1 text-5xl mb-2">🔒</div>
          <Typography as="h2" className="text-xl font-bold mb-2" align="center">
            Accès réservé aux abonnés
          </Typography>
          <Typography as="p" className="text-meko-blue-light-1 mb-4" align="center">
            Vous devez souscrire à une offre pour accéder à cette fonctionnalité.
          </Typography>
          <div className="flex gap-2 mt-2">
            <Button variant="primary" size="small" onClick={() => navigate('/subscription')} aria-label="Aller à la souscription">
              Choisir une offre
            </Button>
            <Button variant='secondary' size="small" onClick={() => navigate(-1)} aria-label="Retour">
              Retour
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <Card className="max-w-md w-full p-8 flex flex-col items-center gap-4 shadow-lg">
          <div className="text-red-400 text-5xl mb-2">⏰</div>
          <Typography as="h2" className="text-xl font-bold mb-2 text-red-400" align="center">
            Abonnement expiré
          </Typography>
          <Typography as="p" className="text-meko-blue-light-1 mb-4" align="center">
            Votre abonnement a expiré. Veuillez renouveler pour continuer à profiter des fonctionnalités premium.
          </Typography>
          <div className="flex gap-2 mt-2">
            <Button variant="primary" size="small" onClick={() => navigate('/subscription')} aria-label="Renouveler l'abonnement">
              Renouveler l'abonnement
            </Button>
            <Button variant="secondary" size="small" onClick={() => navigate(-1)} aria-label="Retour">
              Retour
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
