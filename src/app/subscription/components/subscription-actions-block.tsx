import { useCancelSubscription } from '@/app/subscription/hooks/use-cancel-subscription';
import { CurrentSubscription } from '@/app/subscription/api/current-subscription';
import { Button } from '@/components/atoms/actions/button';
import { Dialog, DialogCard, DialogContent, DialogFooter, DialogHeader, DialogTitle, Typography } from '@/components';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function SubscriptionActionsBlock({ subscription }: { subscription: CurrentSubscription }) {
	const { mutate: cancel, isPending: isCancelling } = useCancelSubscription();
	const navigate = useNavigate();
	const [showChangeModal, setShowChangeModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);

	const handleChangeConfirm = () => {
		setShowChangeModal(false);
		navigate('/subscription/change');
	};

	const handleCancelConfirm = () => {
		setShowCancelModal(false);
		cancel();
	};

	const getCancelButtonText = () => {
		if (isCancelling) return 'Annulation...';
		return subscription.isTrial ? 'ANNULER L\'ESSAI' : 'ANNULER';
	};

	const getCancelModalContent = () => {
		if (subscription.isTrial) {
			return {
				title: "Annuler l'essai gratuit",
				message: "Êtes-vous sûr de vouloir annuler votre essai gratuit ? Cette action mettra fin immédiatement à votre accès aux contenus premium.",
				confirmText: "Confirmer l'annulation de l'essai"
			};
		}
		return {
			title: "Annuler l'abonnement",
			message: "Êtes-vous sûr de vouloir annuler votre abonnement ? Cette action mettra fin à votre accès aux contenus premium à la fin de la période de facturation actuelle.",
			confirmText: "Confirmer l'annulation"
		};
	};

	const cancelModalContent = getCancelModalContent();

	return (
		<>
			<div className="flex flex-row gap-1 justify-center my-2">
				<Button
					variant='primary'
					size='small'
					onClick={() => setShowChangeModal(true)}
					disabled={subscription.isCanceled}
				>
					CHANGER D'OFFRE
				</Button>
				<Button
					variant='secondary'
					size='small'
					onClick={() => setShowCancelModal(true)}
					disabled={isCancelling || subscription.isCanceled}
				>
					{getCancelButtonText()}
				</Button>
			</div>

			{/* Dialog de confirmation pour changer d'offre */}
			<Dialog open={showChangeModal} onOpenChange={setShowChangeModal}>
				<DialogCard className="max-w-md">
					<DialogHeader>
						<DialogTitle title="Changer d'offre" />
					</DialogHeader>
					<DialogContent>
						<div className="py-4">
							<Typography className="text-center text-meko-blue-light-1">
								Êtes-vous sûr de vouloir changer votre offre d'abonnement ? Vous serez redirigé vers la page de sélection.
							</Typography>
						</div>
						<DialogFooter className="flex gap-3 justify-center">
							<Button
								variant="secondary"
								size="small"
								onClick={() => setShowChangeModal(false)}
							>
								Annuler
							</Button>
							<Button
								variant="primary"
								size="small"
								onClick={handleChangeConfirm}
							>
								Confirmer
							</Button>
						</DialogFooter>
					</DialogContent>
				</DialogCard>
			</Dialog>

			{/* Dialog de confirmation pour annuler l'abonnement */}
			<Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
				<DialogCard className="max-w-md">
					<DialogHeader>
						<DialogTitle title={cancelModalContent.title} />
					</DialogHeader>
					<DialogContent>
						<div className="py-4">
							<Typography className="text-center text-meko-blue-light-1">
								{cancelModalContent.message}
							</Typography>
						</div>
						<DialogFooter className="flex gap-3 justify-center">
							<Button
								variant="secondary"
								size="small"
								onClick={() => setShowCancelModal(false)}
							>
								{subscription.isTrial ? 'Garder l\'essai' : 'Garder l\'abonnement'}
							</Button>
							<Button
								variant="primary"
								size="small"
								onClick={handleCancelConfirm}
								disabled={isCancelling}
								className="bg-red-600 hover:bg-red-700"
							>
								{isCancelling ? 'Annulation...' : cancelModalContent.confirmText}
							</Button>
						</DialogFooter>
					</DialogContent>
				</DialogCard>
			</Dialog>
		</>
	);
}
