<template>
  <div class="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 z-10">
    <div class="container mx-auto p-5 sm:px-10 flex items-center justify-between gap-5 text-lg">
      <nav class="flex gap-2 font-serif text-xl">
        <NuxtLink to="/">home</NuxtLink>
        <span>|</span>
        <NuxtLink to="/blog">blog</NuxtLink>
      </nav>
      <UIcon class="cursor-pointer" @click="toggleTheme" :name="themeIcon" />
    </div>
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
