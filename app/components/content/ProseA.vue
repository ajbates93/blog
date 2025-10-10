<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="text-[#eeeeee]"
    ><slot
  /></NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
  target?: string;
}>();
</script>
