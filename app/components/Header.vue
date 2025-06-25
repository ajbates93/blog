<template>
  <div
    class="p-5 sm:px-10 flex items-center justify-between gap-5 text-lg sm:mb-10 container mx-auto fixed top-8 left-1/2 translate-[-50%] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-lg">
    <nav class="flex gap-2">
      <NuxtLink class="text-white" active-class="text-white" to="/">home</NuxtLink>
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
