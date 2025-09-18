<script setup lang="ts">
import { reactive, computed } from 'vue';
import type { InvoiceFormData } from '~/types';
import { formatNumber } from '~/lib/utils/format';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { Card, CardContent } from '~/components/ui/card';

const invoiceData = reactive<InvoiceFormData>({
  invoiceNumber: '254267225',
  issueDate: '2024-09-07',
  dueDate: '2024-09-07',
  from: 'Boris Expert',
  to: 'General Construct',
  discount: 10,
  discountPercent: 10,
  bankAccount: '41399128191019',
  notes: '',
  items: [
    {
      description: 'Services of Marketing',
      quantity: 1,
      uoM: 'none',
      pricePerUnit: 24000,
      vat: '15%',
      amount: 27000,
    },
    {
      description: 'Logo',
      quantity: 2,
      uoM: 'none',
      pricePerUnit: 24000,
      vat: '15%',
      amount: 27000,
    },
    {
      description: 'Sirius Skells',
      quantity: 15,
      uoM: 'kg',
      pricePerUnit: 24000,
      vat: '15%',
      amount: 27000,
    },
  ],
});

// Computed properties for financial calculations
const subtotal = computed((): number => {
  return invoiceData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
});

const vat = computed((): number => {
  return subtotal.value * 0.15; // 15% VAT
});

const total = computed((): number => {
  const discountAmount = subtotal.value * (invoiceData.discountPercent / 100);
  return subtotal.value + vat.value - discountAmount;
});
</script>

