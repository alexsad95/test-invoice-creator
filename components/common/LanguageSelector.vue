<script setup lang="ts">
interface Props {
  modelValue?: 'English' | 'Russian' | 'Română';
}

withDefaults(defineProps<Props>(), {
  modelValue: 'English'
});

const emit = defineEmits<{
  'update:modelValue': [value: 'English' | 'Russian' | 'Română'];
}>();

const handleLanguageChange = (value: 'English' | 'Russian' | 'Română') => {
  emit('update:modelValue', value);
};
</script>

<template>
  <Select :model-value="modelValue" @update:model-value="(value) => value && handleLanguageChange(value as 'English' | 'Russian' | 'Română')">
    <SelectTrigger class="w-auto border-1 border-gray-300 bg-transparent shadow-none hover:bg-gray-50">
      <span class="font-medium">{{ modelValue }}</span>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="English">English</SelectItem>
      <SelectItem value="Russian">Русский</SelectItem>
      <SelectItem value="Română">Română</SelectItem>
    </SelectContent>
  </Select>
</template>
