<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoiceStore';  

const invoiceStore = useInvoiceStore();
</script>

<template>
  <!-- Notes section -->
  <div class="space-y-2">
    <Label for="message">Notes (optional)</Label>
    <Textarea
      placeholder="Add Notes"
      class="resize-none h-28"
      :model-value="invoiceStore.invoiceFormData.notes"
      @update:model-value="invoiceStore.updateInvoiceFormData({ notes: String($event) })"
    />
    <p class="text-xs text-muted-foreground">
      The notes will be displayed on the invoice; you can see them on the preview on the right.
    </p>
  </div>
</template>