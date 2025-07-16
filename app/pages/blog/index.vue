<template>
  <section class="container mx-auto p-5 sm:p-10 text-left mt-[68px]">
    <h1 class="text-5xl font-bold text-slate-700 dark:text-white mb-8">Blog Posts</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-3xl">
      Welcome to my blog! Here you'll find thoughts, tutorials, and insights about web development, mobile development, and the tech industry. I write about things I learn, interesting projects I work on, and share knowledge that might help other developers on their journey.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-3xl">
      Whether you're interested in Vue.js, React, Flutter, or general software development practices, I hope you'll find something useful here. Feel free to reach out if you have questions or want to discuss any of the topics I cover.
    </p>
    <Blog />
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  viewTransition: false
})
</script>

<style></style>