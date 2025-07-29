import { Card, CardContent, CardTitle, Typography } from '@/components';
import { Button } from '@/components/atoms/actions/button';
import { CurrentSubscription } from '@/app/subscription/api/current-subscription';
import { useState } from 'react';
import { SubscriptionInfoBlock } from './subscription-info-block';
import { SubscriptionStatusBlock } from './subscription-status-block';
import { SubscriptionActionsBlock } from './subscription-actions-block';
import { PlanSelectorModal } from './plan-selector-modal';
import { useNavigate } from 'react-router';

export function CurrentSubscriptionBlock(props: { subscription: CurrentSubscription; refetchSubscription: () => void }) {
  const { subscription, refetchSubscription } = props;
  const [showPlanSelector, setShowPlanSelector] = useState(false);
  const navigate = useNavigate();
  const isMissing = !subscription;
  const isExpired = !!subscription && (subscription.isExpired || subscription.isCanceled);
  const isInactive = !!subscription && (
    (!subscription.activeUntil && !subscription.accessEndsAt)
    || (subscription.activeUntil === null && subscription.accessEndsAt === null)
  );

  if (isMissing || isInactive) {
    return (
      <div className="gap-2">

        <Card>
          <CardTitle title=" Aucun abonnement trouvé" />
          <CardContent className="h-[400px] text-center flex flex-col items-center justify-center">

            <Typography as="p" className="text-gray-600 mb-2" align="center">
              Vous n'avez pas encore souscrit à une offre.
            </Typography>
            <Button color="primary" size="normal" onClick={() => navigate('/subscription')} aria-label="Souscrire à une offre">
              Souscrire à une offre
            </Button>
            <PlanSelectorModal show={showPlanSelector} onClose={() => setShowPlanSelector(false)} onConfirm={() => { setShowPlanSelector(false); refetchSubscription(); }} />
          </CardContent>
        </Card>

      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="gap-2">
        <Card>
          <CardTitle title="Abonnement expiré" />
          <CardContent className="h-[400px] text-center flex flex-col items-center justify-center">
            <Typography as="p" className="text-red-600 mb-2" align="center">
              Votre abonnement est expiré ou annulé. Veuillez renouveler pour continuer à profiter des services premium.
            </Typography>
            <Button color="primary" size="normal" onClick={() => navigate('/subscription')} aria-label="Renouveler l'abonnement">
              Renouveler l'abonnement
            </Button>
            <PlanSelectorModal show={showPlanSelector} onClose={() => setShowPlanSelector(false)} onConfirm={() => { setShowPlanSelector(false); refetchSubscription(); }} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="gap-2">
      <Card>
        <CardTitle title={subscription.isTrial ? 'ESSAI GRATUIT EN COURS' : 'ABONNEMENT EN COURS'} />
        <CardContent className="h-[400px] text-center flex flex-col items-center justify-center">

          <SubscriptionInfoBlock subscription={subscription} />
          {subscription.isTrial && (
            <div className="text-base text-white py-3 text-center">
              Il vous reste <span className="font-bold">{subscription.trialDaysLeft} jours</span> d'essai gratuit.
            </div>
          )}
          <SubscriptionStatusBlock subscription={subscription} />
          <SubscriptionActionsBlock subscription={subscription} />
          <PlanSelectorModal show={showPlanSelector} onClose={() => setShowPlanSelector(false)} onConfirm={() => { setShowPlanSelector(false); refetchSubscription(); }} />
        </CardContent>
      </Card>
    </div>
  );
}
