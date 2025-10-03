<template>
  <div class="text-left mx-auto py-5 md:py-10 flex items-center justify-start w-full gap-5 text-sm sm:text-lg">
    <nav class="flex gap-2 font-mono text-sm sm:text-xl">
      <NuxtLink to="/">home</NuxtLink>
      <span>|</span>
      <NuxtLink to="/blog">blog</NuxtLink>
    </nav>
    <!--<UIcon class="cursor-pointer ml-auto" @click="toggleTheme" :name="themeIcon" />-->
  </div>
  <div class="sm:hidden flex">
    
    <div>
      <p class="text-sm text-[#2b2b2b] tracking-tighter font-mono rounded-md mt-0 mb-1">
        Available for work!<br />
        <a href="mailto:hello@alexbates.dev"
          class="font-bold text-[#2b2b2b] hover:text-gray-200 transition-colors">hello@alexbates.dev</a>
      </p>
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