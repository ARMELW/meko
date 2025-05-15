
import { Button } from '@/components/atoms/actions/button';
import { Switch } from '@/components/atoms/forms/switch';
import { Typography } from '@/components/atoms/typography/typography';
import { Card, CardContent, CardTitle } from '@/components/atoms/view/card';
import { useState } from 'react';

interface Plan {
    id: string;
    type: string;
    title: string;
    subtitle: string;
    monthlyPrice: number;
    annualPrice: number;
    annualMonthlyPrice: number;
}

interface PriceTagProps {
    price: number;
}

interface PlanItemProps {
    plan: Plan;
    billingCycle: string; // 'monthly' | 'annual'
    handlePlanSelect: (planId: string) => void;
  }
function PriceTag({ price }: PriceTagProps) {
    return (
        <div className="relative flex justify-center py-5 text-white">
            <span className="text-8xl">{price}</span>

            <div className="flex flex-col items-center mt-2 ml-1">
                <span className="font-semibold text-5xl">€</span>
                <span className="pl-2 font-semibold text-meko-blue-light-1 text-sm tracking-wide">/MOIS</span>
            </div>
        </div>
    );
}
export function PlanItem({ plan, billingCycle, handlePlanSelect }: PlanItemProps) {
    return (
      <Card key={plan.id} className="w-xs">
        <CardTitle
          title={plan.title}
          className="flex flex-col justify-center items-center"
          subtitle={plan.subtitle}
          titleColor="primary"
        />
        <CardContent className="flex flex-col justify-center">
          <PriceTag
            price={
              billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualMonthlyPrice
            }
          />
  
          <Typography
            as="p"
            weight="default"
            align="center"
            color="primary"
            className="py-4 text-center"
          >
            {billingCycle === 'monthly'
              ? `Soit ${plan.annualPrice}€ l'année`
              : `Soit ${plan.annualMonthlyPrice * 12}€ l'année`}
          </Typography>
  
          <Button size="small" onClick={() => handlePlanSelect(plan.id)}>
            ACHETER L'OFFRE
          </Button>
        </CardContent>
      </Card>
    );
  }
export default function SubscriptionPlanDemo() {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans: Plan[] = [
        {
            id: 'individual',
            type: 'INDIVIDUELLE',
            title: 'INDIVIDUELLE',
            subtitle: 'pour un enfant',
            monthlyPrice: 35,
            annualPrice: 420,
            annualMonthlyPrice: 29,
        },
        {
            id: 'family',
            type: 'FAMILIALE',
            title: 'FAMILIALE',
            subtitle: 'jusqu\'à 3 enfants',
            monthlyPrice: 55,
            annualPrice: 660,
            annualMonthlyPrice: 45,
        }
    ];

    const handleBillingToggle = () => {
        setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
    };

    const handlePlanSelect = (planId) => {
        const plan = plans.find(p => p.id === planId);
        if (plan) {
            setSelectedPlan(plan);
            alert(`Plan ${plan.title} sélectionné en mode ${billingCycle === 'monthly' ? 'mensuel' : 'annuel'} à ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualMonthlyPrice}€/mois`);
        }
    };

    return (
        <div className="p-6">
            <div className="mx-auto max-w-5xl text-white">
                <div className="flex flex-row justify-center py-12">
                    <div className="max-w-2xl">
                        <Typography as={'h2'} align='center'>
                            CHOISISSEZ L'ABONNEMENT QUI VOUS CONVIENT
                        </Typography>
                    </div>
                </div>

                <div className="flex justify-center items-center space-x-4 mb-10">


                    <Typography
                        styleCase="uppercase"
                        weight="bold"
                        variant="small"
                    >
                        MENSUEL
                    </Typography>

                    <Switch aria-label="switch" checked={billingCycle === 'annual'} onChange={handleBillingToggle} />


                    <Typography
                        styleCase="uppercase"
                        weight="bold"
                        variant="small"
                        color={'primary'}
                    >
                        ANNUEL
                    </Typography>
                </div>

                <div className="flex flex-row justify-center gap-6 w-full">
                    {plans.map((plan) => (
                        <PlanItem key={plan.id} plan={plan} billingCycle={billingCycle} handlePlanSelect={handlePlanSelect}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
