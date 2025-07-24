
import { useSubscriptionPlans } from '@/app/subscription-plan/hooks/use-subscription-plans';
import { mapApiPlanToUI } from '@/app/subscription-plan/types';
import { useSubscriptionPurchase } from '@/app/subscription-plan/hooks/use-subscription-purchase';
import { Button, Typography } from '@/components';

function ChooseSubscriptionPage() {
  const { data: plans, isLoading } = useSubscriptionPlans();
  const { purchase, isLoading: isPurchasing } = useSubscriptionPurchase();

  if (isLoading) return <div>Chargement des offres...</div>;
  if (!plans || plans.length === 0) return <div>Aucune offre disponible.</div>;

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <Typography variant="h2" className="mb-4">Choisissez votre offre</Typography>
      <div className="flex flex-wrap gap-8 justify-center">
        {plans.map(plan => {
          const ui = mapApiPlanToUI(plan);
          return (
            <div key={ui.id} className="border rounded-xl p-6 min-w-[260px] flex flex-col items-center shadow-md bg-white">
              <Typography variant="h3" className="mb-2">{ui.title}</Typography>
              <Typography variant="p" className="mb-2 text-gray-600">{ui.subtitle}</Typography>
              <Typography variant="h2" className="mb-4 text-meko-blue-darker">
                {ui.monthlyPrice} € <span className="text-base font-normal">/mois</span>
              </Typography>
              <Button
                variant="primary"
                size="normal"
                disabled={isPurchasing || !plan.stripeIds?.monthly}
                onClick={() => plan.stripeIds?.monthly && purchase({  planId: plan.id, interval: 'month' })}
              >
                {isPurchasing ? 'Paiement en cours...' : 'Souscrire'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ChooseSubscriptionPage };
