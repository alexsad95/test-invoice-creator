<script setup lang="ts">
import type { Invoice } from '~/types';

interface Props {
  invoices: Invoice[];
  isLoading: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <main class="min-h-[calc(100vh-120px)] max-w-7xl mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
    <!-- Loading State -->
    <InvoicesSkeleton v-if="isLoading" />

    <!-- Empty State -->
    <div v-else-if="invoices.length === 0" class="bg-white shadow overflow-hidden sm:rounded-md">
      <EmptyInvoicesState />
    </div>

    <!-- Invoices List -->
    <InvoicesList v-else :invoices="invoices" />
  </main>
</template>
