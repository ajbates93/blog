<template>
  <div class="text-left mx-auto py-5 md:py-10 flex items-center justify-start w-full gap-5 text-sm sm:text-lg">
    <nav class="flex gap-2 font-mono text-sm sm:text-xl">
      <NuxtLink to="/">home</NuxtLink>
      <span>|</span>
      <NuxtLink to="/blog">blog</NuxtLink>
    </nav>
    <!--<UIcon class="cursor-pointer ml-auto" @click="toggleTheme" :name="themeIcon" />-->
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