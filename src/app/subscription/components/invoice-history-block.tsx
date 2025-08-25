
import { useInvoices } from '@/app/subscription/hooks/use-invoices';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Typography } from '@/components';
import { cva } from "class-variance-authority";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="mt-8 mb-4">
      <Card className="flex flex-col ">
        <div
          className="flex justify-between items-center text-sm cursor-pointer p-4 border-b border-meko-blue-light-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Typography color="default" weight="bold" styleCase="uppercase">
            {t('subscription.invoiceHistory.title')}
          </Typography>
          <svg
            className={`w-4 h-4 text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isExpanded && (
          <CardContent className="flex flex-col justify-center w-full">
            {isLoading ? (
              <div className="text-center py-4 text-white">{t('subscription.invoiceHistory.loading')}</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{t('subscription.invoiceHistory.error')}</div>
            ) : Array.isArray(invoices) && invoices.length > 0 ? (
              <div className="bg-meko-blue-dark rounded-lg flex flex-col gap-2">
                {/* Desktop / tablet: table view */}
                <div className="overflow-x-auto hidden sm:block">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3"></TableHead>
                        <TableHead>{t('subscription.invoiceHistory.period')}</TableHead>
                        <TableHead>{t('subscription.invoiceHistory.paymentDate')}</TableHead>
                        <TableHead className="text-right">{t('subscription.invoiceHistory.amount')}</TableHead>
                        <TableHead>{t('subscription.invoiceHistory.invoice')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map(inv => (
                        <TableRow key={inv.id} className="border-b border-meko-blue-light-1">
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <Typography color="primary" weight="bold" styleCase="uppercase">
                                {t('subscription.invoiceHistory.offer')} {inv.planName}
                              </Typography>
                              {inv.isTrial && (
                                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-yellow-400 text-black font-bold">{t('subscription.invoiceHistory.trial')}</span>
                              )}
                              {inv.isRefund && (
                                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-red-500 text-white font-bold">{t('subscription.invoiceHistory.refunded')}</span>
                              )}
                              {!inv.isTrial && (<span className={intervalBadgeVariants({ interval: inv.interval })}>
                                {inv.interval === 'year' ? t('subscription.invoiceHistory.yearly') : t('subscription.invoiceHistory.monthly')}
                              </span>)}
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
                              aria-label={t('subscription.invoiceHistory.downloadInvoice', { id: inv.id, defaultValue: `Télécharger la facture ${inv.id}` })}
                            >
                              {t('subscription.invoiceHistory.view')}
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile: stacked card view */}
                <div className="flex flex-col gap-3 sm:hidden p-2">
                  {invoices.map(inv => (
                    <div key={inv.id} className="bg-meko-blue-darker rounded-lg p-3 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Typography color="primary" weight="bold" styleCase="uppercase">
                              {t('subscription.invoiceHistory.offer')} {inv.planName}
                            </Typography>
                            {inv.isTrial && (
                              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-yellow-400 text-black font-bold">{t('subscription.invoiceHistory.trial')}</span>
                            )}
                            {inv.isRefund && (
                              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-red-500 text-white font-bold">{t('subscription.invoiceHistory.refunded')}</span>
                            )}
                            {!inv.isTrial && (<span className={intervalBadgeVariants({ interval: inv.interval })}>
                              {inv.interval === 'year' ? t('subscription.invoiceHistory.yearly') : t('subscription.invoiceHistory.monthly')}
                            </span>)}
                          </div>
                          <div className="text-sm text-gray-300 mt-1">
                            <span>{new Date(inv.periodStart).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            {inv.periodEnd && inv.periodEnd !== inv.periodStart ? (
                              <span className="font-bold mx-2">—</span>
                            ) : null}
                            {inv.periodEnd && inv.periodEnd !== inv.periodStart ? (
                              <span>{new Date(inv.periodEnd).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            ) : null}
                          </div>
                        </div>
                        <div className="text-right text-white font-mono">
                          {inv.amount}&nbsp;{inv.currency.toUpperCase()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <a
                          href={inv.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-meko-blue-light-1 hover:text-orange-400"
                          aria-label={t('subscription.invoiceHistory.downloadInvoice', { id: inv.id, defaultValue: `Télécharger la facture ${inv.id}` })}
                        >
                          {t('subscription.invoiceHistory.view')}
                        </a>
                        <span className="text-sm text-gray-300">{new Date(inv.periodStart).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-300">
                <div className="mb-2">{t('subscription.invoiceHistory.noInvoices')}</div>
                <div className="text-meko-blue-light-1">{t('subscription.invoiceHistory.trialOngoing')}</div>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
// End of InvoiceHistoryBlock
}
