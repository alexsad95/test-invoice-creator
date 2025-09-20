import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { randomUUID } from '~/utils/helpers';
import type { Invoice, InvoiceItem, InvoiceFormData } from '~/types';

export const useInvoiceStore = defineStore('invoice', () => {
  const invoices = ref<Invoice[]>([]);
  const currentInvoice = ref<Invoice | null>(null);
  const isLoading = ref(false);
  const isSheetOpen = ref(false);

  // Invoice creation form state
  const invoiceFormData = ref<InvoiceFormData>({
    id: randomUUID(),
    invoiceNumber: '',
    issueDate: '2024-09-07',
    dueDate: '2024-09-07',
    from: '',
    to: '',
    discount: 0,
    bankAccount: '',
    notes: '',
    items: [],
  });

  const subtotal = computed((): number => {
    return invoiceFormData.value.items.reduce((sum, item) => sum + (item.amount || 0), 0);
  });

  const vat = computed((): number => {
    return subtotal.value * 0.15;
  });

  const total = computed((): number => {
    const discountAmount = subtotal.value * (invoiceFormData.value.discount / 100);
    return subtotal.value + vat.value - discountAmount;
  });

  const totalInvoices = computed(() => invoices.value.length);
  const paidInvoices = computed(() => invoices.value.filter((invoice) => invoice.status === 'paid'));
  const overdueInvoices = computed(() => invoices.value.filter((invoice) => invoice.status === 'overdue'));
  const totalRevenue = computed(() => paidInvoices.value.reduce((sum, invoice) => sum + invoice.total, 0));

  const updateInvoiceFormData = (updates: Partial<InvoiceFormData>): void => {
    invoiceFormData.value = { ...invoiceFormData.value, ...updates };
  };

  const addInvoiceItem = (): void => {
    const newItem: InvoiceItem = {
      id: randomUUID(),
      name: '',
      quantity: 0,
      pricePerUnit: 0,
      vat: '0%',
      amount: 0,
    };

    invoiceFormData.value.items.push(newItem);
  };

  const deleteInvoiceItem = (index: number): void => {
    invoiceFormData.value.items.splice(index, 1);
  };

  const updateInvoiceItem = (index: number, updates: Partial<InvoiceItem>): void => {
    if (invoiceFormData.value.items[index]) {
      invoiceFormData.value.items[index] = { ...invoiceFormData.value.items[index], ...updates };
    }
  };

  const addItemDescription = (): void => {
    if (invoiceFormData.value.items.length > 0) {
      const lastIndex = invoiceFormData.value.items.length - 1;
      const lastItem = invoiceFormData.value.items[lastIndex];
      if (lastItem && !lastItem.description) {
        lastItem.description = '';
      }
    }
  };

  const addItemDiscount = (): void => {
    if (invoiceFormData.value.items.length > 0) {
      const lastIndex = invoiceFormData.value.items.length - 1;
      const lastItem = invoiceFormData.value.items[lastIndex];
      if (lastItem && lastItem.discount === undefined) {
        lastItem.discount = 0;
      }
    }
  };

  const resetInvoiceForm = (): void => {
    invoiceFormData.value = {
      id: randomUUID(),
      invoiceNumber: '',
      issueDate: '2024-09-07',
      dueDate: '2024-09-07',
      from: '',
      to: 'General Construct',
      discount: 0,
      bankAccount: '',
      notes: '',
      items: [],
    };
  };

  const createInvoice = (invoiceData: Omit<Invoice, 'id'>): Invoice => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: randomUUID(),
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

  const calculateInvoiceTotal = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    return {
      subtotal,
      tax: subtotal * 0.15,
      total: subtotal + (subtotal * 0.15)
    };
  };

  const saveInvoiceFromForm = (): Invoice | null => {
    try {
      if (!invoiceFormData.value.invoiceNumber || !invoiceFormData.value.from || !invoiceFormData.value.to) {
        throw new Error('Please fill in all required fields');
      }

      if (!invoiceFormData.value.items.length) {
        throw new Error('Please add at least one item');
      }

      const newInvoice: Invoice = {
        id: invoiceFormData.value.id,
        number: invoiceFormData.value.invoiceNumber,
        date: invoiceFormData.value.issueDate,
        dueDate: invoiceFormData.value.dueDate,
        client: {
          name: invoiceFormData.value.to,
          email: '',
          address: '',
        },
        items: invoiceFormData.value.items,
        subtotal: subtotal.value,
        tax: vat.value,
        total: total.value,
        status: 'draft',
        notes: invoiceFormData.value.notes,
      };

      invoices.value.push(newInvoice);

      resetInvoiceForm();

      isSheetOpen.value = false;

      return newInvoice;
    } catch (error) {
      console.error('Error saving invoice:', error);
      return null;
    }
  };

  return {
    // State
    invoices,
    currentInvoice,
    isLoading,
    isSheetOpen,
    invoiceFormData,
    
    // Computed
    subtotal,
    vat,
    total,
    totalInvoices,
    paidInvoices,
    overdueInvoices,
    totalRevenue,
    
    // Methods for form handling
    updateInvoiceFormData,
    addInvoiceItem,
    deleteInvoiceItem,
    updateInvoiceItem,
    addItemDescription,
    addItemDiscount,
    resetInvoiceForm,
    
    // Methods for invoice handling
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById,
    calculateInvoiceTotal,
    saveInvoiceFromForm,
  };
});
