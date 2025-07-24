import { Typography } from '@/components';
import { CurrentSubscription } from '@/app/subscription/api/current-subscription';

export function SubscriptionInfoBlock({ subscription }: { subscription: CurrentSubscription }) {
	return (
		<div className="bg-meko-blue-dark rounded-md p-2 flex flex-col gap-1">
			<Typography as="h2" weight="bold" className="text-sm sm:text-base text-white text-center mb-1">
				{subscription.planName}
			</Typography>
			<div className="flex flex-col sm:flex-row justify-between items-center gap-1">
				<div className="flex-1 text-white text-xs font-semibold bg-meko-blue-light-1 rounded px-1 py-1 text-center">
					Nombre d'enfants&nbsp;: <span className="font-bold">{subscription.maxChildren}{subscription.maxChildren > 1 ? ' max' : ''}</span>
				</div>
				<div className="flex-1 text-white text-xs font-semibold bg-meko-blue-light-1 rounded px-1 py-1 text-center">
					{subscription.isTrial ? 'Essai jusqu\'au' : 'Actif jusqu\'au'}&nbsp;
					<span className="font-bold">{new Date(subscription.activeUntil).toLocaleDateString()}</span>
				</div>
			</div>
		</div>
	);
}
