<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { useInvoiceStore } from '~/stores/invoiceStore';

const invoiceStore = useInvoiceStore();
const isSelectorOpen = ref(false);

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
            <th class="text-left p-1 text-sm font-medium text-foreground w-3"/>
            <th class="text-left p-1 text-sm font-medium text-foreground w-60">Name</th>
            <th class="text-left p-1 text-sm font-medium text-foreground w-20">Quantity</th>
            <th class="text-left p-1 text-sm font-medium text-foreground w-20">UoM</th>
            <th class="text-left p-1 text-sm font-medium text-foreground w-24">Price/Unit</th>
            <th class="text-left p-1 text-sm font-medium text-foreground w-20">Vat</th>
            <th class="text-left p-1 text-sm font-medium text-foreground w-24">Amount</th>
            <th class="text-left p-1 text-sm font-medium text-foreground w-8"/>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in invoiceStore.invoiceFormData.items" :key="index">
            <!-- Main product line -->
            <tr class="border-b border-border/50">
              <td class="text-sm text-muted-foreground font-raleway">{{ index + 1 }}</td>
              <td class="p-1">
                <Input
                  :model-value="item.name"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { name: String($event) })"
                  type="text"
                  class="h-8 text-sm"
                  placeholder="Enter product name"
                />
              </td>
              <td class="p-1">
                <Input
                  :model-value="item.quantity"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { quantity: Number($event) })"
                  type="number"
                  class="h-8 text-sm"
                />
              </td>
              <td class="p-1">
                <Select 
                  :model-value="item.uoM"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { uoM: $event ? String($event) : undefined })"
                >
                  <SelectTrigger class="h-8 w-20 text-sm bg-white text-black">
                    <SelectValue placeholder="UoM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">-</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="pcs">pcs</SelectItem>
                    <SelectItem value="hrs">hrs</SelectItem>
                  </SelectContent>
                </Select>
              </td>
              <td class="p-1">
                <Input
                  :model-value="item.pricePerUnit"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { pricePerUnit: Number($event) })"
                  type="number"
                  class="h-8 text-sm"
                />
              </td>
              <td class="p-1">
                <Select 
                  :model-value="item.vat"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { vat: String($event) })"
                >
                  <SelectTrigger class="h-8 w-20 text-sm bg-white text-black">
                    <SelectValue placeholder="VAT" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0%">0%</SelectItem>
                    <SelectItem value="15%">15%</SelectItem>
                    <SelectItem value="20%">20%</SelectItem>
                  </SelectContent>
                </Select>
              </td>
              <td class="p-1">
                <Input
                  :model-value="item.amount"
                  @update:model-value="invoiceStore.updateInvoiceItem(index, { amount: Number($event) })"
                  type="number"
                  class="h-8 text-sm"
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
                    :model-value="item.description"
                    @update:model-value="invoiceStore.updateInvoiceItem(index, { description: String($event) })"
                    class="resize-none w-full"
                    rows="2"
                    placeholder="Add description"
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
                          :model-value="item.discount"
                           @update:model-value="invoiceStore.updateInvoiceItem(index, { discount: Number($event) })"
                          type="number"
                          class="h-8 w-20 rounded-r-none"
                          placeholder="0"
                        />
                        <span class="h-8 px-3 py-2 bg-white text-muted-foreground border border-l-0 border-input rounded-r-md text-sm">%</span>
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
      <Button variant="outline" class="px-4 py-2 rounded-l-md rounded-r-none border-r-0" @click="addNewLine">
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