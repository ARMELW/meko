import { Typography } from '@/components';
import { CurrentSubscription } from '@/app/subscription/api/current-subscription';
import { useState } from 'react';
import { SubscriptionInfoBlock } from './subscription-info-block';
import { SubscriptionStatusBlock } from './subscription-status-block';
import { SubscriptionActionsBlock } from './subscription-actions-block';
import { PlanSelectorModal } from './plan-selector-modal';

export function CurrentSubscriptionBlock(props: { subscription: CurrentSubscription; refetchSubscription: () => void }) {
  const { subscription, refetchSubscription } = props;
  const [showPlanSelector, setShowPlanSelector] = useState(false);

  return (
    <div className="rounded-lg bg-gradient-to-br from-meko-blue-light-2 to-meko-blue-dark border border-meko-blue-dark shadow-sm p-2 sm:p-3 flex flex-col gap-2">
      <Typography as="h3" weight="bold" className="text-base sm:text-lg text-white mb-1 tracking-wide">
        {subscription.isTrial ? 'ESSAI GRATUIT EN COURS' : 'ABONNEMENT EN COURS'}
      </Typography>
      <SubscriptionInfoBlock subscription={subscription} />
      {subscription.isTrial && (
        <div className="text-xs text-meko-blue-dark text-center">
          Il vous reste <span className="font-bold">{subscription.trialDaysLeft} jours</span> d'essai gratuit.
        </div>
      )}
      <SubscriptionStatusBlock subscription={subscription} />
      <SubscriptionActionsBlock subscription={subscription} onShowPlanSelector={() => setShowPlanSelector(true)} />
      <PlanSelectorModal show={showPlanSelector} onClose={() => setShowPlanSelector(false)} onConfirm={() => { setShowPlanSelector(false); refetchSubscription(); }} />
    </div>
  );
}
