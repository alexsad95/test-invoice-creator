import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Invoice, InvoiceItem } from '~/types';

export const useInvoiceStore = defineStore('invoice', () => {
  const invoices = ref<Invoice[]>([]);
  const currentInvoice = ref<Invoice | null>(null);
  const isLoading = ref(false);

  const totalInvoices = computed(() => invoices.value.length);
  const paidInvoices = computed(() => invoices.value.filter((invoice) => invoice.status === 'paid'));
  const overdueInvoices = computed(() => invoices.value.filter((invoice) => invoice.status === 'overdue'));
  const totalRevenue = computed(() => paidInvoices.value.reduce((sum, invoice) => sum + invoice.total, 0));

  const createInvoice = (invoiceData: Omit<Invoice, 'id'>): Invoice => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: generateId(),
    };

    invoices.value.push(newInvoice);
    return newInvoice;
  };

  const updateInvoice = (id: string, updates: Partial<Omit<Invoice, 'id'>>): void => {
    const index = invoices.value.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
      invoices.value[index] = { ...invoices.value[index], ...updates } as Invoice;
    }
  };

  const deleteInvoice = (id: string): void => {
    const index = invoices.value.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
      invoices.value.splice(index, 1);
    }
  };

  const getInvoiceById = (id: string): Invoice | undefined => {
    return invoices.value.find((invoice) => invoice.id === id);
  };

  const calculateInvoiceTotal = (items: InvoiceItem[]): { subtotal: number; tax: number; total: number } => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.2; // 20% налог
    const total = subtotal + tax;

    return { subtotal, tax, total };
  };

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  return {
    invoices,
    currentInvoice,
    isLoading,
    totalInvoices,
    paidInvoices,
    overdueInvoices,
    totalRevenue,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById,
    calculateInvoiceTotal,
  };
});
