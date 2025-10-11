<template>
  <!-- Loading Spinner -->
  <div v-if="pending" class="fixed inset-0 bg-slate-50 flex items-center justify-center z-50">
    <div class="text-center">
      <UIcon name="i-mingcute:loading-3-fill" class="w-16 h-16 mx-auto text-slate-700 animate-spin" />
    </div>
  </div>

  <section v-else class="w-full min-h-screen flex items-center pb-10 md:py-10 px-4 md:px-10 xl:px-20 relative z-10">
    <div class="lg:max-w-screen-xl mx-auto">

    <!-- Header and Title Group -->
    <motion.div
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, ease: 'easeOut' }"
    >
      <Header />
      <h1 class="mt-4 sm:mt-0 xl:mt-20 text-4xl sm:text-7xl text-[#2b2b2b] font-bold sm:mb-10">Blog</h1>
    </motion.div>

    <!-- Intro Text Group -->
    <motion.div
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.2 }"
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
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.4 }"
        class="md:col-span-2"
      >
        <BentoGridCard
          :name="transformedBlogPosts[0]!.title"
          :description="transformedBlogPosts[0]!.description"
          :href="transformedBlogPosts[0]!.path"
          cta="Read more"
          :icon="transformedBlogPosts[0]!.image ? undefined : (transformedBlogPosts[0]!.icon || 'i-heroicons-document-text')"
        >
        <template #background>
          <!-- Image takes precedence over icon -->
          <NuxtImg 
            v-if="transformedBlogPosts[0]!.image" 
            :src="transformedBlogPosts[0]!.image" 
            :alt="transformedBlogPosts[0]!.title"
            class="absolute inset-0 w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          <!-- Fallback gradient background - better for light mode -->
          <div v-else class="absolute inset-0 bg-gradient-to-br from-slate-100 to-gray-200" />
        </template>
        
        <!-- Add date to main card -->
        <template #header>
          <p class="text-sm text-neutral-500">
            {{ formatDate(transformedBlogPosts[0]!.date) }}
          </p>
        </template>
        </BentoGridCard>
      </motion.div>
      
      <!-- Regular posts as BentoGridCards -->
      <motion.div
        v-for="(post, index) in transformedBlogPosts.slice(1)"
        :key="post.id"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.6 + (index * 0.1) }"
      >
        <BentoGridCard
          :name="post.title"
          :description="post.description"
          :href="post.path"
          cta="Read more"
          :icon="post.image ? undefined : (post.icon || 'i-heroicons-document-text')"
        >
        <template #background>
          <!-- Image takes precedence over icon -->
          <NuxtImg 
            v-if="post.image" 
            :src="post.image" 
            :alt="post.title"
            class="absolute inset-0 w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          <!-- Fallback gradient background - lighter for smaller cards -->
          <div v-else class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
        </template>
        
        <!-- Add date to smaller cards -->
        <template #header>
          <p class="text-sm text-neutral-500">
            {{ formatDate(post.date) }}
          </p>
        </template>
        </BentoGridCard>
      </motion.div>
      
      <!-- Empty state -->
      <motion.div
        v-if="transformedBlogPosts.length === 0"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.4 }"
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

definePageMeta({
  viewTransition: false
})

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

const { data: blogPosts } = await useAsyncData('blog-posts', () =>
  queryCollection("blog")
    .where("isArchived", "<>", true)
    .andWhere((group) => group.where("isPublished", "=", true))
    .order("date", "DESC")
    .all()
);

// Transform the blog data to match the BlogPost interface
const transformedBlogPosts = computed(() => {
  if (!blogPosts.value) return [];
  
  return blogPosts.value.map((item: any) => ({
    id: item.id || item._id || item._path,
    title: item.title || 'Untitled',
    description: item.description || 'No description available',
    date: item.date || new Date().toISOString(),
    path: item._path || item.path || '/',
    tags: item.tags || [],
    image: item.image, // Add image to the transformed data
    icon: item.icon // Add icon to the transformed data
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