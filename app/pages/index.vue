<template>
  <div class="h-[calc(100dvh-52px)] grid grid-cols-1">
    <div class="w-full py-10 bg-slate-100 dark:bg-slate-900 px-4 row-span-5">
      <h1 class="text-6xl font-bold text-center">Alex Bates</h1>
    </div>
    <div
      class="bg-white dark:bg-gray-600 rounded-t-3xl mx-auto p-10 grid grid-cols-3 gap-10 row-span-2"
    >
      <div class="max-w-7xl mx-auto">
        <UCard v-for="item in blog">
          <template #header>
            <h2 class="text-2xl font-bold">{{ item.title }}</h2>
          </template>
          <picture>
            <source :srcset="item.thumbnailSrc" />
            <img :src="item.thumbnailSrc" alt="blog image" class="w-full" />
          </picture>
          <p class="font-light text-gray-500 mb-2">
            {{ new Date(item.date).toLocaleString().split(",")[0] }}
          </p>
          <p class="font-medium text-gray-500">{{ item.description }}</p>
          <template #footer>
            <ULink :to="item._path" class="hover:underline hover:text-blue-500"
              >Read More</ULink
            >
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: blog } = await useAsyncData("blog", () =>
  queryContent("/blog").find(),
);
</script>
