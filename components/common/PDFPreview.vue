<script setup lang="ts">
import { computed, onUnmounted } from 'vue';
import { useInvoiceStore } from '~/stores/invoiceStore';
import { usePDFGenerator } from '~/composables/usePDFGenerator';

const invoiceStore = useInvoiceStore();

// Use PDF generator
const { pdfUrl, error, cleanup, generatePDF } = usePDFGenerator(
  computed(() => invoiceStore.invoiceFormData)
);

// Format time for display
const formatLastUpdateTime = (date: Date | null) => {
  if (!date) return 'Never updated';

  const timeString = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return `Updated ${timeString}`;
};

// Cleanup on unmount
onUnmounted(() => {
  cleanup();
});

// Computed properties
const showPDF = computed(() => {
  return !!pdfUrl.value && !error.value;
});

const shouldShowError = computed(() => {
  return !!error.value;
});

</script>

<template>
  <div class="flex-[40%] h-full flex flex-col min-h-[400px]">
    <!-- Last update time indicator -->
    <div class="mb-2 text-right">
      <p class="text-xs text-gray-500">
        {{ formatLastUpdateTime(invoiceStore.lastPDFUpdateTime) }}
      </p>
      <p v-if="showPDF" class="text-xs text-green-600">
        ✓ PDF Ready
      </p>
    </div>

    <!-- Error state -->
    <div v-if="shouldShowError" class="flex-1 flex items-center justify-center bg-[#E6E7EB] rounded shadow-sm min-h-[600px]">
      <div class="text-center text-gray-500">
        <svg class="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p class="text-sm font-medium">PDF Generation Error</p>
        <p class="text-xs text-gray-400 mt-1">{{ error }}</p>
        <Button
          variant="default"
          size="sm"
          class="mt-4"
          @click="generatePDF"
        >
          Retry
        </Button>
      </div>
    </div>

    <!-- PDF Preview -->
    <div v-else-if="showPDF" class="flex-1 bg-white rounded shadow-sm overflow-hidden">
      <iframe
        :src="pdfUrl || undefined"
        class="w-full h-full border-0 min-h-[600px]"
        title="PDF Document Preview"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="flex-1 flex items-center justify-center bg-[#E6E7EB] rounded shadow-sm">
      <div class="text-center text-gray-500">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-sm font-medium">PDF Preview</p>
        <p class="text-xs text-gray-400 mt-1">Fill in the form to see preview</p>
        <Button
          variant="default"
          size="sm"
          class="mt-4"
          @click="generatePDF"
        >
          Generate PDF
        </Button>
      </div>
    </div>
  </div>
</template>
