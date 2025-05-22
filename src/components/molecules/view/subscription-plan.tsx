
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
    billingCycle: string; // 'monthly' | 'annual'
}

interface PlanItemProps {
    plan: Plan;
    billingCycle: string; // 'monthly' | 'annual'
    handlePlanSelect: (planId: string) => void;
    isSelected?: boolean;
}

function PriceTag({ price }: PriceTagProps) {
    return (
        <div className="relative flex justify-center py-3 sm:py-4 md:py-5 text-white">
            <span className="text-5xl sm:text-6xl md:text-7xl">{price}</span>

            <div className="flex flex-col items-center mt-1 sm:mt-2 ml-1">
                <span className="font-semibold text-3xl sm:text-4xl md:text-5xl">€</span>
                <span className="pl-1 sm:pl-2 font-semibold text-meko-blue-light-1 text-xs sm:text-sm tracking-wide">/MOIS</span>
            </div>
        </div>
    );
}

export function PlanItem({ plan, billingCycle, handlePlanSelect, isSelected = false }: PlanItemProps) {
    return (
        <Card 
            key={plan.id} 
            className={`w-full sm:w-72 md:w-80 lg:w-xs transition-all duration-300 ${isSelected ? 'ring-2 ring-offset-2 ring-meko-blue-light-1' : 'hover:shadow-lg'}`}
        >
            <CardTitle
                title={plan.title}
                className="flex flex-col justify-center items-center"
                subtitle={plan.subtitle}
                titleColor="primary"
            />
            <CardContent className="flex flex-col justify-center">
                <PriceTag
                    price={billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualMonthlyPrice}
                    billingCycle={billingCycle}
                />

                <Typography
                    as="p"
                    weight="default"
                    align="center"
                    color="primary"
                    className="py-2 sm:py-4 md:py-5 text-sm sm:text-base text-center"
                >
                    {billingCycle === 'monthly'
                        ? `Soit ${plan.annualPrice}€ l'année`
                        : `Soit ${plan.annualMonthlyPrice * 12}€ l'année`}
                </Typography>

                <Button 
                    size="small" 
                    onClick={() => handlePlanSelect(plan.id)}
                    className="w-full"
                >
                    ACHETER L'OFFRE
                </Button>
            </CardContent>
        </Card>
    );
}

export default function SubscriptionPlanDemo() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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

    const handlePlanSelect = (planId: string) => {
        const plan = plans.find(p => p.id === planId);
        if (plan) {
            setSelectedPlan(planId);
            alert(`Plan ${plan.title} sélectionné en mode ${billingCycle === 'monthly' ? 'mensuel' : 'annuel'} à ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualMonthlyPrice}€/mois`);
        }
    };

    return (
        <section className="p-4 sm:p-6 w-full">
            <div className="mx-auto max-w-5xl text-white">
                <div className="flex flex-row justify-center sm:py-6 pb-8 md:pb-8">
                    <div className="px-4 max-w-xs sm:max-w-xl md:max-w-2xl">
                        <Typography as={'h2'} align='center' className="text-xl sm:text-2xl md:text-3xl">
                            CHOISISSEZ L'ABONNEMENT QUI VOUS CONVIENT
                        </Typography>
                    </div>
                </div>

                <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8 md:mb-10">
                    <Typography
                        styleCase="uppercase"
                        weight="bold"
                        variant="small"
                        className="text-xs sm:text-sm"
                    >
                        MENSUEL
                    </Typography>

                    <Switch 
                        aria-label="Changer de cycle de facturation" 
                        checked={billingCycle === 'annual'} 
                        onChange={handleBillingToggle} 
                    />

                    <Typography
                        styleCase="uppercase"
                        weight="bold"
                        variant="small"
                        color={'primary'}
                        className="text-xs sm:text-sm"
                    >
                        ANNUEL
                    </Typography>
                </div>

                <div className="flex sm:flex-row flex-col justify-center items-center gap-6 w-full">
                    {plans.map((plan) => (
                        <PlanItem 
                            key={plan.id} 
                            plan={plan} 
                            billingCycle={billingCycle} 
                            handlePlanSelect={handlePlanSelect}
                            isSelected={selectedPlan === plan.id}
                        />
                    ))}
                </div>
            
            </div>
        </section>
    );
}