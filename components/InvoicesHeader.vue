<template>
  <div class="bg-white shadow-sm">
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
  </div>
</template>
