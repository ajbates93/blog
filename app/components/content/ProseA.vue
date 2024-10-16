<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="text-indigo-500 dark:text-indigo-400"
    ><slot
  /></NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
  target?: string;
}>();
</script>
