<template>
  <div class="p-5 sm:px-10 flex items-center justify-between gap-5 text-lg sm:mb-10 container mx-auto">
    <nav class="flex gap-2">
      <NuxtLink to="/">home</NuxtLink>
      <span>|</span>
      <NuxtLink to="/blog">blog</NuxtLink>
    </nav>
    <UIcon class="cursor-pointer" @click="toggleTheme" :name="themeIcon" />
  </div>
</template>

<script setup lang="ts">
const toggleTheme = () => {
  const html = document.querySelector("html");
  html!.classList.toggle("dark");
  themeIcon.value = html!.classList.contains("dark")
    ? "i-heroicons-sun"
    : "i-heroicons-moon";
};

const themeIcon = ref("i-heroicons-moon");
</script>
