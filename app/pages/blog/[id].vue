<script lang="ts" setup>
import { motion } from 'motion-v'
import { marked } from 'marked'
import type { StoryblokStory, BlogPostContent } from '~/types/storyblok'

const route = useRoute();

const { data: blog } = await useAsyncData(`page-${route.path}`, async () => {
  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/posts/${route.params.id}`, {
    version: 'published'
  });
  return data.story as StoryblokStory;
});


// useHead(blog.value?.head || {})
// useSeoMeta(blog.value?.seo || {})

// Loading state - show spinner until page is ready
const pending = ref(true)

// Hide loading spinner when page is fully loaded
onMounted(() => {
  // Wait for next tick to ensure all content is rendered
  nextTick(() => {
    // Small delay to ensure smooth transition
    setTimeout(() => {
      pending.value = false
    }, 100)
  })
})

const calculateReadingTime = (content: string) => {
  if (!content) return 3;

  // Remove markdown syntax and count words
  const cleanText = content
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

// Render markdown content to HTML
const renderMarkdown = (markdown: string) => {
  if (!markdown) return '';
  
  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
  
  return marked(markdown);
}; 
</script>

<template>
  <!-- Loading Spinner -->
  <div v-if="pending" class="fixed inset-0 bg-[#1e1d2c] flex items-center justify-center z-50">
    <div class="text-center">
      <UIcon name="i-mingcute:loading-3-fill" class="w-16 h-16 mx-auto text-[#eeeeee] animate-spin" />
    </div>
  </div>

  <div v-else class="w-full pb-10 bg-[#1e1d2c] py-5 sm:py-10" v-if="blog">
    <div v-if="blog.content.banner_image?.filename" class="relative w-full max-w-[2000px] max-h-[400px] mx-auto mb-10 md:mb-20">
      <img :src="blog.content.banner_image.filename" :alt="blog.content.banner_image.alt || 'Blog banner'" class="w-full h-[400px] object-cover"
        width="1600" height="400" />
      <div class="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
    </div>
    <div class="flex flex-col items-center mx-auto gap-10">
      <!-- Blog avatar,  Author and date-->
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
        class="flex flex-col justify-center w-full items-center gap-5"
        style="view-transition-name: author-section"
      >
        <ULink to="/" style="view-transition-name: none">
          <div class="align-middle w-20 h-20 rounded-full overflow-hidden">
            <picture>
              <img class="scale-125" src="/images/home-about-small.webp" alt="Author" />
            </picture>
          </div>
        </ULink>
        <ULink to="/" class="spacing-2 text-white hover:text-gray-200 transition-colors text-2xl font-serif font-bold"
          style="view-transition-name: none">Alex Bates</ULink>
      </motion.div>
      <!-- Navigation bar -->
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.2 }"
        class="w-full sticky top-0 rounded-lg z-300"
      >
        <div class="absolute w-full h-full z-100 backdrop-blur bg-white/05"></div>
        <div class="relative z-200 bg-transparent md:max-w-screen-md mx-auto flex items-center justify-between text-white text-sm px-4 py-4">
          <ULink to="/blog"
            class="bg-white bg-opacity-20 hover:underline px-3 py-2 rounded-md text-white hover:text-white">
            ← Back to blog
          </ULink>
          <div class="flex items-center gap-4">
            <p>{{ new Date(blog.first_published_at).toLocaleString().split(",")[0] }}</p>
            <span class="w-1 h-1 bg-white rounded-full"></span>
            <p>{{ calculateReadingTime(blog.content.content) }} min read</p>
          </div>
        </div>
      </motion.div>

      <!-- Blog Title -->
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.4 }"
        class="text-4xl sm:text-5xl font-bold text-[#eeeeee] px-5 sm:px-10"
        :style="{ 'view-transition-name': `blog-title-${blog.content.title.toLowerCase().replace(/ /g, '-')}` }"
      >
        <h1>{{ blog.content.title }}</h1>
      </motion.div>

      <!-- Description -->
      <motion.div
        v-if="blog.content.description"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.6 }"
        class="text-center max-w-2xl mx-auto px-5 sm:px-10"
        style="view-transition-name: blog-description"
      >
        <TextWrapper>{{ blog.content.description }}</TextWrapper>
      </motion.div>

      <!-- Tags -->
      <motion.div
        v-if="blog.tag_list && blog.tag_list.length > 0"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.8 }"
        class="flex flex-wrap gap-2 justify-center px-5 sm:px-10"
        style="view-transition-name: blog-tags"
      >
        <span v-for="tag in blog.tag_list" :key="tag" class="px-3 py-1 bg-[#4278ba] text-white text-sm rounded-full">
          {{ tag }}
        </span>
      </motion.div>

      <!-- Blog Content -->
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 1.0 }"
        class="blog-article max-w-prose text-[#eeeeee] px-5 sm:px-10"
        style="view-transition-name: blog-content"
      >
        <div class="prose prose-invert max-w-none" v-html="renderMarkdown(blog.content.content)"></div>
      </motion.div>

      <!-- Social Sharing -->
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 1.2 }"
        class="px-5 sm:px-10"
      >
        <SocialShare :title="blog.content.title" :description="blog.content.description"
          :url="`https://www.alexbates.dev${route.path}`" />
      </motion.div>
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
  color: #eeeeee;
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
