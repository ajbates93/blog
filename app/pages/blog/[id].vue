<script lang="ts" setup>
const route = useRoute();
const { data: blog } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
});
</script>

<template>
  <div class="w-full pb-10" v-if="blog">
    <div class="flex flex-col items-center mx-auto p-10 gap-10">
      <!-- Blog avatar,  Author and date-->
      <div class="flex flex-col justify-center items-center gap-5">
        <ULink to="/">
          <div class="align-middle w-20 h-20 rounded-full overflow-hidden">
            <picture>
              <img class="scale-125" src="/images/home-about-small.webp" alt="Author" />
            </picture>
          </div>
        </ULink>
        <ULink to="/" class="spacing-2 text-indigo-400 dark:text-indigo-500 text-xl">Alex Bates</ULink>
        <p class="text-gray-700 dark:text-gray-300">
          {{ new Date(blog.date).toLocaleString().split(",")[0] }}
        </p>
      </div>

      <h1>{{ blog.title }}</h1>

      <div class="blog-article max-w-prose text-gray-700 dark:text-white">
        <ContentRenderer v-if="blog" :value="blog" />
      </div>


    </div>
  </div>
</template>

<style>
a {
  color: #3182ce;
}
.blog-article {
  font-weight: semibold;
  line-height: 1.75;
}

.blog-article p {
  margin-bottom: 1.25rem;
}

.blog-article ul, .blog-article ol {
  list-style-type: disc;
  margin-bottom: 1.25em;
  margin-top: 1.25em;
  padding-inline-start: 1.625em;
}

.blog-article li {
  margin: 8px 0;
  padding-inline-start: .375em;
}

.blog-article a {
  font-weight: bold;
  text-decoration: underline;
}
</style>
