import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { randomUUID, getTodayDate } from '~/utils/helpers';
import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem, STORAGE_KEYS } from '~/utils/localStorage';
import { useUIState } from '~/composables/useUIState';
import { useInvoiceCalculations } from '~/composables/useInvoiceCalculations';
import type { Invoice, InvoiceItem, InvoiceFormData } from '~/types';

export const useInvoiceStore = defineStore('invoice', () => {
  // Load data from localStorage when initializing (only on client side)
  const invoices = ref<Invoice[]>([]);
  const currentInvoice = ref<Invoice | null>(import.meta.client ? getLocalStorageItem(STORAGE_KEYS.CURRENT_INVOICE, null) : null);
  const isLoading = ref(true);
  const lastPDFUpdateTime = ref<Date | null>(null);

  const todayDate = getTodayDate();

  // Invoice creation form state
  const invoiceFormData = ref<InvoiceFormData>({
    id: randomUUID(),
    invoiceNumber: '',
    issueDate: todayDate,
    dueDate: todayDate,
    from: '',
    to: '',
    bankAccount: '',
    discount: 10,
    notes: '',
    items: [
      {
        id: randomUUID(),
        name: 'Services of Marketing',
        quantity: 1,
        pricePerUnit: 24000,
        vat: '15%',
        discount: 10,
      },
      {
        id: randomUUID(),
        name: 'Logo',
        quantity: 1,
        pricePerUnit: 24000,
        vat: '20%',
      },
      {
        id: randomUUID(),
        name: 'Sirius Skells',
        quantity: 1,
        pricePerUnit: 24000,
        vat: '15%',
      },
    ],
  });

  // Use composables for calculations
  const calculations = useInvoiceCalculations(invoiceFormData);
  const uiState = useUIState();

  // Computed properties for invoices
  const totalInvoices = computed(() => invoices.value.length);
  const paidInvoices = computed(() => invoices.value.filter((invoice) => invoice.status === 'paid'));
  const overdueInvoices = computed(() => invoices.value.filter((invoice) => invoice.status === 'overdue'));
  const totalRevenue = computed(() => paidInvoices.value.reduce((sum, invoice) => sum + invoice.total, 0));

  // Form management methods
  const updateInvoiceFormData = (updates: Partial<InvoiceFormData>): void => {
    invoiceFormData.value = { ...invoiceFormData.value, ...updates };
    lastPDFUpdateTime.value = new Date();
  };

  const updatePDFPreviewTime = (): void => {
    lastPDFUpdateTime.value = new Date();
  };

  const addInvoiceItem = (): void => {
    const newItem: InvoiceItem = {
      id: randomUUID(),
      name: '',
      quantity: 0,
      pricePerUnit: 0,
      vat: '0%',
    };

    invoiceFormData.value.items.push(newItem);
    lastPDFUpdateTime.value = new Date();
  };

  const deleteInvoiceItem = (index: number): void => {
    invoiceFormData.value.items.splice(index, 1);
    lastPDFUpdateTime.value = new Date();
  };

  const updateInvoiceItem = (index: number, updates: Partial<InvoiceItem>): void => {
    if (invoiceFormData.value.items[index]) {
      invoiceFormData.value.items[index] = { ...invoiceFormData.value.items[index], ...updates };
      lastPDFUpdateTime.value = new Date();
    }
  };

  const addItemDescription = (): void => {
    if (invoiceFormData.value.items.length > 0) {
      const lastIndex = invoiceFormData.value.items.length - 1;
      const lastItem = invoiceFormData.value.items[lastIndex];
      if (lastItem && !lastItem.description) {
        lastItem.description = '';
        lastPDFUpdateTime.value = new Date();
      }
    }
  };

  const addItemDiscount = (): void => {
    if (invoiceFormData.value.items.length > 0) {
      const lastIndex = invoiceFormData.value.items.length - 1;
      const lastItem = invoiceFormData.value.items[lastIndex];
      if (lastItem && lastItem.discount === undefined) {
        lastItem.discount = 0;
        lastPDFUpdateTime.value = new Date();
      }
    }
  };

  const resetInvoiceForm = (): void => {
    invoiceFormData.value = {
      id: randomUUID(),
      invoiceNumber: '',
      issueDate: todayDate,
      dueDate: todayDate,
      from: '',
      to: '',
      discount: 0,
      bankAccount: '',
      notes: '',
      items: [],
    };
    lastPDFUpdateTime.value = new Date();
  };

  // Invoice management methods
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
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.pricePerUnit), 0);

    return {
      subtotal,
      tax: subtotal * 0.15,
      total: subtotal + (subtotal * 0.15),
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
        id: randomUUID(),
        number: invoiceFormData.value.invoiceNumber,
        date: invoiceFormData.value.issueDate,
        dueDate: invoiceFormData.value.dueDate,
        from: invoiceFormData.value.from,
        to: invoiceFormData.value.to,
        items: invoiceFormData.value.items,
        subtotal: calculations.subtotal.value,
        tax: calculations.vat.value,
        total: calculations.total.value,
        status: 'draft',
        notes: invoiceFormData.value.notes,
        bankAccount: invoiceFormData.value.bankAccount,
      };

      // Always add new invoice (no duplicate check)
      invoices.value.push(newInvoice);
      resetInvoiceForm();
      uiState.closeSheet();

      return newInvoice;
    } catch (error) {
      return null;
    }
  };

  // localStorage methods
  const loadInvoicesFromStorage = async () => {
    if (!import.meta.client) {
      isLoading.value = false;
      return;
    }

    const savedInvoices = getLocalStorageItem(STORAGE_KEYS.INVOICES, []);

    invoices.value = savedInvoices;
    isLoading.value = false;
  };

  const loadInvoiceFormData = () => {
    const savedFormData = getLocalStorageItem(STORAGE_KEYS.INVOICE_FORM_DATA, null);
    if (savedFormData) {
      invoiceFormData.value = savedFormData;
    }
  };

  const clearInvoiceFormData = () => {
    invoiceFormData.value = {
      id: randomUUID(),
      invoiceNumber: '',
      issueDate: todayDate,
      dueDate: todayDate,
      from: '',
      to: '',
      discount: 0,
      bankAccount: '',
      notes: '',
      items: [],
    };
    lastPDFUpdateTime.value = new Date();
    removeLocalStorageItem(STORAGE_KEYS.INVOICE_FORM_DATA);
  };

  const clearAllData = () => {
    invoices.value = [];
    currentInvoice.value = null;
    clearInvoiceFormData();
    // Explicitly clear localStorage
    removeLocalStorageItem(STORAGE_KEYS.INVOICES);
    removeLocalStorageItem(STORAGE_KEYS.CURRENT_INVOICE);
    console.log('All data cleared from localStorage');
  };

  const forceSaveInvoices = () => {
    setLocalStorageItem(STORAGE_KEYS.INVOICES, invoices.value);
  };

  // Watchers for automatic saving to localStorage
  watch(invoices, (newInvoices) => {
    // Only run on client side
    if (!import.meta.client) return;
    // Only save if not empty array (prevent clearing on initialization)
    if (newInvoices.length > 0) {
      setLocalStorageItem(STORAGE_KEYS.INVOICES, newInvoices);
    }
  }, { deep: true });

  watch(currentInvoice, (newCurrentInvoice) => {
    // Only run on client side
    if (!import.meta.client) return;

    // Only save if not null (prevent clearing on initialization)
    if (newCurrentInvoice !== null) {
      setLocalStorageItem(STORAGE_KEYS.CURRENT_INVOICE, newCurrentInvoice);
    }
  }, { deep: true });

  watch(invoiceFormData, (newFormData) => {
    // Only run on client side
    if (!import.meta.client) return;

    // Update PDF preview time when form data changes
    lastPDFUpdateTime.value = new Date();

    // Always save form data as it's always initialized
    setLocalStorageItem(STORAGE_KEYS.INVOICE_FORM_DATA, newFormData);
  }, { deep: true });

  return {
    // State
    invoices,
    currentInvoice,
    isLoading,
    isSheetOpen: uiState.isSheetOpen,
    invoiceFormData,
    lastPDFUpdateTime,

    // Computed
    subtotal: calculations.subtotal,
    vat: calculations.vat,
    total: calculations.total,
    totalInvoices,
    paidInvoices,
    overdueInvoices,
    totalRevenue,

    // Methods for form handling
    updateInvoiceFormData,
    updatePDFPreviewTime,
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

    // Methods for localStorage
    loadInvoicesFromStorage,
    loadInvoiceFormData,
    clearInvoiceFormData,
    clearAllData,
    forceSaveInvoices,

    // UI methods
    openSheet: uiState.openSheet,
    closeSheet: uiState.closeSheet,
    toggleSheet: uiState.toggleSheet,
  };
});
