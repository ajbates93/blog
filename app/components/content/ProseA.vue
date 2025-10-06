<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="text-[#4278ba]"
    ><slot
  /></NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
  target?: string;
}>();
</script>
