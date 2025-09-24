<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useInvoiceStore } from '~/stores/invoiceStore';

const invoiceStore = useInvoiceStore();

const handleSave = () => {
  const savedInvoice = invoiceStore.saveInvoiceFromForm();
  if (savedInvoice) {
    toast.success('Invoice has been saved successfully');
  } else {
    toast.error('Failed to save invoice. Please check all required fields.');
  }
};
</script>

<template>
  <!-- Invoice Details Sheet -->
  <Sheet v-model:open="invoiceStore.isSheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Invoice details</SheetTitle>
        <SheetDescription>
          Current invoice information from the form
        </SheetDescription>
      </SheetHeader>

      <!-- Invoice form data information -->
      <div class="px-4 overflow-y-auto">
        <div class="mb-4">
          <span class="block font-medium text-sm text-gray-500 pb-4 ">Invoice form data information</span>
          <Textarea
            class="block p-4 bg-gray-100 font-mono rounded-md text-sm overflow-auto h-40"
            :model-value="JSON.stringify(invoiceStore.invoiceFormData, null, 2)"
          />
        </div>

        <!-- Calculations -->
        <div class="mb-4">
          <span class="block font-medium text-sm text-gray-500 pb-4 ">Calculations</span>
          <Textarea
            class="block p-4 bg-gray-100 font-mono rounded-md text-sm overflow-auto h-fit"
            :model-value="JSON.stringify({
              subtotal: invoiceStore.subtotal,
              vat: invoiceStore.vat,
              total: invoiceStore.total,
              discount: invoiceStore.invoiceFormData.discount + '%'
            }, null, 2)"
          />
        </div>
      </div>

      <SheetFooter>
        <Button type="button" @click="handleSave">
          Save invoice
        </Button>
        <SheetClose as-child>
          <Button variant="outline">
            Cancel
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
