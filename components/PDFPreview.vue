<script setup lang="ts">
import { ref } from 'vue';
import pdfPreviewImage from '~/assets/images/pdf-preview.png';

// Импортируем изображение напрямую из assets
const pdfImageSrc = ref<string>(pdfPreviewImage);

// Fallback на base64 изображение, если файл не найден
const handleImageError = (): void => {
  pdfImageSrc.value =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDYwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iODAwIiBmaWxsPSIjRjhGOUZBIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSI3NjAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNFNUU3RUIiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIzMDAiIHk9IjQwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNkM3NTdEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QREYgRG9jdW1lbnQ8L3RleHQ+Cjx0ZXh0IHg9IjMwMCIgeT0iNDQwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2Qzc1N0QiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlByZXZpZXc8L3RleHQ+Cjwvc3ZnPgo=';
};
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- PDF изображение -->
    <img 
      :src="pdfImageSrc" 
      alt="PDF Document Preview"
      class="max-w-full max-h-full object-contain rounded shadow-sm"
      @error="handleImageError"
    >
  </div>
</template>
