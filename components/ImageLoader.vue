<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Способы загрузки изображений в Nuxt</h3>
    
    <!-- Способ 1: Из public папки -->
    <div class="space-y-2">
      <h4 class="text-sm font-medium">1. Из public папки (рекомендуется)</h4>
      <p class="text-xs text-muted-foreground">
        Создайте папку public/images и поместите туда изображение
      </p>
      <img 
        src="/images/pdf-preview.png" 
        alt="PDF Preview from public"
        class="w-32 h-20 object-cover border rounded"
        @error="handlePublicError"
      >
      <p v-if="publicError" class="text-xs text-red-500">
        Ошибка загрузки из public: {{ publicError }}
      </p>
    </div>

    <!-- Способ 2: Через import -->
    <div class="space-y-2">
      <h4 class="text-sm font-medium">2. Через import (для assets)</h4>
      <p class="text-xs text-muted-foreground">
        Раскомментируйте import в коде для использования
      </p>
      <!-- 
      <img 
        :src="importedImage" 
        alt="PDF Preview from import"
        class="w-32 h-20 object-cover border rounded"
      />
      -->
      <div class="w-32 h-20 border rounded flex items-center justify-center text-xs text-muted-foreground">
        Import disabled
      </div>
    </div>

    <!-- Способ 3: Через useAsset -->
    <div class="space-y-2">
      <h4 class="text-sm font-medium">3. Через useAsset (динамическая загрузка)</h4>
      <p class="text-xs text-muted-foreground">
        Для динамической загрузки из assets
      </p>
      <img 
        :src="assetImage" 
        alt="PDF Preview from useAsset"
        class="w-32 h-20 object-cover border rounded"
        @error="handleAssetError"
      >
      <p v-if="assetError" class="text-xs text-red-500">
        Ошибка загрузки через useAsset: {{ assetError }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Способ 2: Import изображения (раскомментируйте для использования)
// import pdfPreviewImage from '~/assets/images/pdf-preview.png';
// const importedImage = pdfPreviewImage;

// Способ 3: Использование useAsset
const assetImage = useAsset('images/pdf-preview.png');

// Обработка ошибок
const publicError = ref<string>('');
const assetError = ref<string>('');

const handlePublicError = () => {
  publicError.value = 'Файл не найден в public/images/';
};

const handleAssetError = () => {
  assetError.value = 'Файл не найден в assets/images/';
};
</script>
