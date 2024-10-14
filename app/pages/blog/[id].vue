<script lang="ts" setup>
const route = useRoute();

const { data: article } = await useAsyncData("article", () =>
  queryContent(`/blog/${route.params.id}`).findOne(),
);
</script>

<template>
  <div class="w-full pb-10">
    <div class="flex flex-col items-center mx-auto p-10 gap-10">
      <!-- Blog avatar,  Author and date-->
      <div class="flex flex-col justify-center items-center gap-5">
        <ULink to="/">
          <div class="align-middle w-20 h-20 rounded-full overflow-hidden">
            <picture>
              <img class="scale-125" src="/images/About.webp" alt="Author" />
            </picture>
          </div>
        </ULink>
        <ULink to="/" class="spacing-2 text-xl">Alex Bates</ULink>
        <p class="text-gray-700 dark:text-gray-300">
          {{ new Date(article.date).toLocaleString().split(",")[0] }}
        </p>
      </div>

      <ContentRenderer v-if="article" :value="article">
        <h1>{{ article.title }}</h1>
        <ContentRendererMarkdown
          :value="article"
          class="prose text-gray-700 dark:text-white"
        />
      </ContentRenderer>
    </div>
  </div>
</template>
