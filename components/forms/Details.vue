<script setup lang="ts">
import { X } from 'lucide-vue-next';
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
            type="number"
            placeholder="254267225"
            class="pr-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            :model-value="invoiceStore.invoiceFormData.invoiceNumber"
            @update:model-value="invoiceStore.updateInvoiceFormData({ invoiceNumber: String($event) })"
          />
          <Button 
            v-if="invoiceStore.invoiceFormData.invoiceNumber"
            variant="secondary"
            size="sm"
            class="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            @click="invoiceStore.updateInvoiceFormData({ invoiceNumber: '' })"
          >
            <X class="h-4 w-4" />
          </Button>
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
        <div class="w-full relative">
          <Label class="block text-sm font-medium mb-1">From</Label>
          <Input
            type="text"
            placeholder="Boris Expert"
            class="pr-10"
            :model-value="invoiceStore.invoiceFormData.from"
            @update:model-value="invoiceStore.updateInvoiceFormData({ from: String($event) })"
          />
          <Button 
            v-if="invoiceStore.invoiceFormData.from"
            variant="secondary"
            size="sm"
            class="absolute right-1 top-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            @click="invoiceStore.updateInvoiceFormData({ from: '' })"
          >
            <X class="h-4 w-4" />
          </Button>
        </div>
        
        <!-- To -->
        <div class="w-full relative">
          <Label class="block text-sm font-medium mb-1">To</Label>
          <Input
            type="text"
            placeholder="General Construct"
            :model-value="invoiceStore.invoiceFormData.to"
            @update:model-value="invoiceStore.updateInvoiceFormData({ to: String($event) })"
          />
          <Button 
            v-if="invoiceStore.invoiceFormData.to"
            variant="secondary"
            size="sm"
            class="absolute right-1 top-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            @click="invoiceStore.updateInvoiceFormData({ to: '' })"
          >
            <X class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>