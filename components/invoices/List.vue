<script setup lang="ts">
import type { Invoice } from '~/types';

interface Props {
  invoices: Invoice[];
}

defineProps<Props>();
</script>

<template>
  <div class="w-full bg-white shadow overflow-hidden sm:rounded-md">
    <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
      <h3 class="text-lg leading-6 font-medium text-gray-900">All Invoices</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Complete list of all your invoices
      </p>
    </div>

    <ul class="divide-y divide-gray-200">
      <InvoicesItem
        v-for="invoice in invoices"
        :key="invoice.id"
        :invoice="invoice"
      />
    </ul>
  </div>
</template>
