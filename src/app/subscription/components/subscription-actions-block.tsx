import { useCancelSubscription } from '@/app/subscription/hooks/use-cancel-subscription';
import { CurrentSubscription } from '@/app/subscription/api/current-subscription';
import { Button } from '@/components/atoms/actions/button';
import { useNavigate } from 'react-router';

export function SubscriptionActionsBlock({ subscription }: { subscription: CurrentSubscription }) {
	const { mutate: cancel, isPending: isCancelling } = useCancelSubscription();
	const navigate = useNavigate();
	return (
		<div className="flex flex-row gap-1 justify-center my-2">
			<Button
				variant='primary'
				size='small'
				onClick={() => navigate('/subscription/change')}
				disabled={subscription.isCanceled}
			>
				CHANGER D'OFFRE
			</Button>
			<Button
				variant='secondary'
				size='small'
				onClick={() => cancel()}
				disabled={isCancelling || subscription.isCanceled}
			>
				{isCancelling ? 'Annulation...' : 'ANNULER'}
			</Button>
		</div>
	);
}
