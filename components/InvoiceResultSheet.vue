<script setup lang="ts">
import { ref } from 'vue';
import { useInvoiceStore } from '~/stores/invoiceStore';

const invoiceStore = useInvoiceStore();
const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);

const handleSave = () => {
  const savedInvoice = invoiceStore.saveInvoiceFromForm();
  if (savedInvoice) {
    showSuccessMessage.value = true;
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  } else {
    showErrorMessage.value = true;
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 3000);
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
      
      <!-- Success/Error Messages -->
      <div v-if="showSuccessMessage" class="px-4 mb-4">
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ✅ Invoice saved successfully!
        </div>
      </div>
      
      <div v-if="showErrorMessage" class="px-4 mb-4">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          ❌ Failed to save invoice. Please check all required fields.
        </div>
      </div>

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
        <Button @click="handleSave" type="button">
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
