<script setup lang="ts">
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { DatePicker } from '~/components/ui/date-picker';
import { useInvoiceStore } from '~/stores/invoiceStore';

const invoiceStore = useInvoiceStore();
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-bold text-foreground">Invoice details</h2>
    
    <div class="flex flex-col gap-4">
      <!-- Invoice number -->
      <div>
        <Label class="block text-sm font-medium mb-1">Invoice number</Label>
        <div class="relative">
          <Input
            type="text"
            placeholder="254267225"
            :model-value="invoiceStore.invoiceFormData.invoiceNumber"
            @update:model-value="invoiceStore.updateInvoiceFormData({ invoiceNumber: String($event) })"
          />
          <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="flex flex-row gap-2 items-center justify-between">
        <!-- Issue date -->
        <div class="w-full">
          <Label class="block text-sm font-medium mb-1">Issue date</Label>
          <DatePicker
            placeholder="Select issue date"
            :model-value="invoiceStore.invoiceFormData.issueDate"
            @update:model-value="invoiceStore.updateInvoiceFormData({ issueDate: String($event) })"
          />
        </div>
        
        <!-- Due date -->
        <div class="w-full">
          <Label class="block text-sm font-medium mb-1">Due date</Label>
          <DatePicker
            placeholder="Select due date"
            :model-value="invoiceStore.invoiceFormData.dueDate"
            @update:model-value="invoiceStore.updateInvoiceFormData({ dueDate: String($event) })"
          />
        </div>
      </div>

      <div class="flex flex-row gap-2 items-center justify-between">
        <!-- From -->
        <div class="w-full">
          <Label class="block text-sm font-medium mb-1">From</Label>
          <Input
            type="text"
            placeholder="Boris Expert"
            :model-value="invoiceStore.invoiceFormData.from"
            @update:model-value="invoiceStore.updateInvoiceFormData({ from: String($event) })"
          />
        </div>
        
        <!-- To -->
        <div class="w-full">
          <Label class="block text-sm font-medium mb-1">To</Label>
          <Select 
            :model-value="invoiceStore.invoiceFormData.to"
            @update:model-value="invoiceStore.updateInvoiceFormData({ to: String($event) })"
          >
            <SelectTrigger class="w-full bg-white text-black">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General Construct">General Construct</SelectItem>
              <SelectItem value="Another Company">Another Company</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </div>
</template>