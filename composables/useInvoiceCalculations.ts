import { computed, type Ref } from 'vue';
import type { InvoiceFormData, InvoiceItem } from '~/types';

/**
 * Calculation composables
 */
export const useInvoiceCalculations = (formData: Ref<InvoiceFormData>) => {
  const calculateAmountWithoutVat = (item: InvoiceItem) => {
    const individualDiscount = (1 - (item?.discount ?? 0) / 100);
    const generalDiscount = (1 - (formData.value?.discount ?? 0) / 100);

    return Math.round(item.quantity * item.pricePerUnit * individualDiscount * generalDiscount);
  };

  const calculateVatAmount = (item: InvoiceItem) => {
    const individualDiscount = (1 - (item?.discount ?? 0) / 100);
    const generalDiscount = (1 - (formData.value?.discount ?? 0) / 100);
    const vatRate = Number(item.vat.replace('%', '')) / 100;

    return Math.round(item.quantity * item.pricePerUnit * individualDiscount * generalDiscount * vatRate);
  };

  const calculateAmount = (item: InvoiceItem, totalDiscount: number) => {
    const individualDiscount = (1 - (item?.discount ?? 0) / 100);
    const generalDiscount = (1 - totalDiscount / 100);
    const vat = (1 + Number(item.vat.replace('%', '')) / 100);
  
    return Math.round(item.quantity * item.pricePerUnit * individualDiscount * generalDiscount * vat);
  };

  const subtotal = computed((): number => {
    const items = formData.value?.items || [];
    return items.reduce((sum: number, item: InvoiceItem) => sum + calculateAmountWithoutVat(item), 0);
  });

  const vat = computed((): number => {
    const items = formData.value?.items || [];
    return items.reduce((sum: number, item: InvoiceItem) => sum + calculateVatAmount(item), 0);
  });

  const total = computed((): number => {
    return subtotal.value + vat.value;
  });

  return {
    calculateAmountWithoutVat,
    calculateVatAmount,
    calculateAmount,
    subtotal,
    vat,
    total,
  };
};