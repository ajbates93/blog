<template>
  <p class="text-lg md:text-xl tracking-tight mt-5 font-mono text-[#eeeeee]" :class="props.class">
    <slot />
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  class?: string;
}>();
</script>