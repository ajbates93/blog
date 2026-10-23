<script lang="ts" setup>
import { motion } from 'motion-v'
import { marked } from 'marked'
import type { StoryblokStory, BlogPostContent } from '~/types/storyblok'

const route = useRoute();

const { data: blog } = await useAsyncData(`post-${route.params.id}`, async () => {
  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/posts/${route.params.id}`, {
    version: 'published'
  });
  return data.story as StoryblokStory;
});

if (!blog.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true });
}

// Per-post meta so link previews (Slack, LinkedIn, etc.) show the post, not the homepage
const postUrl = `https://alexbates.dev/blog/${route.params.id}`;
const bannerUrl = blog.value.content.banner_image?.filename;
// Storyblok image service crops to the standard 1200x630 social card size
const ogImage = bannerUrl
  ? `${bannerUrl}/m/1200x630/smart`
  : 'https://alexbates.dev/images/home-about-small.webp';
const postTitle = blog.value.content.title || blog.value.name;
const postDescription = blog.value.content.description;

useSeoMeta({
  title: postTitle,
  description: postDescription,
  ogType: 'article',
  ogTitle: postTitle,
  ogDescription: postDescription,
  ogUrl: postUrl,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: blog.value.content.banner_image?.alt || postTitle,
  twitterCard: 'summary_large_image',
  twitterTitle: postTitle,
  twitterDescription: postDescription,
  twitterImage: ogImage,
  articlePublishedTime: blog.value.first_published_at,
  articleModifiedTime: blog.value.published_at,
});

// Hero and title morph in from the blog card; skip their entrance so the morph lands on visible elements
const from = useTransitionFrom()
const { enter, enterFrom, fadeUp } = useEntrance()
const morphsFromCard = computed(() => from.value === '/blog')
const slug = route.params.id as string

// Older / newer posts for the "Keep reading" links (post bodies excluded to keep the payload small)
const { data: allPosts } = await useAsyncData('post-list-summary', async () => {
  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get('cdn/stories', {
    version: 'published',
    starts_with: 'posts/',
    sort_by: 'first_published_at:desc',
    excluding_fields: 'content',
    per_page: 100,
  });
  return (data.stories as StoryblokStory[]).map((story) => ({
    slug: story.slug,
    title: story.content.title || story.name,
    description: story.content.description,
  }));
});

const neighbours = computed(() => {
  const posts = allPosts.value ?? [];
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { newer: undefined, older: undefined };
  return { newer: posts[index - 1], older: posts[index + 1] };
});

const publishedDate = computed(() =>
  new Date(blog.value!.first_published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
);

// Copy link (canonical URL, without any query string)
const linkCopied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;
const copyPostLink = async () => {
  try {
    await navigator.clipboard.writeText(postUrl);
    linkCopied.value = true;
    clearTimeout(copiedTimer);
    copiedTimer = setTimeout(() => (linkCopied.value = false), 2000);
  } catch {
    // Clipboard blocked (e.g. insecure context): fall back to the native prompt
    window.prompt('Copy this link:', postUrl);
  }
};

// Sticky bar state: border once stuck, and how far through the article we are
const barRef = ref<{ $el: HTMLElement } | null>(null);
const articleRef = ref<HTMLElement | null>(null);
const barStuck = ref(false);
const readProgress = ref(0);
let frame = 0;

const updateBar = () => {
  frame = 0;
  const bar = barRef.value?.$el;
  const article = articleRef.value;
  if (!bar || !article) return;
  const barRect = bar.getBoundingClientRect();
  barStuck.value = barRect.top <= 0;
  // 0 when the article's top reaches the bar, 1 when its bottom reaches the bottom of the screen
  const rect = article.getBoundingClientRect();
  const distance = rect.height - (window.innerHeight - barRect.height);
  const travelled = barRect.height - rect.top;
  readProgress.value = distance > 0 ? Math.min(1, Math.max(0, travelled / distance)) : 1;
};

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(updateBar);
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateBar();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onScroll);
  cancelAnimationFrame(frame);
  clearTimeout(copiedTimer);
});

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
  <div class="w-full pb-10 bg-[#1e1d2c] py-5 sm:py-10" v-if="blog">
    <!-- Hero: full-width strip on mobile; contained, rounded 2:1 image on wider screens
         so it isn't cropped to a thin letterbox -->
    <div v-if="blog.content.banner_image?.filename"
      class="relative w-full h-[400px] md:h-auto md:aspect-[2/1] md:max-w-5xl md:px-10 mx-auto mb-10 md:mb-16">
      <div class="relative w-full h-full overflow-hidden md:rounded-2xl md:shadow-2xl"
        :style="{ viewTransitionName: `post-image-${slug}`, viewTransitionClass: 'post-image' }">
        <img :src="blog.content.banner_image.filename" :alt="blog.content.banner_image.alt || 'Blog banner'"
          class="w-full h-full object-cover" width="2000" height="1000" fetchpriority="high" />
        <div class="absolute inset-0 bg-black/30 pointer-events-none"></div>
      </div>
    </div>
    <div class="flex flex-col items-center mx-auto gap-10">
      <!-- Blog avatar,  Author and date-->
      <motion.div
        :initial="enterFrom('y', 30)"
        :animate="{ opacity: 1, y: 0 }"
        :transition="enter(0, 0.6)"
        class="flex flex-col justify-center w-full items-center gap-5"
      >
        <ULink to="/">
          <div class="align-middle w-20 h-20 rounded-full overflow-hidden">
            <picture>
              <img class="scale-125" src="/images/home-about-small.webp" alt="Author" />
            </picture>
          </div>
        </ULink>
        <ULink to="/" class="spacing-2 text-white hover:text-gray-200 transition-colors text-2xl font-serif font-bold">Alex Bates</ULink>
      </motion.div>
      <!-- Sticky action bar: back link, date, reading time, copy link, reading progress -->
      <motion.div
        ref="barRef"
        :initial="enterFrom('y', 30)"
        :animate="{ opacity: 1, y: 0 }"
        :transition="enter(0.2, 0.6)"
        class="w-full sticky top-0 z-30"
      >
        <div class="absolute inset-0 backdrop-blur-md bg-[#1e1d2c]/70 border-b transition-colors duration-300"
          :class="barStuck ? 'border-white/10' : 'border-transparent'" />
        <div class="relative md:max-w-screen-md mx-auto flex items-center justify-between gap-3 px-4 py-3 text-sm">
          <NuxtLink to="/blog"
            class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-gray-200 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors">
            <UIcon name="i-heroicons-arrow-left-20-solid" class="size-4" />
            Blog
          </NuxtLink>
          <div class="flex items-center gap-3 text-gray-400">
            <time :datetime="blog.first_published_at" class="hidden sm:inline">{{ publishedDate }}</time>
            <span class="hidden sm:inline" aria-hidden="true">·</span>
            <span>{{ calculateReadingTime(blog.content.content) }} min read</span>
            <button type="button" @click="copyPostLink"
              class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-gray-200 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              :aria-label="linkCopied ? 'Link copied' : 'Copy link to this post'">
              <UIcon :name="linkCopied ? 'i-heroicons-check-20-solid' : 'i-heroicons-link-20-solid'" class="size-4" />
              <span class="hidden sm:inline" aria-live="polite">{{ linkCopied ? 'Copied' : 'Copy link' }}</span>
            </button>
          </div>
        </div>
        <!-- Reading progress -->
        <div class="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-[#60A5FA]"
          :style="{ transform: `scaleX(${readProgress})` }" aria-hidden="true" />
      </motion.div>

      <!-- Blog Title -->
      <motion.div
        :initial="morphsFromCard ? false : enterFrom('y', 30)"
        :animate="{ opacity: 1, y: 0 }"
        :transition="enter(0.4, 0.6)"
        class="w-full md:max-w-screen-md text-4xl sm:text-5xl font-bold text-[#eeeeee] px-5 sm:px-10"
      >
        <h1 :style="{ viewTransitionName: `post-title-${slug}`, viewTransitionClass: 'post-title' }">{{ blog.content.title }}</h1>
      </motion.div>

      <!-- Description -->
      <div
        v-if="blog.content.description"
        class="fade-up text-center max-w-2xl mx-auto px-5 sm:px-10"
        :style="fadeUp(0.6)"
      >
        <TextWrapper>{{ blog.content.description }}</TextWrapper>
      </div>

      <!-- Tags -->
      <div
        v-if="blog.tag_list && blog.tag_list.length > 0"
        class="fade-up flex flex-wrap gap-2 justify-center px-5 sm:px-10"
        :style="fadeUp(0.8)"
      >
        <span v-for="tag in blog.tag_list" :key="tag" class="px-3 py-1 bg-[#4278ba] text-white text-sm rounded-full">
          {{ tag }}
        </span>
      </div>

      <!-- Blog Content -->
      <div
        class="fade-up blog-article max-w-prose text-[#eeeeee] px-5 sm:px-10"
        :style="fadeUp(1.0)"
      >
        <div ref="articleRef" v-html="renderMarkdown(blog.content.content)"></div>
      </div>

      <!-- Social Sharing -->
      <div
        class="fade-up px-5 sm:px-10"
        :style="fadeUp(1.2)"
      >
        <SocialShare :title="blog.content.title" :description="blog.content.description"
          :url="postUrl" />
      </div>

      <!-- Keep reading: older / newer posts -->
      <nav v-if="neighbours.older || neighbours.newer" aria-label="More posts"
        class="w-full md:max-w-screen-md px-5 sm:px-10">
        <h2 class="text-sm font-sans font-medium uppercase tracking-wider text-gray-400 mb-4">Keep reading</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <NuxtLink v-if="neighbours.older" :to="`/blog/${neighbours.older.slug}`"
            class="group rounded-xl p-5 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors">
            <span class="text-sm text-gray-400">← Previous post</span>
            <span class="block mt-1 font-serif text-lg font-semibold text-white group-hover:underline underline-offset-4">{{ neighbours.older.title }}</span>
            <span v-if="neighbours.older.description" class="block mt-1 text-sm text-gray-400 line-clamp-2">{{ neighbours.older.description }}</span>
          </NuxtLink>
          <NuxtLink v-if="neighbours.newer" :to="`/blog/${neighbours.newer.slug}`"
            class="group rounded-xl p-5 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors sm:text-right sm:col-start-2">
            <span class="text-sm text-gray-400">Next post →</span>
            <span class="block mt-1 font-serif text-lg font-semibold text-white group-hover:underline underline-offset-4">{{ neighbours.newer.title }}</span>
            <span v-if="neighbours.newer.description" class="block mt-1 text-sm text-gray-400 line-clamp-2">{{ neighbours.newer.description }}</span>
          </NuxtLink>
        </div>
      </nav>
    </div>
  </div>
