<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { ReceiptText, RefreshCw } from 'lucide-vue-next'
import { useInvoiceStore } from '~/stores/invoiceStore';

interface Props {
  page?: 'invoices' | 'creator'
}

withDefaults(defineProps<Props>(), {
  page: 'invoices'
});

const invoiceStore = useInvoiceStore();

const isMobileMenuOpen = ref(false);
const selectedCurrency = ref<"USD" | "EUR" | "MDL">('USD');
const selectedLanguage = ref<'English' | 'Russian' | 'Română'>('English');

const handleSaveInvoice = () => {
  invoiceStore.isSheetOpen = true;
};
</script>

<template>
  <!-- Invoices page header -->
  <header v-if="page === 'invoices'" class="bg-background shadow-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Invoices</h1>
          <p class="mt-1 text-sm text-gray-500">
            Manage and track all your invoices
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/invoice-creator">
            <Button variant="outline" class="!p-1 !px-2">
              <ReceiptText class="sm:size-4 size-6" />
              <span class="sm:block hidden">Invoice Creator</span>
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>

  <!-- Invoice creator page header -->
  <header v-else-if="page === 'creator'" class="bg-background py-4 shadow-2xl">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16 max-w-8xl mx-auto">
        <!-- Left section: currency, language, exchange -->
        <div class="sm:flex hidden items-center space-x-4">
          <CommonCurrencySelector v-model="selectedCurrency" />
          <CommonLanguageSelector v-model="selectedLanguage" />
          <Button @click="() => toast.info('Not implemented yet')">
            <RefreshCw class="size-4" />
            <span class="md:block hidden">Exchange</span>
          </Button>
        </div>

        <!-- Right section: attach file, save invoice -->
        <div class="sm:flex hidden items-center space-x-4">
          <CommonAttachFileButton @click="() => toast.info('Not implemented yet')" />
          <CommonSaveInvoiceButton @click="handleSaveInvoice" />
        </div>

        <!-- Mobile header -->
        <div class="sm:hidden flex justify-between w-full">
          <!-- "Settings" button -->
          <NuxtLink to="/"> 
            <Button size="lg" class="bg-black hover:bg-black/90 text-primary-foreground w-10 h-10 rounded-full">
              <svg class="w-5 h-5" viewBox="0 0 20 16" fill="none">
                <path d="M1 8H19H1Z" fill="currentColor"/>
                <path d="M8 15L1 8M1 8L8 1M1 8H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </Button>
          </NuxtLink>
          
          <div class="flex items-center space-x-4">
            <!-- "Exchange" button -->
            <Button 
              class="!p-1 !px-2" 
              @click="() => toast.info('Not implemented yet')"
              >
              <RefreshCw class="size-6" />
            </Button>

            <!-- "Settings" button -->
            <Button 
              class="sm:hidden block !p-1 !px-2 " 
              @click="isMobileMenuOpen = true"
            >
              <svg class="!w-6 !h-6" viewBox="0 0 18 18" fill="none">  
                <path d="M17 7H16.243L15.536 5.293L16.071 4.757C16.2585 4.56947 16.3638 4.31516 16.3638 4.05C16.3638 3.78484 16.2585 3.53053 16.071 3.343L14.657 1.929C14.4695 1.74153 14.2152 1.63621 13.95 1.63621C13.6848 1.63621 13.4305 1.74153 13.243 1.929L12.707 2.464L11 1.757V1C11 0.734784 10.8946 0.48043 10.7071 0.292893C10.5196 0.105357 10.2652 0 10 0H8C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V1.757L5.293 2.464L4.757 1.929C4.56947 1.74153 4.31516 1.63621 4.05 1.63621C3.78484 1.63621 3.53053 1.74153 3.343 1.929L1.929 3.343C1.74153 3.53053 1.63621 3.78484 1.63621 4.05C1.63621 4.31516 1.74153 4.56947 1.929 4.757L2.465 5.293L1.757 7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8V10C0 10.2652 0.105357 10.5196 0.292893 10.7071C0.48043 10.8946 0.734784 11 1 11H1.757C2.098 11.823 2.124 11.884 2.464 12.707L1.929 13.243C1.74153 13.4305 1.63621 13.6848 1.63621 13.95C1.63621 14.2152 1.74153 14.4695 1.929 14.657L3.343 16.071C3.53053 16.2585 3.78484 16.3638 4.05 16.3638C4.31516 16.3638 4.56947 16.2585 4.757 16.071L5.293 15.536L7 16.243V17C7 17.2652 7.10536 17.5196 7.29289 17.7071C7.48043 17.8946 7.73478 18 8 18H10C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V16.243L12.707 15.535L13.243 16.071C13.4305 16.2585 13.6848 16.3638 13.95 16.3638C14.2152 16.3638 14.4695 16.2585 14.657 16.071L16.071 14.657C16.2585 14.4695 16.3638 14.2152 16.3638 13.95C16.3638 13.6848 16.2585 13.4305 16.071 13.243L15.536 12.707L16.243 11H17C17.2652 11 17.5196 10.8946 17.7071 10.7071C17.8946 10.5196 18 10.2652 18 10V8C18 7.73478 17.8946 7.48043 17.7071 7.29289C17.5196 7.10536 17.2652 7 17 7ZM9 13C8.20887 13 7.43552 12.7654 6.77772 12.3259C6.11992 11.8864 5.60723 11.2616 5.30448 10.5307C5.00173 9.79983 4.92252 8.99556 5.07686 8.21964C5.2312 7.44371 5.61216 6.73098 6.17157 6.17157C6.73098 5.61216 7.44371 5.2312 8.21964 5.07686C8.99556 4.92252 9.79983 5.00173 10.5307 5.30448C11.2616 5.60723 11.8864 6.11992 12.3259 6.77772C12.7654 7.43552 13 8.20887 13 9C13 10.0609 12.5786 11.0783 11.8284 11.8284C11.0783 12.5786 10.0609 13 9 13Z" fill="currentColor"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Settings Menu -->
  <Sheet v-model:open="isMobileMenuOpen">
    <SheetContent side="right" class="w-[300px] sm:w-[400px]">
      <SheetHeader>
        <SheetTitle class="text-left">Settings</SheetTitle>
      </SheetHeader>
      <div class="px-4 flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <Label class="text-sm font-medium text-muted-foreground">Currency</Label>
          <CommonCurrencySelector v-model="selectedCurrency" />
        </div>
        <div class="flex flex-col gap-1">
          <Label class="text-sm font-medium text-muted-foreground">Language</Label>
          <CommonLanguageSelector v-model="selectedLanguage" />
        </div>
        <CommonAttachFileButton 
          :isMobileMenuOpen="isMobileMenuOpen" 
          @click="() => toast.info('Not implemented yet')" 
        />
      </div>
    </SheetContent>
  </Sheet>
</template>
