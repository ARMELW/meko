import { useInvoices } from '@/app/subscription/hooks/use-invoices';
import { Card, CardContent, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Typography } from '@/components';
import { cva } from "class-variance-authority";
const intervalBadgeVariants = cva(
  "px-2 py-0.5 rounded-full text-xs bg-meko-blue-darker font-bold inline-flex items-center justify-center ml-2",
  {
    variants: {
      interval: {
        year: "bg-meko-green text-white",
        month: "bg-meko-blue-light-2 text-white",
      },
    },
    defaultVariants: {
      interval: "month",
    },
  }
);

export function InvoiceHistoryBlock() {
  const { data: invoices, isLoading, error } = useInvoices();
  return (
    <div className="mt-8 mb-4">
      <Card className="flex flex-col ">
        <CardTitle
          title={"Historique"}
          className="flex justify-between items-center text-sm"
          titleColor="default"
        />
        <CardContent className="flex flex-col justify-center w-full">

          {isLoading ? (
            <div className="text-center py-4 text-white">Chargement de l'historique...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">Erreur lors du chargement de l'historique de facturation.</div>
          ) : Array.isArray(invoices) && invoices.length > 0 ? (
            <div className="bg-meko-blue-dark rounded-lg flex flex-col gap-2">
              <div className="overflow-x-auto">

                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3"></TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Date paiement</TableHead>
                      <TableHead className="text-right">Montant</TableHead>
                      <TableHead>Facture</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map(inv => (
                      <TableRow key={inv.id} className="border-b border-meko-blue-light-1">
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <Typography color="primary" weight="bold" styleCase="uppercase">
                              OFFRE {inv.planName}
                            </Typography>
                            <span className={intervalBadgeVariants({ interval: inv.interval })}>
                              {inv.interval === 'year' ? 'Annuel' : 'Mensuel'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span>{new Date(inv.periodStart).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          {inv.periodEnd && inv.periodEnd !== inv.periodStart ? (
                            <span className="font-bold mx-2">—</span>
                          ) : null}
                          {inv.periodEnd && inv.periodEnd !== inv.periodStart ? (
                            <span>{new Date(inv.periodEnd).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          ) : null}
                        </TableCell>
                        <TableCell className="font-mono">
                          {new Date(inv.periodStart).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </TableCell>
                        <TableCell className="text-right">
                          {inv.amount}&nbsp;{inv.currency.toUpperCase()}
                        </TableCell>
                        <TableCell>
                          <a
                            href={inv.invoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-meko-blue-light-1 hover:text-orange-400"
                            aria-label={`Télécharger la facture ${inv.id}`}
                          >
                            Voir
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-300">
              <div className="mb-2">Aucune facture trouvée.</div>
              <div className="text-meko-blue-light-1">Essai gratuit en cours. Les factures apparaîtront ici le jour de la facturation.</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
