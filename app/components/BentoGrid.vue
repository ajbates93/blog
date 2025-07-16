<template>
  <div
    :class="
      cn(
        'grid auto-rows-[12rem] md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 w-full',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

interface Props {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<style scoped>
.bento-grid {
  /* Custom styles for the bento grid layout */
}

/* Ensure cards have consistent height */
.bento-grid :deep(.group\/card) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bento-grid :deep(.group\/card > div:last-child) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.bento-grid :deep(.group\/card p:last-of-type) {
  margin-top: auto;
}
</style> 