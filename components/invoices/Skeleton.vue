<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
      <h3 class="text-lg leading-6 font-medium text-gray-900">All Invoices</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Complete list of all your invoices
      </p>
    </div>

    <div class="divide-y divide-gray-200">
      <div v-for="i in 1" :key="i" class="px-4 py-4 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex">
            <div class="flex-shrink-0">
              <Skeleton class="h-10 w-10 rounded-full" />
            </div>
            <div class="ml-4 space-y-2">
              <div class="flex items-center space-x-2">
                <Skeleton class="h-5 w-24" />
                <Skeleton class="h-5 w-16 rounded-full" />
              </div>
              <Skeleton class="h-4 w-48" />
              <div class="space-y-1">
                <Skeleton class="h-4 w-32" />
                <Skeleton class="h-4 w-28" />
                <Skeleton class="h-4 w-24" />
              </div>
            </div>
          </div>
          <div class="text-right space-y-2">
            <Skeleton class="h-5 w-20" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>