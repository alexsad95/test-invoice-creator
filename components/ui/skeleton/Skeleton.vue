<template>
  <div :class="cn('animate-pulse rounded-md bg-muted', className)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '~/utils/helpers'

interface SkeletonProps {
  className?: string
}

defineProps<SkeletonProps>()
</script>