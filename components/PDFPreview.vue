<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import pdfPreview from '~/assets/images/pdf-preview.png';

const imageError = ref(false);
const isLoading = ref(true);
const imageLoaded = ref(false);

const handleImageError = () => {
  imageError.value = true;
  isLoading.value = false;
  imageLoaded.value = false;
};

const handleImageLoad = () => {
  imageError.value = false;
  isLoading.value = false;
  imageLoaded.value = true;
};

onMounted(() => {
  const img = new Image();
  
  img.onload = () => {
    imageLoaded.value = true;
    isLoading.value = false;
    imageError.value = false;
  };
  
  img.onerror = () => {
    imageError.value = true;
    isLoading.value = false;
    imageLoaded.value = false;
  };
  
  img.src = pdfPreview;
});

const showImage = computed(() => {
  return pdfPreview && !imageError.value && imageLoaded.value;
});

</script>

<template>
  <div class="flex-[40%] py-4 pr-4 h-full flex flex-col">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center bg-[#E6E7EB] rounded shadow-sm">
      <div class="text-center text-gray-500">
        <p class="p-10 text-sm font-medium">Loading preview...</p>
      </div>
    </div>
    
    <!-- Error state -->
    <div v-else-if="imageError" class="flex-1 flex items-center justify-center bg-[#E6E7EB] rounded shadow-sm">
      <div class="text-center text-gray-500">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-sm font-medium">PDF Preview</p>
        <p class="text-xs text-gray-400 mt-1">Image not available</p>
      </div>
    </div>
    
    <!-- Success state -->
    <img 
      v-else-if="showImage"
      :src="pdfPreview || ''" 
      alt="PDF Document Preview"
      class="max-w-full max-h-full object-contain rounded shadow-sm"
      @error="handleImageError"
      @load="handleImageLoad"
    >
  </div>
</template>
