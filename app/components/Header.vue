<template>
  <div
    class="bg-slate-300 dark:bg-slate-800 px-5 py-3 flex items-center justify-end gap-5 text-lg"
  >
    <ULink class="mr-auto" to="/">Alex Bates</ULink>
    <ULink class="" to="/">Blogs</ULink>
    <ULink class="" to="/about">About</ULink>
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
