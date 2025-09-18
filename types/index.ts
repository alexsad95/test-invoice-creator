export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  client: {
    name: string;
    email: string;
    address: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

// Типы для формы создания инвойса
export interface InvoiceFormData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  from: string;
  to: string;
  discount: number;
  discountPercent: number;
  bankAccount: string;
  notes: string;
  items: InvoiceFormItem[];
}

export interface InvoiceFormItem {
  description: string;
  quantity: number;
  uoM: string;
  pricePerUnit: number;
  vat: string;
  amount: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  phone?: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';
