export function SubscriptionFeedbackBlock({ cancelSuccess, cancelError }: { cancelSuccess: boolean; cancelError: boolean }) {
    return (
        <>
            {cancelSuccess && (
                <div className="text-center py-1 text-green-600 font-bold text-xs">Abonnement annulé avec succès.</div>
            )}
            {cancelError && (
                <div className="text-center py-1 text-red-500 font-bold text-xs" >Erreur lors de l'annulation.</div>
            )}
        </>
    );
}
