<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoiceStore';

interface Props {
  page?: 'invoices' | 'creator'
}

const props = withDefaults(defineProps<Props>(), {
  page: 'invoices'
});

const invoiceStore = useInvoiceStore();

// Computed properties for invoices page
const invoices = computed(() => invoiceStore.invoices);
const isLoading = computed(() => invoiceStore.isLoading);
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <LayoutHeader :page="page" />
    
    <!-- Content based on page -->
    <!-- Invoices page content -->
    <main v-if="page === 'invoices'" class="min-h-[calc(100vh-120px)] max-w-7xl mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <InvoicesSkeleton v-if="isLoading" />
      <div v-else-if="invoices.length === 0" class="bg-white shadow overflow-hidden sm:rounded-md">
        <InvoicesEmpty />
      </div>
      <InvoicesList v-else :invoices="invoices" />
    </main>

    <!-- Invoice creator page content -->
    <main v-else-if="page === 'creator'" class="bg-gray-100 flex-1 flex items-center justify-center">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row max-w-8xl mx-auto gap-4">
          <InvoicesNew />
          <CommonPDFPreview />
          <InvoicesResultSheet />
        </div>
      </div>
    </main>
  </div>
</template>
