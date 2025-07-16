<template>
  <section class="container mx-auto p-5 sm:p-10 text-left mt-[68px]">
    <h1 class="text-5xl font-bold text-slate-700 dark:text-white mb-8">Blog Posts</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-3xl">
      Welcome to my blog! Here you'll find thoughts, tutorials, and insights about web development, mobile development, and the tech industry. I write about things I learn, interesting projects I work on, and share knowledge that might help other developers on their journey.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-3xl">
      Whether you're interested in Vue.js, React, Flutter, or general software development practices, I hope you'll find something useful here. Feel free to reach out if you have questions or want to discuss any of the topics I cover.
    </p>
    
    <BentoGrid class="w-full">
      <!-- Featured post (spans 2 columns) -->
      <BentoGridCard
        v-if="transformedBlogPosts.length > 0"
        :name="transformedBlogPosts[0]!.title"
        :description="transformedBlogPosts[0]!.description"
        :href="transformedBlogPosts[0]!.path"
        cta="Read more"
        :icon="transformedBlogPosts[0]!.image ? undefined : (transformedBlogPosts[0]!.icon || 'i-heroicons-document-text')"
        class="md:col-span-2"
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
          <div v-else class="absolute inset-0 bg-gradient-to-br from-slate-100 to-gray-200 dark:from-indigo-500/10 dark:to-purple-500/10" />
        </template>
        
        <!-- Add date to main card -->
        <template #header>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ formatDate(transformedBlogPosts[0]!.date) }}
          </p>
        </template>
      </BentoGridCard>
      
      <!-- Regular posts as BentoGridCards -->
      <BentoGridCard
        v-for="(post, index) in transformedBlogPosts.slice(1)"
        :key="post.id"
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
          <div v-else class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700/30 dark:to-slate-600/30" />
        </template>
        
        <!-- Add date to smaller cards -->
        <template #header>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ formatDate(post.date) }}
          </p>
        </template>
      </BentoGridCard>
      
      <!-- Empty state -->
      <BentoGridItem v-if="transformedBlogPosts.length === 0" class="col-span-full text-center">
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
    </BentoGrid>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  viewTransition: false
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