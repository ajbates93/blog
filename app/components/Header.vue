<template>
  <div class="p-5 flex items-center justify-end gap-5 text-lg mb-10">
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
