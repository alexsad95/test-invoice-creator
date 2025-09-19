<script setup lang="ts">
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { useInvoiceStore } from '~/stores/invoiceStore';
import { formatNumber } from '~/utils/format';

const invoiceStore = useInvoiceStore();
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-bold text-foreground">Bank details</h2>
    
    <div class="flex items-center space-x-3">
      <div class="flex-1">
        <Input
          :model-value="invoiceStore.invoiceFormData.bankAccount"
          @update:model-value="invoiceStore.updateInvoiceFormData({ bankAccount: String($event) })"
          type="text"
          placeholder="41399128191019"
        />
      </div>
      <div class="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
        <div class="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
          <span class="text-white text-xs font-bold">M</span>
        </div>
        <span class="text-green-800 font-medium text-sm">maib</span>
      </div>
    </div>

    <!-- Financial Summary -->
    <Card>
      <CardContent class="p-4 space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-muted-foreground">Subtotal</span>
          <span class="text-sm font-medium text-foreground">Mdl {{ formatNumber(invoiceStore.subtotal) }}</span>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-muted-foreground">VAT</span>
          <span class="text-sm font-medium text-foreground">Mdl {{ formatNumber(invoiceStore.vat) }}</span>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-muted-foreground">Discount %</span>
          <div class="flex">
            <Input
              :model-value="invoiceStore.invoiceFormData.discount"
              @update:model-value="invoiceStore.updateInvoiceFormData({ discount: Number($event) })"
              type="number"
              class="w-16 h-8 text-sm rounded-r-none"
              placeholder="10"
            />
            <Button variant="ghost" size="sm" class="rounded-l-none">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </Button>
          </div>
        </div>
        
        <div class="flex justify-between items-center pt-2 border-t border-border">
          <span class="text-sm font-bold text-foreground">Total</span>
          <span class="text-sm font-bold text-foreground">Mdl {{ formatNumber(invoiceStore.total) }}</span>
        </div>
      </CardContent>
    </Card>

    <!-- Add advanced paid link -->
    <div class="pt-2">
      <Button variant="link" size="sm">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Add advanced paid
      </Button>
    </div>

    <!-- Notes section -->
    <div class="space-y-2">
      <Label for="message">Notes (optional)</Label>
      <Textarea
        :model-value="invoiceStore.invoiceFormData.notes"
        @update:model-value="invoiceStore.updateInvoiceFormData({ notes: String($event) })"
        class="resize-none h-28"
        placeholder="Add Notes"
      />
      <p class="text-xs text-muted-foreground">The notes will be displayed on the invoice; you can see them on the preview on the right.</p>
    </div>
  </div>
</template>