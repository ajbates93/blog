<script lang="ts" setup>
const route = useRoute();

const { data: blog } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('blog').path(route.path).first()
});

useHead(blog.value.head || {})
useSeoMeta(blog.value?.seo || {})
</script>

<template>
  <div class="w-full pb-10 mt-15" v-if="blog">
    <div v-if="blog.bannerImgUrl" class="relative w-full max-w-[2000px] max-h-[400px] mx-auto mb-10 md:mb-20">
      <NuxtImg
        :src="`/images/blog/${blog.bannerImgUrl}`"
        alt="Blog banner"
        class="w-full h-[400px] object-cover"
        :width="1600"
        :height="400"
        sizes="(max-width: 768px) 100vw, 1600px"
      />
      <div class="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
    </div>
    <div class="flex flex-col items-center mx-auto p-5 sm:p-10 gap-10">
      <!-- Blog avatar,  Author and date-->
      <div 
        class="flex flex-col justify-center items-center gap-5" 
        style="view-transition-name: author-section"
      >
        <ULink to="/" style="view-transition-name: none">
          <div class="align-middle w-20 h-20 rounded-full overflow-hidden">
            <picture>
              <img class="scale-125" src="/images/home-about-small.webp" alt="Author" />
            </picture>
          </div>
        </ULink>
        <ULink to="/" class="spacing-2 text-indigo-400 dark:text-indigo-500 text-xl" style="view-transition-name: none">Alex Bates</ULink>
        <p class="text-gray-700 dark:text-gray-300">
          {{ new Date(blog.date).toLocaleString().split(",")[0] }}
        </p>
      </div>

      <h1 class="text-4xl font-bold my-5 md:my-10" :style="`view-transition-name: blog-title-${blog.title.toLowerCase().replace(/ /g, '-')}`">{{ blog.title }}</h1>

      <div 
        class="blog-article max-w-prose text-gray-700 dark:text-gray-300"
        style="view-transition-name: blog-content"
      >
        <ContentRenderer v-if="blog" :value="blog" />
      </div>
    </div>
  </div>
</template>

<style>


.blog-article {
  font-weight: semibold;
  line-height: 1.75;
}

.blog-article p, .blog-article hr {
  margin-bottom: 1.25rem;
}
.blog-article hr {
  opacity: 0.2;
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

.blog-article img {
  margin: 2.5em auto;
  text-align: center;
  border-radius: 0.75em;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}
</style>
