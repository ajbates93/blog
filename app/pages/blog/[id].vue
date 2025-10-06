<script lang="ts" setup>
const route = useRoute();

const { data: blog } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('blog').path(route.path).first()
});

useHead(blog.value?.head || {})
useSeoMeta(blog.value?.seo || {})

const calculateReadingTime = (body: any) => {
  if (!body) return 3;

  // Extract text content from the body
  let text = '';

  // If body has a _value property (Nuxt Content structure), use that
  if (body._value) {
    text = body._value;
  } else if (typeof body === 'string') {
    text = body;
  } else {
    // Fallback: try to extract text from the body object
    text = JSON.stringify(body);
  }

  // Remove markdown syntax and count words
  const cleanText = text
    .replace(/[#*`\[\]()]/g, '') // Remove markdown syntax
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  const wordCount = cleanText.split(' ').filter(word => word.length > 0).length;

  // Average reading speed is about 200-250 words per minute
  // Using 225 as a middle ground
  const readingTime = Math.ceil(wordCount / 225);

  // Ensure minimum reading time of 1 minute
  return Math.max(1, readingTime);
}; 
</script>

<template>
  <div class="w-full pb-10 bg-[#5385c2] py-5 sm:py-10" v-if="blog">
    <div v-if="blog.bannerImgUrl" class="relative w-full max-w-[2000px] max-h-[400px] mx-auto mb-10 md:mb-20">
      <NuxtImg :src="`/images/blog/${blog.bannerImgUrl}`" alt="Blog banner" class="w-full h-[400px] object-cover"
        :width="1600" :height="400" sizes="(max-width: 768px) 100vw, 1600px" />
      <div class="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
    </div>
    <div class="flex flex-col items-center mx-auto gap-10">
      <!-- Blog avatar,  Author and date-->
      <div class="flex flex-col justify-center w-full items-center gap-5" style="view-transition-name: author-section">
        <ULink to="/" style="view-transition-name: none">
          <div class="align-middle w-20 h-20 rounded-full overflow-hidden">
            <picture>
              <img class="scale-125" src="/images/home-about-small.webp" alt="Author" />
            </picture>
          </div>
        </ULink>
        <ULink to="/" class="spacing-2 text-white hover:text-gray-200 transition-colors text-2xl font-serif font-bold"
          style="view-transition-name: none">Alex Bates</ULink>


      </div>
      <!-- Navigation bar -->
      <div class="w-full sticky top-0 rounded-lg z-300">
        <div class="absolute w-full h-full z-100 backdrop-blur bg-white/05"></div>
        <div class="relative z-200 bg-transparent font-mono md:max-w-screen-md mx-auto flex items-center justify-between text-white text-sm px-4 py-4">
          <ULink to="/blog"
            class="bg-white bg-opacity-20 hover:underline px-3 py-2 rounded-md text-white hover:text-white">
            ← Back to blog
          </ULink>
          <div class="flex items-center gap-4">
            <p>{{ new Date(blog.date).toLocaleString().split(",")[0] }}</p>
            <span class="w-1 h-1 bg-white rounded-full"></span>
            <p>{{ calculateReadingTime(blog.body) }} min read</p>
          </div>
        </div>
      </div>
      <h1 class="text-4xl sm:text-5xl font-bold text-[#2b2b2b] px-5 sm:px-10"
        :style="`view-transition-name: blog-title-${blog.title.toLowerCase().replace(/ /g, '-')}`">{{ blog.title }}</h1>

      <!-- Description -->
      <TextWrapper v-if="blog.description" class="text-center max-w-2xl mx-auto px-5 sm:px-10"
        style="view-transition-name: blog-description">
        {{ blog.description }}
      </TextWrapper>

      <!-- Tags -->
      <div v-if="blog.tags && blog.tags.length > 0" class="flex flex-wrap gap-2 justify-center px-5 sm:px-10"
        style="view-transition-name: blog-tags">
        <span v-for="tag in blog.tags" :key="tag" class="px-3 py-1 bg-[#4278ba] text-white text-sm rounded-full">
          {{ tag }}
        </span>
      </div>

      <div class="blog-article max-w-prose text-[#2b2b2b] px-5 sm:px-10" style="view-transition-name: blog-content">
        <ContentRenderer v-if="blog" :value="blog" />
      </div>

      <!-- Social Sharing -->
      <SocialShare :title="blog.title" :description="blog.description" class="px-5 sm:px-10"
        :url="`https://www.alexbates.dev${route.path}`" />
    </div>
  </div>
</template>

<style>
.blog-article {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-weight: 400;
  line-height: 1.75;
  font-size: 1.125rem;
  /* text-lg */
}

@media (min-width: 768px) {
  .blog-article {
    font-size: 1.25rem;
    /* text-xl */
  }
}

.blog-article p,
.blog-article hr {
  margin-bottom: 1.25rem;
}

.blog-article hr {
  opacity: 0.2;
}

.blog-article ul,
.blog-article ol {
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
  color: #4278ba;
}

.blog-article a:hover {
  color: #2b2b2b;
  transition: color 0.2s ease;
}

.blog-article img {
  margin: 2.5em auto;
  text-align: center;
  border-radius: 0.75em;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}

.font-serif {
  font-family: 'Lora', serif;
}
</style>
