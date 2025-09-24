import { ref } from 'vue';

/**
 * UI state composables
 */
export const useUIState = () => {
  const isSheetOpen = ref(false);

  const openSheet = () => {
    isSheetOpen.value = true;
  };

  const closeSheet = () => {
    isSheetOpen.value = false;
  };

  const toggleSheet = () => {
    isSheetOpen.value = !isSheetOpen.value;
  };

  return {
    isSheetOpen,
    openSheet,
    closeSheet,
    toggleSheet,
  };
};
