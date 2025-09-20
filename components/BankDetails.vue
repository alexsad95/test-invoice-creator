<script setup lang="ts">
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { useInvoiceStore } from '~/stores/invoiceStore';
import { formatNumber } from '~/utils/format';
import maibImage from '/assets/images/maib.svg';

const invoiceStore = useInvoiceStore();
</script>

<template>
  <div class="space-y-4 w-full md:w-1/2">
    <h2 class="text-lg font-bold text-foreground">Bank details</h2>
    
    <!-- Financial Summary -->
    <div class="relative">
      <!-- Bank account -->
      <Input
        type="text"
        placeholder="41399128191019"
        class="h-8 pr-16"
        :model-value="invoiceStore.invoiceFormData.bankAccount"
        @update:model-value="invoiceStore.updateInvoiceFormData({ bankAccount: String($event) })"
      />
      <span class="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 flex items-center">
        <img :src="maibImage" alt="MAIB" class="h-4">
      </span>
    </div>

    <!-- Subtotal -->
    <div class="flex justify-between items-center">
      <span class="text-sm font-bold text-foreground">Subtotal</span>
      <span class="text-sm font-bold text-foreground">Mdl {{ formatNumber(invoiceStore.subtotal) }}</span>
    </div>
    
    <div class="flex justify-between items-center">
      <span class="text-sm font-bold text-foreground">VAT</span>
      <span class="text-sm font-bold text-foreground">Mdl {{ formatNumber(invoiceStore.vat) }}</span>
    </div>
    
    <!-- Discount -->
    <div class="flex flex-col">
      <Label class="block text-sm font-medium mb-1">Discount</Label>
      <div class="flex items-center">
        <Input
          type="number"
          class="h-8 w-20 rounded-r-none"
          placeholder="0"
        />
        <span class="h-8 px-3 bg-white text-muted-foreground border border-l-0 border-input rounded-r-md text-sm flex items-center justify-center">%</span>
      </div>
    </div>
    
    <!-- Total -->
    <div class="flex justify-between items-center pt-2 border-t border-border">
      <span class="text-lg font-bold text-foreground">Total</span>
      <span class="text-lg font-bold text-foreground">Mdl {{ formatNumber(invoiceStore.total) }}</span>
    </div>

    <!-- Add advanced paid link -->
    <div class="pt-2">
      <Button variant="link" class="!p-0 text-custom-link-blue active:text-custom-link-blue/80">
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
          <path d="M7 3.67133V9.32867M4.17133 6.5H9.82867M13 6.5C13 7.28793 12.8448 8.06815 12.5433 8.7961C12.2417 9.52405 11.7998 10.1855 11.2426 10.7426C10.6855 11.2998 10.0241 11.7417 9.2961 12.0433C8.56815 12.3448 7.78793 12.5 7 12.5C6.21207 12.5 5.43185 12.3448 4.7039 12.0433C3.97595 11.7417 3.31451 11.2998 2.75736 10.7426C2.20021 10.1855 1.75825 9.52405 1.45672 8.7961C1.15519 8.06815 1 7.28793 1 6.5C1 4.9087 1.63214 3.38258 2.75736 2.25736C3.88258 1.13214 5.4087 0.5 7 0.5C8.5913 0.5 10.1174 1.13214 11.2426 2.25736C12.3679 3.38258 13 4.9087 13 6.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Add advanced paid
      </Button>
    </div>
  </div>
</template>