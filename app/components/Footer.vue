<template>
  <footer>
    <div
      class="bg-slate-300 dark:bg-slate-800 p-3 flex items-center justify-end gap-5 text-lg"
    >
      <ULink class="mr-auto" to="/">Alex Bates</ULink>
      <div>&copy; Copyright {{ year }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = ref(new Date().getFullYear());
</script>
