import { ref, watch, type Ref } from 'vue';
import type { InvoiceFormData } from '~/types';
import { useInvoiceCalculations } from '~/composables/useInvoiceCalculations';

// Import jsPDF dynamically to avoid SSR issues
let jsPDF: any = null;

const initJsPDF = async () => {
  if (!jsPDF && import.meta.client) {
    try {
      const jsPDFModule = await import('jspdf');
      jsPDF = jsPDFModule.default;
    } catch (error) {
      console.error('Error loading jsPDF:', error);
      throw new Error('Failed to load PDF generator');
    }
  }
  return jsPDF;
};

export const usePDFGenerator = (invoiceFormData: Ref<InvoiceFormData>) => {
  const pdfBlob = ref<Blob | null>(null);
  const pdfUrl = ref<string | null>(null);
  const error = ref<string | null>(null);
  const lastGeneratedHash = ref<string>('');
  
  // Get calculation functions from composable
  const calculations = useInvoiceCalculations(invoiceFormData);

  // Create hash from form data and store values to avoid unnecessary regeneration
  const createFormHash = (data: InvoiceFormData): string => {
    const hashData = {
      from: data.from || '',
      to: data.to || '',
      invoiceNumber: data.invoiceNumber || '',
      issueDate: data.issueDate || '',
      dueDate: data.dueDate || '',
      notes: data.notes || '',
      bankAccount: data.bankAccount || '',
      discount: data.discount || 0,
      items: data.items.map(item => ({
        name: item.name || '',
        quantity: item.quantity || 0,
        pricePerUnit: item.pricePerUnit || 0,
        vat: item.vat || '0%',
        discount: item.discount || 0
      })),
      // Include calculated values from composable
      subtotal: calculations.subtotal.value,
      vat: calculations.vat.value,
      total: calculations.total.value
    };
    return JSON.stringify(hashData);
  };

  // Generate PDF document
  const generatePDF = async () => {
    try {
      // Check if we have minimum data
      if (!invoiceFormData.value.from && !invoiceFormData.value.to && invoiceFormData.value.items.length === 0) {
        throw new Error('Please fill in some form data first');
      }

      // Create hash of current form data
      const currentHash = createFormHash(invoiceFormData.value);
      
      // Skip generation if data hasn't changed and we already have a PDF
      if (currentHash === lastGeneratedHash.value && pdfUrl.value) {
        return;
      }

      error.value = null;

      // Initialize jsPDF
      const jsPDFClass = await initJsPDF();
      if (!jsPDFClass) {
        throw new Error('Failed to initialize PDF generator');
      }

      // Create new PDF document with better settings
      const doc = new jsPDFClass({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 14;

      // Helper function to add text with word wrap
      const addText = (text: string, x: number, y: number, options: any = {}) => {
        const maxWidth = options.maxWidth || pageWidth - x - 10;
        const fontSize = options.fontSize || 12;
        const fontStyle = options.fontStyle || 'normal';
        
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', fontStyle);
        
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        
        return y + (lines.length * fontSize * 0.4) + (options.margin || 2);
      };

      // Header
      yPosition = addText('INVOICE', 20, yPosition, { 
        fontSize: 28, 
        fontStyle: 'bold',
        align: 'center',
        margin: 15 
      });

      // Invoice details section
      const leftColumn = 20;
      const rightColumn = pageWidth - 120;
      
      // Left column - From/To
      yPosition = addText('From:', leftColumn, yPosition, { fontSize: 10, fontStyle: 'bold' });
      yPosition = addText(invoiceFormData.value.from || 'Your Company Name', leftColumn, yPosition);
      yPosition = addText('To:', leftColumn, yPosition, { fontSize: 10, fontStyle: 'bold' });
      yPosition = addText(invoiceFormData.value.to || 'Client Name', leftColumn, yPosition);

      // Right column - Invoice details
      let rightY = 40;
      rightY = addText(`Invoice #: ${invoiceFormData.value.invoiceNumber || 'N/A'}`, rightColumn, rightY, { fontSize: 10, fontStyle: 'bold' });
      rightY = addText(`Issue Date: ${invoiceFormData.value.issueDate || new Date().toLocaleDateString()}`, rightColumn, rightY, { fontSize: 10, fontStyle: 'bold' });
      rightY = addText(`Due Date: ${invoiceFormData.value.dueDate || new Date().toLocaleDateString()}`, rightColumn, rightY, { fontSize: 10, fontStyle: 'bold' });
      if (invoiceFormData.value.bankAccount) {
        rightY = addText(`Bank Details: ${invoiceFormData.value.bankAccount}`, rightColumn, rightY, { fontSize: 10, fontStyle: 'bold' });
      }

      // Use the higher Y position
      yPosition = Math.max(yPosition, rightY) + 20;

      // Items table
      if (invoiceFormData.value.items.length > 0) {
        // Table header
        const tableTop = yPosition;
        const colPositions = [22, 110, 120, 135, 155, 170];
        
        // Header background
        doc.setFillColor(245, 245, 245);
        doc.rect(20, tableTop - 5, pageWidth - 40, 10, 'F');
        
        // Header text
        const headers = ['Name', 'Qty', 'Price', 'Discount', 'VAT', 'Amount'];
        headers.forEach((header, index) => {
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text(header, colPositions[index] || 20, tableTop);
        });
        
        yPosition = tableTop + 15;
        
        // Table rows
        invoiceFormData.value.items.forEach((item) => {
          if (yPosition > pageHeight - 50) {
            doc.addPage();
            yPosition = 20;
          }
          
          const itemTotal = calculations.calculateAmount(item, invoiceFormData.value.discount);
          
          const rowData = [
            item.name || 'Item',
            item.quantity?.toString() || '0',
            (item.pricePerUnit || 0).toString(),
            item.discount ? `${item.discount}%` : '-',
            item.vat || '0%',
            itemTotal.toString(),
          ];
          
          rowData.forEach((data, colIndex) => {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(data, colPositions[colIndex] || 20, yPosition);
          });
          
          yPosition += 8;
        });
        
        yPosition += 10;
        
        // Totals section - using values from calculations composable
        const totalsX = pageWidth - 80;
        
        yPosition = addText(`Subtotal: ${calculations.subtotal.value} MDL`, totalsX, yPosition, { fontSize: 10, margin: 2 });
        yPosition = addText(`VAT: ${calculations.vat.value} MDL`, totalsX, yPosition, { fontSize: 10, margin: 2 });
        yPosition = addText(`Total: ${calculations.total.value} MDL`, totalsX, yPosition, { fontSize: 12, fontStyle: 'bold', margin: 5 });
      }

      // Generate PDF blob
      const pdfBlobGenerated = doc.output('blob');
      
      // Clean up previous URL
      if (pdfUrl.value) {
        URL.revokeObjectURL(pdfUrl.value);
      }
      
      // Create object URL for preview
      pdfUrl.value = URL.createObjectURL(pdfBlobGenerated);
      pdfBlob.value = pdfBlobGenerated;
      
      // Save hash to prevent unnecessary regeneration
      lastGeneratedHash.value = currentHash;
      
    } catch (err) {
      console.error('PDF generation error:', err);
      error.value = err instanceof Error ? err.message : 'Failed to generate PDF';
    }
  };

  // Watch for changes in invoice form data and store values
  let debounceTimer: NodeJS.Timeout | null = null;
  
  const triggerPDFGeneration = () => {
    if (import.meta.client && invoiceFormData.value) {
      // Clear previous timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      
      // Debounce PDF generation to avoid too many calls
      debounceTimer = setTimeout(() => {
        if (invoiceFormData.value && (invoiceFormData.value.from || invoiceFormData.value.to || invoiceFormData.value.items.length > 0)) {
          generatePDF();
        }
      }, 300); // Increased debounce time to 300ms
    }
  };
  
  // Watch form data changes
  watch(
    invoiceFormData,
    triggerPDFGeneration,
    { deep: true, immediate: false }
  );
  
  // Watch calculated values changes from composable
  watch(
    [() => calculations.subtotal.value, () => calculations.vat.value, () => calculations.total.value],
    triggerPDFGeneration,
    { immediate: false }
  );

  // Cleanup function
  const cleanup = () => {
    if (pdfUrl.value) {
      URL.revokeObjectURL(pdfUrl.value);
    }
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  };

  // Manual PDF generation function
  const generatePDFManual = async () => {
    await generatePDF();
  };

  return {
    pdfBlob,
    pdfUrl,
    error,
    generatePDF: generatePDFManual,
    cleanup
  };
};
