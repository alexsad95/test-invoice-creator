/**
 * Save data to localStorage with error handling
 */
export function setLocalStorageItem(key: string, value: any): boolean {
  try {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false;
    }

    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

/**
 * Get data from localStorage with error handling
 */
export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  try {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return defaultValue;
    }

    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

/**
 * Remove item from localStorage
 */
export function removeLocalStorageItem(key: string): boolean {
  try {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false;
    }

    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
}

// Constants for localStorage keys
export const STORAGE_KEYS = {
  INVOICES: 'invoices',
  CURRENT_INVOICE: 'current_invoice',
  INVOICE_FORM_DATA: 'invoice_form_data',
} as const;
