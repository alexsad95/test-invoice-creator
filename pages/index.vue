<script setup lang="ts">
import Header from '~/components/Header.vue';
import NewInvoiceForm from '~/components/NewInvoiceForm.vue';
import PDFPreview from '~/components/PDFPreview.vue';
</script>

<template>
  <div class="min-h-screen bg-base-100 flex flex-col">
    <Header />

    <main class="bg-gray-100 flex-1 flex items-center justify-center">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <!-- Левый блок - формы и настройки -->
          <div class="p-4">
            <NewInvoiceForm />
          </div>
          <!-- Правый блок - PDF превью -->
          <div class="p-4">
            <PDFPreview />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>