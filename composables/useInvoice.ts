import { computed } from 'vue';
import { useInvoiceStore } from '~/stores/invoiceStore';
import type { InvoiceStatus } from '~/types';

export const useInvoice = () => {
  const invoiceStore = useInvoiceStore();

  const invoices = computed(() => invoiceStore.invoices);
  const currentInvoice = computed(() => invoiceStore.currentInvoice);
  const isLoading = computed(() => invoiceStore.isLoading);

  const stats = computed(() => ({
    total: invoiceStore.totalInvoices,
    paid: invoiceStore.paidInvoices.length,
    overdue: invoiceStore.overdueInvoices.length,
    revenue: invoiceStore.totalRevenue,
  }));

  const getInvoicesByStatus = (status: InvoiceStatus) => {
    return computed(() => invoices.value.filter((invoice) => invoice.status === status));
  };

  const getInvoicesByClient = (clientName: string) => {
    return computed(() =>
      invoices.value.filter((invoice) => invoice.client.name.toLowerCase().includes(clientName.toLowerCase())),
    );
  };

  const getInvoicesByDateRange = (startDate: string, endDate: string) => {
    return computed(() =>
      invoices.value.filter((invoice) => {
        const invoiceDate = new Date(invoice.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return invoiceDate >= start && invoiceDate <= end;
      }),
    );
  };

  return {
    invoices,
    currentInvoice,
    isLoading,
    stats,
    getInvoicesByStatus,
    getInvoicesByClient,
    getInvoicesByDateRange,
    createInvoice: invoiceStore.createInvoice,
    updateInvoice: invoiceStore.updateInvoice,
    deleteInvoice: invoiceStore.deleteInvoice,
    getInvoiceById: invoiceStore.getInvoiceById,
  };
};
