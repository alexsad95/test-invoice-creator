export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface InvoiceItem {
  id?: string;
  name: string;
  quantity: number;
  uoM?: string;
  pricePerUnit: number;
  vat: string;
  amount: number;
  description?: string;
  discount?: number;
}

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
  status: InvoiceStatus;
  notes?: string;
}

export interface InvoiceFormData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  from: string;
  to: string;
  discount: number;
  bankAccount: string;
  notes: string;
  items: InvoiceItem[];
}
