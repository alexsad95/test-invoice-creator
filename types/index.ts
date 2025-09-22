export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';
export type VAT = '0%' | '5%' | '7%' | '10%' | '12%' | '15%' | '17%' | '20%';
export type UoM = 'pcs' | 'hrs' | 'kg';

export interface InvoiceItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  discount?: number;
  uoM?: UoM;
  vat: VAT;
  pricePerUnit: number;
  amount?: number;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  from: string;
  to: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  notes?: string;
  bankAccount?: string;
}

export interface InvoiceFormData {
  id: string;
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
