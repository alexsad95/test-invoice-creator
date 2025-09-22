<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { useInvoiceStore } from '~/stores/invoiceStore';

interface Props {
  page?: 'invoices' | 'creator'
}

const props = withDefaults(defineProps<Props>(), {
  page: 'invoices'
});

const invoiceStore = useInvoiceStore();

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
            <Button variant="outline">
              <span>Invoice Creator</span>
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
        <div class="flex items-center space-x-4">
          <!-- Currency selector -->
          <Select v-model="selectedCurrency">
            <SelectTrigger class="w-auto border-1 border-gray-300 bg-transparent shadow-none hover:bg-gray-50">
              <div class="flex items-center space-x-2">
                <svg v-if="selectedCurrency === 'USD'" viewBox="0 0 640 480">
                  <g fill-rule="evenodd">
                    <g stroke-width="1pt">
                      <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8V197H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V512H0z" transform="scale(.9375)"/>
                      <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)"/>
                    </g>
                    <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)"/>
                    <path fill="#fff" d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5z" transform="scale(.9375)"/>
                  </g>
                </svg>

                <svg v-else-if="selectedCurrency === 'EUR'" viewBox="0 0 640 480">
                  <defs>
                    <g id="d">
                      <g id="b">
                        <path id="a" d="M0-1l-.3 1 .5.1z"/>
                        <use transform="scale(-1 1)" xlink:href="#a"/>
                      </g>
                      <g id="c">
                        <use transform="rotate(72)" xlink:href="#b"/>
                        <use transform="rotate(144)" xlink:href="#b"/>
                      </g>
                      <use transform="scale(-1 1)" xlink:href="#c"/>
                    </g>
                  </defs>
                  <path fill="#039" d="M0 0h640v480H0z"/>
                  <g fill="#fc0" transform="translate(320 242.3) scale(23.7037)">
                    <use width="100%" height="100%" y="-6" xlink:href="#d"/>
                    <use width="100%" height="100%" y="6" xlink:href="#d"/>
                    <g id="e">
                      <use width="100%" height="100%" x="-6" xlink:href="#d"/>
                      <use width="100%" height="100%" transform="rotate(-144 -2.3 -2.1)" xlink:href="#d"/>
                      <use width="100%" height="100%" transform="rotate(144 -2.1 -2.3)" xlink:href="#d"/>
                      <use width="100%" height="100%" transform="rotate(72 -4.7 -2)" xlink:href="#d"/>
                      <use width="100%" height="100%" transform="rotate(72 -5 .5)" xlink:href="#d"/>
                    </g>
                    <use width="100%" height="100%" transform="scale(-1 1)" xlink:href="#e"/>
                  </g>
                </svg>

                <svg v-else-if="selectedCurrency === 'MDL'" viewBox="0 0 640 480">
                  <g fill-rule="evenodd" stroke-width="1pt">
                    <path fill="#00319c" d="M0 0h213.3v480H0z"/>
                    <path fill="#ffde00" d="M213.3 0h213.4v480H213.3z"/>
                    <path fill="#de2110" d="M426.7 0H640v480H426.7z"/>
                  </g>
                </svg>

                <span class="font-medium">{{ selectedCurrency }}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD - US Dollar</SelectItem>
              <SelectItem value="EUR">EUR - Euro</SelectItem>
              <SelectItem value="MDL">MDL - Moldovan Leu</SelectItem>
            </SelectContent>
          </Select>

          <!-- Language selector -->
          <Select v-model="selectedLanguage">
            <SelectTrigger class="w-auto border-1 border-gray-300 bg-transparent shadow-none hover:bg-gray-50">
              <span class="font-medium">{{ selectedLanguage }}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Russian">Русский</SelectItem>
              <SelectItem value="Română">Română</SelectItem>
            </SelectContent>
          </Select>

          <!-- Exchange button -->
          <Button @click="() => toast.info('Not implemented yet')">
            <svg class="w-4 h-4" viewBox="0 0 16 17" fill="none" >
              <path d="M14.6667 7.66667C14.2058 7.66667 13.8333 8.04 13.8333 8.5C13.8333 11.7167 11.2158 14.3333 8 14.3333C6.46 14.3333 5.0025 13.7167 3.92583 12.6667H6.33333C6.79417 12.6667 7.16667 12.2933 7.16667 11.8333C7.16667 11.3733 6.79417 11 6.33333 11H2.3775C2.2125 10.9658 2.04 10.9858 1.87583 11.0583C1.86083 11.0642 1.845 11.0667 1.83 11.0733C1.81917 11.0792 1.8075 11.0783 1.79667 11.0842C1.77417 11.0975 1.76167 11.1192 1.74 11.1333C1.50083 11.2808 1.33333 11.5325 1.33333 11.8333V16C1.33333 16.46 1.70583 16.8333 2.16667 16.8333C2.6275 16.8333 3 16.46 3 16V14.0667C4.35833 15.2842 6.12917 16 8 16C12.1358 16 15.5 12.635 15.5 8.5C15.5 8.04 15.1275 7.66667 14.6667 7.66667Z" fill="currentColor"/>
              <path d="M2.16667 8.5C2.16667 5.28333 4.78417 2.66667 8 2.66667C9.54 2.66667 10.9975 3.28333 12.0742 4.33333H9.66667C9.20583 4.33333 8.83333 4.70667 8.83333 5.16667C8.83333 5.62667 9.20583 6 9.66667 6H13.6208C13.7867 6.035 13.9608 6.01417 14.125 5.94083C14.14 5.935 14.1558 5.9325 14.1708 5.92584C14.1817 5.92 14.1933 5.92083 14.2042 5.915C14.2267 5.90167 14.2392 5.88 14.2608 5.86583C14.4992 5.71917 14.6667 5.4675 14.6667 5.16667V1C14.6667 0.540001 14.2942 0.166668 13.8333 0.166668C13.3725 0.166668 13 0.540001 13 1V2.93333C11.6417 1.71583 9.87083 1 8 1C3.86417 1 0.5 4.365 0.5 8.5C0.5 8.96 0.8725 9.33333 1.33333 9.33333C1.79417 9.33333 2.16667 8.96 2.16667 8.5Z" fill="currentColor"/>
            </svg>
            Exchange
          </Button>
        </div>

        <!-- Right section: attach file, save invoice -->
        <div class="flex items-center space-x-4">
          <!-- Attach file button -->
          <Button variant="outline" @click="() => toast.info('Not implemented yet')">
            <svg class="w-4 h-4" viewBox="0 0 16 15" fill="none">
              <path d="M14.75 3H14C13.8011 3 13.6103 3.07902 13.4697 3.21967C13.329 3.36032 13.25 3.55109 13.25 3.75C13.25 3.94891 13.329 4.13968 13.4697 4.28033C13.6103 4.42098 13.8011 4.5 14 4.5V12.75C14 12.9489 13.921 13.1397 13.7803 13.2803C13.6397 13.421 13.4489 13.5 13.25 13.5C13.0511 13.5 12.8603 13.421 12.7197 13.2803C12.579 13.1397 12.5 12.9489 12.5 12.75V1.5C12.5 1.10218 12.342 0.720644 12.0607 0.43934C11.7794 0.158035 11.3978 0 11 0H2C1.60218 0 1.22064 0.158035 0.93934 0.43934C0.658035 0.720644 0.5 1.10218 0.5 1.5V12.75C0.5 13.3467 0.737053 13.919 1.15901 14.341C1.58097 14.7629 2.15326 15 2.75 15H13.25C13.8467 15 14.419 14.7629 14.841 14.341C15.2629 13.919 15.5 13.3467 15.5 12.75V3.75C15.5 3.55109 15.421 3.36032 15.2803 3.21967C15.1397 3.07902 14.9489 3 14.75 3ZM2.75 3C2.75 2.80109 2.82902 2.61032 2.96967 2.46967C3.11032 2.32902 3.30109 2.25 3.5 2.25H5.75C5.94891 2.25 6.13968 2.32902 6.28033 2.46967C6.42098 2.61032 6.5 2.80109 6.5 3V5.25C6.5 5.44891 6.42098 5.63968 6.28033 5.78033C6.13968 5.92098 5.94891 6 5.75 6H3.5C3.30109 6 3.11032 5.92098 2.96967 5.78033C2.82902 5.63968 2.75 5.44891 2.75 5.25V3ZM9.5 12.75H3.5C3.30109 12.75 3.11032 12.671 2.96967 12.5303C2.82902 12.3897 2.75 12.1989 2.75 12C2.75 11.8011 2.82902 11.6103 2.96967 11.4697C3.11032 11.329 3.30109 11.25 3.5 11.25H9.5C9.69891 11.25 9.88968 11.329 10.0303 11.4697C10.171 11.6103 10.25 11.8011 10.25 12C10.25 12.1989 10.171 12.3897 10.0303 12.5303C9.88968 12.671 9.69891 12.75 9.5 12.75ZM9.5 10.5H3.5C3.30109 10.5 3.11032 10.421 2.96967 10.2803C2.82902 10.1397 2.75 9.94891 2.75 9.75C2.75 9.55109 2.82902 9.36032 2.96967 9.21967C3.11032 9.07902 3.30109 9 3.5 9H9.5C9.69891 9 9.88968 9.07902 10.0303 9.21967C10.171 9.36032 10.25 9.55109 10.25 9.75C10.25 9.94891 10.171 10.1397 10.0303 10.2803C9.88968 10.421 9.69891 10.5 9.5 10.5ZM9.5 8.25H3.5C3.30109 8.25 3.11032 8.17098 2.96967 8.03033C2.82902 7.88968 2.75 7.69891 2.75 7.5C2.75 7.30109 2.82902 7.11032 2.96967 6.96967C3.11032 6.82902 3.30109 6.75 3.5 6.75H9.5C9.69891 6.75 9.88968 6.82902 10.0303 6.96967C10.171 7.11032 10.25 7.30109 10.25 7.5C10.25 7.69891 10.171 7.88968 10.0303 8.03033C9.88968 8.17098 9.69891 8.25 9.5 8.25ZM9.5 6H8C7.80109 6 7.61032 5.92098 7.46967 5.78033C7.32902 5.63968 7.25 5.44891 7.25 5.25C7.25 5.05109 7.32902 4.86032 7.46967 4.71967C7.61032 4.57902 7.80109 4.5 8 4.5H9.5C9.69891 4.5 9.88968 4.57902 10.0303 4.71967C10.171 4.86032 10.25 5.05109 10.25 5.25C10.25 5.44891 10.171 5.63968 10.0303 5.78033C9.88968 5.92098 9.69891 6 9.5 6ZM9.5 3.75H8C7.80109 3.75 7.61032 3.67098 7.46967 3.53033C7.32902 3.38968 7.25 3.19891 7.25 3C7.25 2.80109 7.32902 2.61032 7.46967 2.46967C7.61032 2.32902 7.80109 2.25 8 2.25H9.5C9.69891 2.25 9.88968 2.32902 10.0303 2.46967C10.171 2.61032 10.25 2.80109 10.25 3C10.25 3.19891 10.171 3.38968 10.0303 3.53033C9.88968 3.67098 9.69891 3.75 9.5 3.75Z" fill="currentColor"/>
              <path d="M5 3.75H4.25V4.5H5V3.75Z" fill="currentColor"/>
            </svg>
            Attach file
          </Button>

          <!-- Save invoice button -->
          <Button @click="handleSaveInvoice">
            Save invoice
            <svg class="w-4 h-4" viewBox="0 0 16 13" fill="none">
              <path d="M15.4184 6.94511C15.4996 6.73242 15.5208 6.49838 15.4794 6.27259C15.438 6.04681 15.3359 5.83943 15.1859 5.67669L10.8999 1.02193C10.8011 0.910784 10.6829 0.822132 10.5521 0.761144C10.4214 0.700156 10.2808 0.668055 10.1385 0.666712C9.99627 0.665369 9.85517 0.694812 9.72349 0.753324C9.59181 0.811835 9.47217 0.898243 9.37157 1.0075C9.27096 1.11677 9.1914 1.2467 9.13752 1.38971C9.08365 1.53272 9.05654 1.68596 9.05777 1.84047C9.05901 1.99498 9.08857 2.14768 9.14472 2.28966C9.20088 2.43163 9.28251 2.56004 9.38485 2.66739L11.8429 5.33689H1.5715C1.28732 5.33689 1.01478 5.4595 0.813834 5.67773C0.61289 5.89596 0.5 6.19195 0.5 6.50058C0.5 6.80921 0.61289 7.1052 0.813834 7.32344C1.01478 7.54167 1.28732 7.66427 1.5715 7.66427H11.8429L9.38592 10.3326C9.28358 10.44 9.20195 10.5684 9.14579 10.7103C9.08964 10.8523 9.06008 11.005 9.05884 11.1595C9.05761 11.314 9.08472 11.4673 9.13859 11.6103C9.19247 11.7533 9.27203 11.8832 9.37264 11.9925C9.47324 12.1018 9.59288 12.1882 9.72456 12.2467C9.85624 12.3052 9.99734 12.3346 10.1396 12.3333C10.2819 12.3319 10.4225 12.2998 10.5532 12.2389C10.6839 12.1779 10.8022 12.0892 10.901 11.9781L15.187 7.32331C15.2863 7.21497 15.3649 7.08646 15.4184 6.94511Z" fill="currentColor"/>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
