<script setup lang="ts">
import { formatDate } from '~/utils/format';
import { truncateText } from '~/utils/helpers';
import type { Invoice } from '~/types';

interface Props {
  invoice: Invoice;
}

defineProps<Props>();

// Status colors
const getStatusColor = (status: string) => {
  switch (status) {
  case 'draft': return 'bg-gray-100 text-gray-800';
  case 'sent': return 'bg-blue-100 text-blue-800';
  case 'paid': return 'bg-green-100 text-green-800';
  case 'overdue': return 'bg-red-100 text-red-800';
  default: return 'bg-gray-100 text-gray-800';
  }
};

</script>

<template>
  <li class="hover:bg-gray-50">
    <div class="px-4 py-4 sm:px-6">
      <div class="flex items-center justify-between">
        <div class="flex">
          <div class="flex-shrink-0">
            <div class="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
              <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <div class="flex items-center">
              <p class="text-medium font-medium text-gray-900">
                Invoice #{{ invoice.number }}
              </p>
              <span :class="['ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusColor(invoice.status)]">
                {{ invoice.status }}
              </span>
            </div>
            <div class="mt-1">
              <p class="text-sm italic text-gray-500">
                {{ invoice.from }} → {{ invoice.to }}
              </p>
            </div>
            <div class="mt-4">
              <div v-if="invoice.date" class="flex gap-2">
                <p class="text-sm font-medium text-gray-900">Issue Date: </p>
                <p class="text-sm text-gray-500">{{ formatDate(invoice.date) }}</p>
              </div>
              <div v-if="invoice.dueDate" class="flex gap-2">
                <p class="text-sm font-medium text-gray-900">Due Date: </p>
                <p class="text-sm text-gray-500">{{ formatDate(invoice.dueDate) }}</p>
              </div>
              <div v-if="invoice.items.length > 0" class="flex gap-2">
                <p class="text-sm font-medium text-gray-900">Items: </p>
                <p class="text-sm text-gray-500">{{ invoice.items.length }} items</p>
              </div>
              <div v-if="invoice.bankAccount" class="flex gap-2">
                <p class="text-sm font-medium text-gray-900">Bank Account: </p>
                <p class="text-sm text-gray-500">{{ invoice.bankAccount }}</p>
              </div>
              <div v-if="invoice.notes" class="flex gap-2 max-w-[300px]">
                <p class="text-sm font-medium text-gray-900">Notes: </p>
                <p class="text-sm text-gray-500">{{ truncateText(invoice.notes, 100) }}</p>
              </div>
            </div>
            <CommonSummary
              class="mt-4 max-[460px]:block hidden"
              :invoice="invoice"
            />
          </div>
        </div>

        <CommonSummary
          class="max-[460px]:hidden"
          :invoice="invoice"
        />
      </div>
    </div>
  </li>
</template>
