<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoiceStore';

const invoiceStore = useInvoiceStore();

// Load invoices from localStorage when page mounts
onMounted(async () => {
  await invoiceStore.loadInvoicesFromStorage();
});
</script>

<template>
  <Layout page="invoices" />
</template>
