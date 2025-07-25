import { Table, TableBody, TableCell, TableRow, Typography } from '@/components';
import { CurrentSubscription } from '@/app/subscription/api/current-subscription';

export function SubscriptionInfoBlock({ subscription }: { subscription: CurrentSubscription }) {
	return (
		<div className="bg-meko-blue-dark w-full text-center rounded-md p-2 flex flex-col gap-1">
			<Typography as="h3" weight="bold" align='center' className="py-3  text-white text-center mb-1">
				OFFRE {subscription.planName}
			</Typography>

			<Table>
				<TableBody>
					<TableRow>
						<TableCell styleCase="uppercase" color="primary" align="left">
							Nombre d'enfants
						</TableCell>
						<TableCell weight="default" align="right">
							{subscription.currentChildrenCount} sur {subscription.maxChildren}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell styleCase="uppercase" color="primary" align="left">
							{subscription.isTrial ? 'Essai jusqu\'au' : 'Actif jusqu\'au'}
						</TableCell>
						<TableCell weight="default" align="right">
							{new Date(subscription.activeUntil).toLocaleDateString()}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
