/**
 * Utility functions for formatting data
 */

export const formatCurrency = (amount: number, currency = 'RUB'): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

export const formatShortDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj);
};

export const formatInvoiceNumber = (number: string | number): string => {
  return `INV-${String(number).padStart(6, '0')}`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};