<template>
  <div class="space-y-6">
    <!-- Заголовок с кнопкой назад -->
    <div class="flex items-center space-x-3">
      <Button size="lg" class="bg-black hover:bg-black/80 text-primary-foreground w-10 h-10 rounded-full">
        <svg class="w-5 h-5" viewBox="0 0 20 16" fill="none">
          <path d="M1 8H19H1Z" fill="currentColor"/>
          <path d="M8 15L1 8M1 8L8 1M1 8H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </Button>
      <h1 class="text-[36px] font-bold text-foreground">New Invoice</h1>
    </div>

    <!-- Секция Invoice details -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-foreground">Invoice details</h2>
      
      <div class="flex flex-col gap-4">
        <!-- Invoice number -->
        <div>
          <Label class="block text-sm font-medium mb-1">Invoice number</Label>
          <div class="relative">
            <Input
              v-model="invoiceData.invoiceNumber"
              type="text"
              placeholder="254267225"
            />
            <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex flex-row gap-2 items-center justify-between">
          <!-- Issue date -->
          <div class="w-full">
            <Label class="block text-sm font-medium mb-1">Issue date</Label>
            <Input
            v-model="invoiceData.issueDate"
            type="date"
            />
          </div>
          
          <!-- Due date -->
          <div class="w-full">
            <Label class="block text-sm font-medium mb-1">Due date</Label>
            <Input
            v-model="invoiceData.dueDate"
            type="date"
            />
          </div>
        </div>

        <div class="flex flex-row gap-2 items-center justify-between">
          <!-- From -->
          <div class="w-full">
            <Label class="block text-sm font-medium mb-1">From</Label>
            <Input
            v-model="invoiceData.from"
            type="text"
            placeholder="Boris Expert"
            />
          </div>
          
          <!-- To -->
          <div class="w-full">
            <Label class="block text-sm font-medium mb-1">To</Label>
            <Select v-model="invoiceData.to">
              <SelectTrigger class="w-full bg-white text-black">
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Construct">General Construct</SelectItem>
                <SelectItem value="Another Company">Another Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>

    <!-- Секция Products and services -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-foreground">Products and services</h2>
      
      <!-- Таблица товаров -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 text-sm font-medium text-foreground w-8"></th>
              <th class="text-left py-2 text-sm font-medium text-foreground">Description</th>
              <th class="text-left py-2 text-sm font-medium text-foreground w-20">Quantity</th>
              <th class="text-left py-2 text-sm font-medium text-foreground w-20">UoM</th>
              <th class="text-left py-2 text-sm font-medium text-foreground w-24">Price/Unit</th>
              <th class="text-left py-2 text-sm font-medium text-foreground w-20">Vat</th>
              <th class="text-left py-2 text-sm font-medium text-foreground w-24">Amount</th>
              <th class="text-left py-2 text-sm font-medium text-foreground w-8"/>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoiceData.items" :key="index" class="border-b border-border/50">
              <td class="py-2 text-sm text-muted-foreground">{{ index + 1 }}</td>
              <td class="py-2">
                <Input
                  v-model="item.description"
                  type="text"
                  class="h-8 text-sm"
                  :placeholder="index === 0 ? 'Services of Marketing' : ''"
                />
              </td>
              <td class="py-2">
                <Input
                  v-model="item.quantity"
                  type="number"
                  class="h-8 text-sm font-raleway"
                  :placeholder="index === 0 ? '1' : ''"
                />
              </td>
              <td class="py-2">
                <Select v-model="item.uoM">
                  <SelectTrigger class="h-8 text-sm">
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
              <td class="py-2">
                <Input
                  v-model="item.pricePerUnit"
                  type="number"
                  class="h-8 text-sm"
                  :placeholder="index === 0 ? '24000' : ''"
                />
              </td>
              <td class="py-2">
                <Select v-model="item.vat">
                  <SelectTrigger class="h-8 text-sm">
                    <SelectValue placeholder="VAT" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0%">0%</SelectItem>
                    <SelectItem value="15%">15%</SelectItem>
                    <SelectItem value="20%">20%</SelectItem>
                  </SelectContent>
                </Select>
              </td>
              <td class="py-2">
                <Input
                  v-model="item.amount"
                  type="number"
                  class="h-8 text-sm"
                  :placeholder="index === 0 ? '27000' : ''"
                />
              </td>
              <td class="py-2">
                <Button variant="ghost" size="sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                  </svg>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Поле для добавления описания -->
      <div class="mt-2">
        <Input
          type="text"
          placeholder="Add description"
        />
      </div>

      <!-- Секция скидки -->
      <div class="w-fit">
        <Label class="block text-sm font-medium mb-1">Discount</Label>
        <div class="flex">
          <Input
            v-model="invoiceData.discount"
            type="number"
            class="w-20 rounded-r-none"
            placeholder="10"
          />
          <span class="px-3 py-2 bg-muted text-muted-foreground border border-l-0 border-input rounded-r-md text-sm">%</span>
        </div>
      </div>

      <!-- Кнопка добавления строки -->
      <div class="pt-2">
        <Button variant="outline" size="sm">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
          Add line
        </Button>
      </div>
    </div>

    <!-- Секция Bank details и Financial Summary -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-foreground">Bank details</h2>
      
      <!-- Bank details -->
      <div class="flex items-center space-x-3">
        <div class="flex-1">
          <Input
            v-model="invoiceData.bankAccount"
            type="text"
            placeholder="41399128191019"
          />
        </div>
        <div class="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
          <div class="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
            <span class="text-white text-xs font-bold">M</span>
          </div>
          <span class="text-green-800 font-medium text-sm">maib</span>
        </div>
      </div>

      <!-- Financial Summary -->
      <Card>
        <CardContent class="p-4 space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-muted-foreground">Subtotal</span>
            <span class="text-sm font-medium text-foreground">Mdl {{ formatNumber(subtotal) }}</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-muted-foreground">VAT</span>
            <span class="text-sm font-medium text-foreground">Mdl {{ formatNumber(vat) }}</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-muted-foreground">Discount %</span>
            <div class="flex">
              <Input
                v-model="invoiceData.discountPercent"
                type="number"
                class="w-16 h-8 text-sm rounded-r-none"
                placeholder="10"
              />
              <Button variant="ghost" size="sm" class="rounded-l-none">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </Button>
            </div>
          </div>
          
          <div class="flex justify-between items-center pt-2 border-t border-border">
            <span class="text-sm font-bold text-foreground">Total</span>
            <span class="text-sm font-bold text-foreground">Mdl {{ formatNumber(total) }}</span>
          </div>
        </CardContent>
      </Card>

      <!-- Add advanced paid link -->
      <div class="pt-2">
        <Button variant="link" size="sm">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Add advanced paid
        </Button>
      </div>

      <!-- Notes section -->
      <div class="space-y-2">
        <h3 class="text-sm font-bold text-foreground">Notes (optional)</h3>
        <Textarea
          v-model="invoiceData.notes"
          class="resize-none"
          rows="4"
          placeholder="Add Notes"
        />
        <p class="text-xs text-muted-foreground">The notes will be displayed on the invoice; you can see them on the preview on the right.</p>
      </div>
    </div>

    
  </div>
</template>
