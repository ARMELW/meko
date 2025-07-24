import { useCancelSubscription } from '@/app/subscription/hooks/use-cancel-subscription';
import { CurrentSubscription } from '@/app/subscription/api/current-subscription';

export function SubscriptionActionsBlock({ subscription, onShowPlanSelector }: { subscription: CurrentSubscription; onShowPlanSelector: () => void }) {
	const { mutate: cancel, isPending: isCancelling } = useCancelSubscription();
	return (
		<div className="flex flex-row gap-1 justify-center mt-1">
			<button
				className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-2 rounded shadow text-xs transition"
				onClick={onShowPlanSelector}
				disabled={subscription.isCanceled}
			>
				CHANGER D'OFFRE
			</button>
			<button
				className="bg-meko-blue-light-1 hover:bg-meko-blue-light-2 text-white font-bold py-1 px-2 rounded shadow text-xs transition disabled:opacity-60"
				onClick={() => cancel()}
				disabled={isCancelling || subscription.isCanceled}
			>
				{isCancelling ? 'Annulation...' : 'ANNULER'}
			</button>
		</div>
	);
}
