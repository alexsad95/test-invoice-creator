<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoiceStore';

interface Props {
  page?: 'invoices' | 'creator'
}

withDefaults(defineProps<Props>(), {
  page: 'invoices',
});

const invoiceStore = useInvoiceStore();

// Computed properties for invoices page
const invoices = computed(() => invoiceStore.invoices);
const isLoading = computed(() => invoiceStore.isLoading);

// Common styles for main blocks
const mainStyles = 'container mx-auto w-full flex-1 flex gap-4 justify-center px-6 py-8';
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <LayoutHeader :page="page" />

    <!-- Content based on page -->
    <!-- Invoices page content -->
    <main v-if="page === 'invoices'" :class="mainStyles">
      <InvoicesSkeleton v-if="isLoading" />
      <div v-else-if="invoices.length === 0" class="w-full bg-white shadow overflow-hidden sm:rounded-md">
        <InvoicesEmpty />
      </div>
      <InvoicesList v-else :invoices="invoices" />
    </main>

    <!-- Invoice creator page content -->
    <main v-else-if="page === 'creator'" :class="mainStyles + ' lg:flex-row flex-col'">
      <InvoicesNew />
      <CommonPDFPreview />
      <InvoicesResultSheet />
    </main>
  </div>
</template>
