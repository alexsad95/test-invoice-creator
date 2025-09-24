<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { CalendarDays } from 'lucide-vue-next';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import type { DateValue , CalendarDate } from '@internationalized/date';

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select date',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const isOpen = ref(false);
const selectedDate = ref<CalendarDate | undefined>(
  props.modelValue ? parseDate(props.modelValue) : undefined,
);

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    try {
      selectedDate.value = parseDate(newValue);
    } catch {
      selectedDate.value = undefined;
    }
  } else {
    selectedDate.value = undefined;
  }
}, { immediate: true });

const displayValue = computed(() => {
  if (!selectedDate.value) return '';
  return selectedDate.value.toDate(getLocalTimeZone()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
});

const formatDateForInput = (date: CalendarDate): string => {
  return date.toString();
};

const handleDateSelect = (date: DateValue | undefined) => {
  if (date && 'year' in date && 'month' in date && 'day' in date) {
    selectedDate.value = date as CalendarDate;
    const formattedDate = formatDateForInput(date as CalendarDate);
    emit('update:modelValue', formattedDate);
  } else {
    selectedDate.value = undefined;
    emit('update:modelValue', '');
  }
  isOpen.value = false;
};
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button
        variant="secondary"
        :class="[
          '!px-3 !py-5 text-sm w-full justify-start text-left font-normal border border-gray-200',
          !selectedDate && 'text-muted-foreground'
        ]"
        :disabled="disabled"
      >
        <CalendarDays class="h-4 w-4" />
        {{ selectedDate ? displayValue : placeholder }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0 border border-gray-200" align="start">
      <Calendar
        :model-value="selectedDate as any"
        :disabled="disabled"
        initial-focus
        @update:model-value="handleDateSelect"
      />
    </PopoverContent>
  </Popover>
</template>
