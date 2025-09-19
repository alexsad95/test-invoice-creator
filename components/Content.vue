<script setup lang="ts">
import NewInvoiceForm from '~/components/NewInvoiceForm.vue';
import PDFPreview from '~/components/PDFPreview.vue';
</script>

<template>
  <main class="bg-gray-100 flex-1 flex items-center justify-center">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row max-w-8xl mx-auto gap-4">
        <NewInvoiceForm />
        <PDFPreview />
      </div>
    </div>
  </main>
</template>