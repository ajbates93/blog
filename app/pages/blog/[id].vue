<script lang="ts" setup>
const route = useRoute();

const { data: article } = await useAsyncData("article", () =>
  queryContent(`/blog/${route.params.id}`).findOne(),
);
</script>

<template>
  <div class="w-full pb-10">
    <div class="w-full py-40 bg-gray-100 px-4">
      <h1 class="text-6xl font-bold text-center">{{ article.title }}</h1>
    </div>
    <div
      class="max-w-7xl bg-white rounded-3xl flex flex-col items-center shadow-md -mt-20 mx-auto p-10 gap-10"
    >
      <ContentRenderer :value="article" class="prose" />
    </div>
  </div>
</template>