</template>

<style>
/* Post body typography. Markdown comes from Storyblok via v-html, and the
   Tailwind typography plugin isn't installed, so every element is styled here. */
.blog-article {
  font-family: var(--font-sans);
  font-weight: 400;
  line-height: 1.75;
  font-size: 1.125rem; /* 18px */
}

@media (min-width: 768px) {
  .blog-article {
    font-size: 1.25rem; /* 20px */
  }
}

.blog-article h2,
.blog-article h3,
.blog-article h4 {
  font-family: var(--font-serif);
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
  margin-top: 2.25em;
  margin-bottom: 0.75em;
}

.blog-article h2 { font-size: 1.75em; }
.blog-article h3 { font-size: 1.4em; }
.blog-article h4 { font-size: 1.15em; font-weight: 600; }

.blog-article > :first-child > :first-child {
  margin-top: 0;
}

.blog-article p,
.blog-article hr {
  margin-bottom: 1.25em;
}

.blog-article hr {
  opacity: 0.2;
  margin-top: 2.5em;
  margin-bottom: 2.5em;
}

.blog-article ul,
.blog-article ol {
  margin-bottom: 1.25em;
  margin-top: 1.25em;
  padding-inline-start: 1.625em;
}

.blog-article ul { list-style-type: disc; }
.blog-article ol { list-style-type: decimal; }

.blog-article li {
  margin: 0.5em 0;
  padding-inline-start: 0.375em;
}

.blog-article li::marker {
  color: #9ca3af;
}

.blog-article strong {
  font-weight: 700;
  color: #ffffff;
}

.blog-article a {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  color: #eeeeee;
  transition: color 0.2s ease;
}

.blog-article a:hover {
  color: #93c5fd;
}

.blog-article blockquote {
  border-left: 3px solid #4278ba;
  padding-left: 1em;
  margin: 1.75em 0;
  font-style: italic;
  color: #d1d5db;
}

.blog-article code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: rgb(255 255 255 / 0.08);
  border-radius: 0.3em;
  padding: 0.15em 0.35em;
}

.blog-article pre {
  font-size: 0.85em;
  line-height: 1.6;
  background: #15141f;
  border-radius: 0.75em;
  padding: 1em 1.25em;
  margin: 1.75em 0;
  overflow-x: auto;
}

.blog-article pre code {
  background: none;
  padding: 0;
  font-size: inherit;
}

.blog-article img {
  margin: 2.5em auto;
  border-radius: 0.75em;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}
</style>
