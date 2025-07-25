
import { Button } from '@/components/atoms/actions/button';
import { Typography } from '@/components/atoms/typography/typography';
import { Card, CardContent, CardTitle } from '@/components/atoms/view/card';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useSubscriptionPlans } from '@/app/subscription-plan/hooks/use-subscription-plans';
import { mapApiPlanToUI, PlanUI } from '@/app/subscription-plan/types';
import { useSubscriptionPurchase } from '@/app/subscription-plan/hooks/use-subscription-purchase';
import { useChangeSubscription } from '@/app/subscription/hooks/use-change-subscription';
import { useCurrentSubscription } from '@/app/subscription/hooks/use-current-subscription';
import { useSession } from '@/config/auth';
import { Switch } from '@/components/atoms/forms/switch';


interface PriceTagProps {
    price: number;
    billingCycle: string; // 'monthly' | 'annual'
}

interface PlanItemProps {
    plan: PlanUI;
    billingCycle: 'monthly' | 'annual';
    isSelected?: boolean;
    onAction: (planId: string, interval: 'month' | 'year') => void;
    isProcessing?: boolean;
    actionLabel?: string;
}

function PlanCardSkeleton() {
    return (
        <Card className="w-full sm:w-72 md:w-80 lg:w-xs animate-pulse bg-meko-blue-dark/60">
            <div className="h-8 bg-meko-blue-light-2 rounded mt-4 mb-2 mx-6" />
            <div className="h-12 bg-meko-blue-light-1 rounded mb-4 mx-6" />
            <div className="h-4 bg-meko-blue-light-2 rounded mb-2 mx-6" />
            <div className="h-10 bg-meko-blue-light-1 rounded mb-4 mx-6" />
        </Card>
    );
}
function PriceTag({ price }: PriceTagProps) {
    const { t } = useTranslation();

    return (
        <div className="relative flex justify-center py-3 sm:py-4 md:py-5 text-white">
            <span className="text-5xl sm:text-6xl md:text-7xl">{price}</span>

            <div className="flex flex-col items-center mt-1 sm:mt-2 ml-1">
                <span className="font-semibold text-3xl sm:text-4xl md:text-5xl">€</span>
                <span className="pl-1 sm:pl-2 font-semibold text-meko-blue-light-1 text-xs sm:text-sm uppercase tracking-wide">/ {t('common.month')}</span>
            </div>
        </div>
    );
}

export function PlanItem({ plan, billingCycle, isSelected = false, onAction, isProcessing, actionLabel }: PlanItemProps) {
    const { t } = useTranslation();
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
                <div className="w-full">
                    <Button
                        size="small"
                        onClick={() => {
                            const interval = billingCycle === 'monthly' ? 'month' : 'year';
                            onAction(plan.id, interval);
                        }}
                        className="w-full uppercase"
                        innerClassName="flex flex-row justify-center items-center"
                        disabled={isProcessing || isSelected}
                    >
                        {isSelected
                            ? t('landing.currentPlan', 'Votre offre actuelle')
                            : isProcessing
                                ? t('common.loading', 'Chargement...')
                                : actionLabel || t('landing.buyPlan', 'Souscrire')}
                    </Button>
                </div>
            </CardContent>
        </Card >
    );
}
export default function SubscriptionPlanDemo({
    useChange = false,
    onSuccess,
}: {
    useChange?: boolean;
    onSuccess?: () => void;
}) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const { t } = useTranslation();
    const { data, isLoading, error } = useSubscriptionPlans();
    const plans: PlanUI[] = data ? data.map(mapApiPlanToUI) : [];
    const { data: session } = useSession();
    const { data: currentSubscription } = useCurrentSubscription();
    const navigate = useNavigate();
    const changeMutation = useChangeSubscription();
    const purchaseMutation = useSubscriptionPurchase();

    const handleBillingToggle = () => {
        setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
    };

    const handleAction = (planId: string, interval: 'month' | 'year') => {
        if (!session) {
            toast.error(t('auth.errors.loginRequired', 'Veuillez vous connecter pour souscrire à une offre.'));
            navigate('/login');
            return;
        }
        if (useChange) {
            changeMutation.mutate(
                { planId, interval },
                {
                    onSuccess: () => {
                        toast.success(t('subscription.change.success', 'Abonnement changé avec succès'));
                        onSuccess?.();
                    },
                    onError: (error: unknown) => {
                        const message = typeof error === 'object' && error && 'message' in error ? (error as Record<string, unknown>).message as string : undefined;
                        toast.error(message || t('common.error', "Erreur lors du changement d'abonnement"));
                    },
                }
            );
        } else {
            purchaseMutation.purchase({ planId, interval });
        }
    };

    return (
        <section className="p-4 sm:p-6 w-full">
            <div className="mx-auto max-w-5xl text-white">
                <div className="flex flex-row justify-center sm:py-6 pb-8 md:pb-8">
                    <div className="px-4 max-w-xs sm:max-w-xl md:max-w-2xl">
                        <Typography as={'h2'} align='center' className="text-xl sm:text-2xl md:text-3xl">
                            {t('landing.planTitle')}
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
                        {t('landing.mensual')}
                    </Typography>

                    <Switch
                        aria-label={t('landing.switchPlan')}
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
                        {t('landing.annual')}
                    </Typography>
                </div>

                {isLoading && (
                    <div className="flex sm:flex-row flex-col justify-center items-center gap-6 w-full py-8">
                        {[...Array(3)].map((_, i) => (
                            <PlanCardSkeleton key={i} />
                        ))}
                    </div>
                )}
                {error && (
                    <div className="flex justify-center items-center py-8">
                        <Typography color="error">{t('common.error', 'Une erreur est survenue')}</Typography>
                    </div>
                )}
                {!isLoading && !error && (
                    <div className="flex sm:flex-row flex-col justify-center items-center gap-6 w-full">
                        {plans.map((plan) => {
                            const isCurrent = currentSubscription && currentSubscription.planName === plan.title && ((billingCycle === 'monthly' && currentSubscription.interval === 'month') || (billingCycle === 'annual' && currentSubscription.interval === 'year'));
                            return (
                                <PlanItem
                                    key={plan.id}
                                    plan={plan}
                                    billingCycle={billingCycle}
                                    onAction={handleAction}
                                    isProcessing={useChange ? changeMutation.isPending : purchaseMutation.isLoading}
                                    isSelected={isCurrent}
                                    actionLabel={useChange ? t('subscription.change.button', 'Changer') : undefined}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}