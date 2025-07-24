import { useChangeSubscription } from '@/app/subscription/hooks/use-change-subscription';
import { useSubscriptionPlans } from '@/app/subscription-plan/hooks/use-subscription-plans';
import { useState } from 'react';

export function PlanSelectorModal({ show, onClose, onConfirm }: { show: boolean; onClose: () => void; onConfirm: () => void }) {
	const { mutate: changePlan, isPending: isChanging, isSuccess: changeSuccess, isError: changeError, error: changeErrorObj } = useChangeSubscription();
	const { data: plans, isLoading: isPlansLoading, error: plansError } = useSubscriptionPlans();
	const [selectedPlan, setSelectedPlan] = useState<{ planId: string; interval: 'month' | 'year' } | null>(null);

	if (!show) return null;
	return (
		<div className="mt-2 p-2 bg-white rounded shadow flex flex-col gap-2 items-center">
			<div className="font-bold text-meko-blue-dark mb-1 text-xs">Choisissez une nouvelle offre :</div>
			{isPlansLoading ? (
				<div className="text-center text-xs text-gray-500">Chargement des offres...</div>
			) : plansError ? (
				<div className="text-center text-xs text-red-500">Erreur lors du chargement des offres.</div>
			) : (
				<select
					className="border rounded px-1 py-1 text-xs"
					value={selectedPlan ? `${selectedPlan.planId}|${selectedPlan.interval}` : ''}
					onChange={e => {
						const [planId, interval] = e.target.value.split('|');
						setSelectedPlan(planId && interval ? { planId, interval: interval as 'month' | 'year' } : null);
					}}
				>
					<option value="">Sélectionner une offre</option>
					{Array.isArray(plans) && plans.flatMap(plan => {
						const options = [];
						if (plan.stripeIds?.monthly) {
							options.push(
								<option key={plan.id + '|month'} value={`${plan.id}|month`}>
									{`${plan.name} - Mensuel`}
								</option>
							);
						}
						if (plan.stripeIds?.yearly) {
							options.push(
								<option key={plan.id + '|year'} value={`${plan.id}|year`}>
									{`${plan.name} - Annuel`}
								</option>
							);
						}
						if (!plan.stripeIds?.monthly && !plan.stripeIds?.yearly) {
							options.push(
								<option key={plan.id} value={`${plan.id}|month`}>
									{plan.name}
								</option>
							);
						}
						return options;
					})}
				</select>
			)}
			<div className="flex gap-1 mt-1">
				<button
					disabled={!selectedPlan || isChanging}
					onClick={() => {
						if (selectedPlan) changePlan(selectedPlan, {
							onSuccess: () => {
								setSelectedPlan(null);
								onConfirm();
							}
						});
					}}
					className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-2 rounded shadow text-xs transition"
				>
					Confirmer
				</button>
				<button
					className="bg-gray-300 text-meko-blue-dark px-2 py-1 rounded text-xs font-bold"
					onClick={onClose}
				>
					Annuler
				</button>
			</div>
			{changeSuccess && (
				<div className="text-green-600 font-bold mt-1 text-xs">Changement d'offre effectué !</div>
			)}
			{changeError && (
				<div className="text-red-500 font-bold mt-1 text-xs">Erreur : {changeErrorObj?.message || 'Impossible de changer d\'offre.'}</div>
			)}
		</div>
	);
}
