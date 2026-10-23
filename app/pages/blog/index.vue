<template>

  <section class="w-full min-h-screen flex items-center pb-10 md:py-10 px-4 md:px-10 xl:px-20 relative z-10">
    <div class="lg:max-w-screen-xl mx-auto">

    <!-- Header and Title Group -->
    <motion.div
      :initial="titleMorphs ? false : enterFrom('y', 30)"
      :animate="{ opacity: 1, y: 0 }"
      :transition="enter(0, 0.6)"
    >
      <h1 class="mt-4 sm:mt-0 xl:mt-20 text-4xl sm:text-7xl text-[#ffffff] font-bold sm:mb-10"
        style="view-transition-name: page-title">Blog</h1>
    </motion.div>

    <!-- Intro Text Group -->
    <motion.div
      :initial="enterFrom('y', 30)"
      :animate="{ opacity: 1, y: 0 }"
      :transition="enter(0.2, 0.6)"
    >
      <TextWrapper>
        Here you'll find thoughts, tutorials, and insights about web development, mobile development, and the tech industry. I write about things I learn, interesting projects I work on, and share knowledge that might help other developers on their journey.
      </TextWrapper>
      <TextWrapper class="mb-10">
        Whether you're interested in Vue.js, React, Flutter, or general software development practices, I hope you'll find something useful here. Feel free to reach out if you have questions or want to discuss any of the topics I cover.
      </TextWrapper>
    </motion.div>
    
    <BentoGrid class="w-full">
      <!-- Featured post (spans 2 columns) -->
      <motion.div
        v-if="transformedBlogPosts.length > 0"
        :initial="cardMorphs(transformedBlogPosts[0]!.path) ? false : enterFrom('y', 30)"
        :animate="{ opacity: 1, y: 0 }"
        :transition="enter(0.4, 0.6)"
        class="md:col-span-2"
      >
        <BentoGridCard
          :name="transformedBlogPosts[0]!.title"
          :description="transformedBlogPosts[0]!.description"
          :href="transformedBlogPosts[0]!.path"
          :transition-key="transformedBlogPosts[0]!.slug"
          cta="Read more"
          :icon="transformedBlogPosts[0]!.image ? undefined : ('i-heroicons-document-text')"
        >
        <template #background>
          <!-- Image takes precedence over icon -->
          <NuxtImg 
            v-if="transformedBlogPosts[0]!.image" 
            :src="transformedBlogPosts[0]!.image" 
            :alt="transformedBlogPosts[0]!.title"
            :style="{ viewTransitionName: `post-image-${transformedBlogPosts[0]!.slug}`, viewTransitionClass: 'post-image' }"
            class="absolute inset-0 w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          <!-- Fallback gradient background - matching main background -->
          <div v-else class="absolute inset-0 bg-gradient-to-br from-[#1e1d2c]/90 to-gray-900/90" />
        </template>
        
        <!-- Add date to main card -->
        <template #header>
          <p class="text-sm text-gray-300">
            {{ formatDate(transformedBlogPosts[0]!.date) }}
          </p>
        </template>
        </BentoGridCard>
      </motion.div>
      
      <!-- Regular posts as BentoGridCards -->
      <motion.div
        v-for="(post, index) in transformedBlogPosts.slice(1)"
        :key="post.id"
        :initial="cardMorphs(post.path) ? false : enterFrom('y', 30)"
        :animate="{ opacity: 1, y: 0 }"
        :transition="enter(0.6 + (index * 0.1), 0.6)"
      >
        <BentoGridCard
          :name="post.title"
          :description="post.description"
          :href="post.path"
          :transition-key="post.slug"
          cta="Read more"
          :icon="post.image ? undefined : ('i-heroicons-document-text')"
        >
        <template #background>
          <!-- Image takes precedence over icon -->
          <NuxtImg 
            v-if="post.image" 
            :src="post.image" 
            :alt="post.title"
            :style="{ viewTransitionName: `post-image-${post.slug}`, viewTransitionClass: 'post-image' }"
            class="absolute inset-0 w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          <!-- Fallback gradient background - matching main background -->
          <div v-else class="absolute inset-0 bg-gradient-to-br from-[#1e1d2c]/80 to-gray-900/80" />
        </template>
        
        <!-- Add date to smaller cards -->
        <template #header>
          <p class="text-sm text-gray-300">
            {{ formatDate(post.date) }}
          </p>
        </template>
        </BentoGridCard>
      </motion.div>
      
      <!-- Empty state -->
      <motion.div
        v-if="transformedBlogPosts.length === 0"
        :initial="enterFrom('y', 30)"
        :animate="{ opacity: 1, y: 0 }"
        :transition="enter(0.4, 0.6)"
        class="col-span-full text-center"
      >
        <BentoGridItem>
        <template #icon>
          <UIcon name="i-heroicons-document-text" class="w-12 h-12 mx-auto text-neutral-400" />
        </template>
        
        <template #title>
          No blog posts yet
        </template>
        
        <template #description>
          Check back soon for new content!
        </template>
        </BentoGridItem>
      </motion.div>
    </BentoGrid>

    </div>
  </section>
</template>

<script lang="ts" setup>
import { motion } from 'motion-v'
import type { StoryblokStory, BlogPost } from '~/types/storyblok'

// Skip entrances for elements that morph in from the previous page
const from = useTransitionFrom()
const { enter, enterFrom } = useEntrance()
const titleMorphs = computed(() => from.value === '/' || from.value === '/work')
const cardMorphs = (path: string) => from.value === path

useSeoMeta({
  title: 'Blog',
  description: 'Writing from Alex Bates on web and mobile development, side projects and things learned along the way.',
  ogTitle: 'Blog | Alex Bates',
  ogUrl: 'https://alexbates.dev/blog',
})


const { data: blogPosts } = await useAsyncData('blog-posts', async () => {
  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get('cdn/stories', {
    version: 'published',
    starts_with: 'posts/',
    per_page: 100,
    sort_by: 'first_published_at:desc'
  });
  console.log(data.stories);
  return data.stories as StoryblokStory[];
});

// Transform the blog data to match the BlogPost interface
const transformedBlogPosts = computed((): BlogPost[] => {
  if (!blogPosts.value) return [];
  
  return blogPosts.value.map((story: StoryblokStory): BlogPost => ({
    id: story.id.toString(),
    title: story.content.title,
    description: story.content.description,
    content: story.content.content,
    date: story.first_published_at,
    path: `/blog/${story.slug}`,
    tags: story.tag_list,
    image: story.content.banner_image?.filename || undefined,
    slug: story.slug,
    publishedAt: story.published_at,
    firstPublishedAt: story.first_published_at,
    component: story.content.component
  }));
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
</script>

<style></style>