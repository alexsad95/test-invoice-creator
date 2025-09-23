// Composable functions for invoice management
import { computed, ref } from 'vue';

// Calculation composables
export const useInvoiceCalculations = (formData: any) => {
  const calculateAmountWithoutVat = (item: any) => {
    const individualDiscount = (1 - (item?.discount ?? 0) / 100);
    const generalDiscount = (1 - (formData.value?.discount ?? 0) / 100);

    return Math.round(item.quantity * item.pricePerUnit * individualDiscount * generalDiscount);
  };

  const calculateVatAmount = (item: any) => {
    const individualDiscount = (1 - (item?.discount ?? 0) / 100);
    const generalDiscount = (1 - (formData.value?.discount ?? 0) / 100);
    const vatRate = Number(item.vat.replace('%', '')) / 100;

    return Math.round(item.quantity * item.pricePerUnit * individualDiscount * generalDiscount * vatRate);
  };

  const subtotal = computed((): number => {
    const items = formData.value?.items || [];
    return items.reduce((sum: number, item: any) => sum + calculateAmountWithoutVat(item), 0);
  });

  const vat = computed((): number => {
    const items = formData.value?.items || [];
    return items.reduce((sum: number, item: any) => sum + calculateVatAmount(item), 0);
  });

  const total = computed((): number => {
    return subtotal.value + vat.value;
  });

  return {
    calculateAmountWithoutVat,
    calculateVatAmount,
    subtotal,
    vat,
    total,
  };
};

// UI state composables
export const useUIState = () => {
  const isSheetOpen = ref(false);

  const openSheet = () => {
    isSheetOpen.value = true;
  };

  const closeSheet = () => {
    isSheetOpen.value = false;
  };

  const toggleSheet = () => {
    isSheetOpen.value = !isSheetOpen.value;
  };

  return {
    isSheetOpen,
    openSheet,
    closeSheet,
    toggleSheet,
  };
};
