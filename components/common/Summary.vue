<script setup lang="ts">
import { formatNumber } from '~/utils/format';
import type { Invoice } from '~/types';

interface Props {
  invoice: Invoice;
}

defineProps<Props>();

// Calculate days until due
const getDaysUntilDue = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Get due status
const getDueStatus = (dueDate: string, status: string) => {
  if (status === 'paid') return 'Paid';
  const days = getDaysUntilDue(dueDate);
  if (days < 0) return 'Overdue';
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  return `Due in ${days} days`;
};
</script>

<template>
  <div class="flex items-center space-x-4">
    <div class="max-[460px]:text-left text-right">
      <p class="text-sm font-bold text-gray-900">
        MDL {{ formatNumber(invoice.total) }}
      </p>
      <p class="text-sm text-gray-500">
        {{ getDueStatus(invoice.dueDate, invoice.status) }}
      </p>
    </div>
  </div>
</template>
