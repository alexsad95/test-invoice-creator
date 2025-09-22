<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoiceStore';

const invoiceStore = useInvoiceStore();

// Load invoices from localStorage when page mounts
onMounted(async () => {
  await invoiceStore.loadInvoicesFromStorage();
});

// Computed properties for better organization
const invoices = computed(() => invoiceStore.invoices);
const isLoading = computed(() => invoiceStore.isLoading);
</script>

<template>
  <div class="min-h-screen">
    <InvoicesHeader />
    <InvoicesContent :invoices="invoices" :is-loading="isLoading" />
  </div>
</template>
