<template>
  <div class="text-left mx-auto px-4 sm:px-10 xl:px-20 pt-5 md:pt-10 flex items-center justify-start w-full gap-5 text-sm sm:text-lg">
    <nav class="flex gap-5 text-sm sm:text-xl text-white xl:max-w-screen-xl mx-auto text-left w-full font-serif">
      <NuxtLink to="/">home</NuxtLink>
      <NuxtLink to="/#about">about</NuxtLink>
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