import { CurrentSubscription } from '@/app/subscription/api/current-subscription';

export function SubscriptionStatusBlock({ subscription }: { subscription: CurrentSubscription }) {
	return (
		<div className="text-sm text-white text-center my-2">
			{subscription.isCanceled ? (
				<span>
					Abonnement annulé.<br />
					Vous gardez l'accès premium jusqu'au&nbsp;
					<span className="font-bold">
						{subscription.accessEndsAt ? new Date(subscription.accessEndsAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : 'fin de période'}
					</span>.<br />
					Après cette date, vous ne serez pas facturé et votre accès premium sera désactivé.<br />
					Vous pouvez souscrire une nouvelle offre à tout moment depuis cette page.
				</span>
			) : subscription.isTrial
				? ""
				: `Votre abonnement sera renouvelé automatiquement le ${new Date(subscription.activeUntil).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}.`}
		</div>
	);
}
