<script setup lang="ts">
import { ref } from 'vue';
import { useInvoiceStore } from '~/stores/invoiceStore';
import type { InvoiceItem, UoM, VAT } from '~/types';

const invoiceStore = useInvoiceStore();
const isSelectorOpen = ref(false);

const tableHeaderClass = 'text-left p-1 text-sm font-medium text-foreground';

const calculateAmount = (item: InvoiceItem) => {
  const individualDiscount = (1 - (item?.discount ?? 0) / 100);
  const generalDiscount = (1 - invoiceStore.invoiceFormData.discount / 100);
  const vat = (1 + Number(item.vat.replace('%', '')) / 100);

  return Math.round(item.quantity * item.pricePerUnit * individualDiscount * generalDiscount * vat);
};

const addNewLine = () => {
  invoiceStore.addInvoiceItem();
};

const deleteLine = (index: number) => {
  invoiceStore.deleteInvoiceItem(index);
};

const addDescription = () => {
  invoiceStore.addItemDescription();
  isSelectorOpen.value = false;
};

const addDiscount = () => {
  invoiceStore.addItemDiscount();
  isSelectorOpen.value = false;
};
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-bold text-foreground">Products and services</h2>
    
    <!-- Table of products and services -->
    <div v-if="invoiceStore.invoiceFormData.items.length > 0" class="overflow-x-auto -ml-4">
      <table class="w-full">
        <thead>
          <tr>
            <th :class="`${tableHeaderClass} w-3`"/>
            <th :class="`${tableHeaderClass} w-60`">Name</th>
            <th :class="`${tableHeaderClass} w-20`">Quantity</th>
            <th :class="`${tableHeaderClass} w-20`">UoM</th>
            <th :class="`${tableHeaderClass} w-24`">Price/Unit</th>
            <th :class="`${tableHeaderClass} w-20`">VAT</th>
            <th :class="`${tableHeaderClass} w-24`">Amount</th>
            <th :class="`${tableHeaderClass} w-8`"/>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in invoiceStore.invoiceFormData.items" :key="index">
            <!-- Main product line -->
            <tr class="border-b border-border/50">
              <td class="text-sm text-muted-foreground font-raleway">{{ index + 1 }}</td>
              <td class="p-1">
                <Input
                  type="text"
                  placeholder="Enter product name"
                  class="h-8 text-sm"
                  :model-value="item.name"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { name: String($event) })"
                />
              </td>
              <td class="p-1">
                <Input
                  type="number"
                  class="h-8 text-sm"
                  :model-value="item.quantity"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { quantity: Number($event) })"
                />
              </td>
              <td class="p-1">
                <Select 
                  :model-value="item.uoM"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { uoM: $event ? String($event) as UoM : undefined })"
                >
                  <SelectTrigger class="h-8 w-20 text-sm bg-white text-black">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="pcs">pcs</SelectItem>
                    <SelectItem value="hrs">hrs</SelectItem>
                  </SelectContent>
                </Select>
              </td>
              <td class="p-1">
                <Input
                  type="number"
                  class="h-8 text-sm"
                  :model-value="item.pricePerUnit"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { pricePerUnit: Number($event) })"
                />
              </td>
              <td class="p-1">
                <Select 
                  :model-value="item.vat"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { vat: String($event) as VAT })"
                >
                  <SelectTrigger class="h-8 w-20 text-sm bg-white text-black">
                    <SelectValue placeholder="0%" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0%">0%</SelectItem>
                    <SelectItem value="5%">5%</SelectItem>
                    <SelectItem value="7%">7%</SelectItem>
                    <SelectItem value="10%">10%</SelectItem>
                    <SelectItem value="12%">12%</SelectItem>
                    <SelectItem value="15%">15%</SelectItem>
                    <SelectItem value="17%">17%</SelectItem>
                    <SelectItem value="20%">20%</SelectItem>
                  </SelectContent>
                </Select>
              </td>
              <td class="p-1">
                <Input
                  type="number"
                  class="h-8 text-sm"
                  readonly
                  :model-value="calculateAmount(item)"
                />
              </td>
              <td class="p-1">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  class="h-8 border border-input"
                  @click="deleteLine(index)"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </Button>
              </td>
            </tr>

            <!-- Description line for this product -->
            <tr v-if="item.description !== undefined">
              <td/>
              <td colspan="7" class="p-1">
                <div class="flex gap-2">
                  <Textarea
                    rows="2"
                    placeholder="Add description"
                    class="resize-none w-full"
                    :model-value="item.description"
                    @update:model-value="invoiceStore.updateInvoiceItem(index, { description: String($event) })"
                  />
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    class="h-8 border border-input"
                    @click="invoiceStore.updateInvoiceItem(index, { description: undefined })"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </Button>
                </div>
              </td>
            </tr>

            <!-- Discount line for this product -->
            <tr v-if="item.discount !== undefined">
              <td/>
              <td colspan="7" class="p-1">
                <div class="flex items-center gap-2">
                  <div class="flex flex-col">
                    <Label class="block text-sm font-medium mb-1">Discount</Label>
                    <div class="flex items-center gap-2">
                      <div class="flex">
                        <Input
                          type="number"
                          placeholder="0"
                          class="h-8 w-20 rounded-r-none"
                          :model-value="item.discount"
                          @update:model-value="invoiceStore.updateInvoiceItem(index, { discount: Number($event) })"
                        />
                        <span class="h-8 px-3 bg-white text-muted-foreground border border-l-0 border-input rounded-r-md text-sm flex items-center justify-center">%</span>
                      </div>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        class="h-8 border border-input"
                        @click="invoiceStore.updateInvoiceItem(index, { discount: undefined })"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Add line button -->
    <div class="flex">
      <Button 
        variant="outline" 
        class="px-4 py-2 rounded-l-md rounded-r-none border-r-0" 
        @click="addNewLine"
      >
        Add line
      </Button>
      
      <div class="relative">
        <Select :open="isSelectorOpen" @update:open="isSelectorOpen = $event">
          <SelectTrigger 
            data-button-style="true" 
            class="px-2 hover:bg-accent rounded-r-md rounded-l-none [&_svg:last-child]:hidden disabled:cursor-not-allowed"
            style="border-color: var(--accent-foreground) !important; color: var(--accent-foreground) !important;"
            :disabled="invoiceStore.invoiceFormData.items.length === 0"
          >
            <svg class="w-4 h-4" fill="none" stroke="var(--accent-foreground)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </SelectTrigger>
          <SelectContent>
            <div class="flex flex-col">
              <button 
                class="w-auto text-left p-2 text-sm hover:bg-accent rounded-md transition-colors cursor-pointer"
                @click="addDescription"
              >
                Add description
              </button>
              <button 
                class="w-auto text-left p-2 text-sm hover:bg-accent rounded-md transition-colors cursor-pointer"
                @click="addDiscount"
              >
                Add discount
              </button>
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>