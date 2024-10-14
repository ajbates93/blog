<script lang="ts" setup>
const route = useRoute();

const { data: article } = await useAsyncData("article", () =>
  queryContent(`/blog/${route.params.id}`).findOne(),
);
</script>

<template>
  <div class="w-full pb-10">
    <div
      class="max-w-7xl rounded-3xl flex flex-col items-center shadow-md mx-auto p-10 gap-10"
    >
      <!-- Blog avatar,  Author and date-->
      <div class="flex flex-col justify-center items-center gap-5">
        <ULink to="/">
          <NuxtPicture
            src="~/images/About.webp"
            alt="Author"
            class="rounded-full w-20 h-20 cover"
          />
        </ULink>
        <ULink to="/" class="spacing-2 text-xl">Alex Bates</ULink>
        <p class="text-gray-700 dark:text-gray-300">
          {{ new Date(article.date).toLocaleString().split(",")[0] }}
        </p>
      </div>

      <ContentRenderer :value="article" class="prose" />
    </div>
  </div>
</template>
