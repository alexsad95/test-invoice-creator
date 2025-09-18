<script setup lang="ts">
import NewInvoiceForm from '~/components/NewInvoiceForm.vue';
import PDFPreview from '~/components/PDFPreview.vue';
</script>

<template>
  <main class="bg-gray-100 flex-1 flex items-center justify-center">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row max-w-8xl mx-auto gap-4">
        <!-- Левый блок - формы и настройки (больше) -->
        <div class="flex-[50%] py-4 pl-4">
          <NewInvoiceForm />
        </div>
        <!-- Правый блок - PDF превью (меньше) -->
        <div class="flex-[40%] py-4 pr-4">
          <PDFPreview />
        </div>
      </div>
    </div>
  </main>
</template>