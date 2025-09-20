<template>
  <div class="flex-[50%] py-4 pl-4 space-y-6">
    <!-- Title with the button backward -->
    <div class="flex items-center space-x-3">
      <Button size="lg" class="bg-black hover:bg-black/90 text-primary-foreground w-10 h-10 rounded-full">
        <svg class="w-5 h-5" viewBox="0 0 20 16" fill="none">
          <path d="M1 8H19H1Z" fill="currentColor"/>
          <path d="M8 15L1 8M1 8L8 1M1 8H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </Button>
      <h1 class="text-[36px] font-bold text-foreground">New Invoice</h1>
    </div>

    <InvoiceDetails />
    <ProductsAndServices />
    <BankDetails />
    <Notes />
  </div>
</template>