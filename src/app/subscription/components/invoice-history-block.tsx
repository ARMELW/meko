import { useInvoices } from '@/app/subscription/hooks/use-invoices';
import { Typography } from '@/components';

export function InvoiceHistoryBlock() {
  const { data: invoices, isLoading, error } = useInvoices();
  return (
    <div className="mt-8 mb-4">
      <Typography weight="bold" className="text-lg text-white mb-2 tracking-wide">
        HISTORIQUE DE FACTURATION
      </Typography>
      {isLoading ? (
        <div className="text-center py-4 text-white">Chargement de l'historique...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">Erreur lors du chargement de l'historique de facturation.</div>
      ) : Array.isArray(invoices) && invoices.length > 0 ? (
        <div className="bg-meko-blue-dark rounded-lg p-4 flex flex-col gap-2">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm text-white">
              <thead>
                <tr className="bg-meko-blue-light-2">
                  <th className="px-2 py-1 text-left">Offre</th>
                  <th className="px-2 py-1 text-left">Période</th>
                  <th className="px-2 py-1 text-left">Montant</th>
                  <th className="px-2 py-1 text-left">Statut</th>
                  <th className="px-2 py-1 text-left">Facture</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id} className="border-b border-meko-blue-light-1">
                    <td className="px-2 py-1">{inv.planName}</td>
                    <td className="px-2 py-1">
                      {new Date(inv.periodStart).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      {inv.periodEnd && inv.periodEnd !== inv.periodStart ?
                        ` - ${new Date(inv.periodEnd).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}` : ''}
                    </td>
                    <td className="px-2 py-1 font-mono">
                      {(inv.amount / 100).toFixed(2)}&nbsp;{inv.currency.toUpperCase()}
                    </td>
                    <td className="px-2 py-1">
                      <span className={inv.status === 'paid' ? 'text-green-400' : 'text-yellow-400'}>
                        {inv.status === 'paid' ? 'Payée' : inv.status}
                      </span>
                    </td>
                    <td className="px-2 py-1">
                      <a
                        href={inv.invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-meko-blue-light-1 hover:text-orange-400"
                        aria-label={`Télécharger la facture ${inv.id}`}
                      >
                        PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-300">Aucune facture trouvée.</div>
      )}
    </div>
  );
}
