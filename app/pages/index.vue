<template>
  <section
    class="grid md:max-w-3/5 lg:max-w-screen-xl h-[100dvh] max-h-[1000px] sm:grid-cols-[3fr_2fr] grid-cols-1 mx-auto text-left sm:pr-10 md:pr-20">
    <div class="px-0 sm:px-10 flex flex-col justify-start">
      <Header />
      <h1 class="text-7xl text-[#2b2b2b] font-bold mb-10">
        Hello there.
      </h1>
      <TextWrapper>
        I'm
        <span class="font-bold underline text-[#2b2b2b] ">Alex Bates</span>. I'm a software developer with over <span>{{
          yearsSinceStartDate }}</span> years of industry experience.
      </TextWrapper>
      <div class="italic text-5xl py-5 text-white text-center block">~</div>
      <TextWrapper>
        I'm currently working at
        <a target="_blank" class="font-bold" href="https://www.pocketworks.co.uk">Pocketworks</a>
        as a Full Stack Developer, where I build mobile applications and web solutions for clients across various
        industries.
      </TextWrapper>
      <TextWrapper>
        I try and remember to write about things I learn or find interesting.
        You can also follow me on <a target="_blank" class="font-bold" href="https://github.com/ajbates93">Github</a> (or <a target="_blank" class="font-bold" href="https://www.linkedin.com/in/alex-bates-01b548a7">LinkedIn</a>, if that's your thing).
      </TextWrapper>
      <div class="flex gap-5 justify-center py-10">
        <ULink class="text-[#ffffff]" target="_blank" to="https://github.com/ajbates93">
          <UIcon name="uil:github" size="2em" />
        </ULink>
        <ULink class="text-[#ffffff]" target="_blank" to="https://www.linkedin.com/in/alex-bates-01b548a7">
          <UIcon name="uil:linkedin" size="2em" />
        </ULink>
      </div>
    </div>
    <div class="absolute right-0 top-0">
      <img src="/images/home-about-small.webp" alt="Alex Bates"
        class="object-cover w-full h-60 rounded-[0_0_0_20rem] xs:h-72 sm:h-80 md:h-full lg:w-full lg:h-full md:max-h-144 lg:max-h-200 2xl:max-h-full transition-opacity delay-500 duration-1000 ease-out" />
    </div>
  </section>

  <!-- Technologies & Skills Section -->
  <section
    class="md:max-w-3/5 lg:max-w-screen-xl mx-auto text-left sm:grid-cols-[3fr_2fr] grid-cols-1 grid min-h-[100dvh]">
    <div class="px-0 sm:px-10 flex flex-col justify-start">
      <h2 class="text-2xl md:text-7xl font-bold text-[#2b2b2b] mb-4">My Work</h2>
      <TextWrapper>
        I'm proficient in a range of languages and frameworks, from frontend technologies to backend systems and mobile
        development.
        The connections show how these technologies relate and complement each other in modern development workflows.
      </TextWrapper>
    </div>
  </section>

  <!-- Blog Posts Section -->
  <section class="container mx-auto p-5 sm:p-10 text-left">
    <h2 class="text-4xl font-bold text-slate-700 dark:text-white mb-4">Latest Blog Posts</h2>
    <BentoGrid class="w-full">
      <!-- Featured post (spans 2 columns) -->
      <BentoGridCard v-if="transformedBlog.length > 0" :name="transformedBlog[0]!.title"
        :description="transformedBlog[0]!.description" :href="transformedBlog[0]!.path" cta="Read more"
        :icon="transformedBlog[0]!.image ? undefined : (transformedBlog[0]!.icon || 'i-heroicons-document-text')"
        class="md:col-span-2">
        <template #background>
          <!-- Image takes precedence over icon -->
          <NuxtImg v-if="transformedBlog[0]!.image" :src="transformedBlog[0]!.image" :alt="transformedBlog[0]!.title"
            class="absolute inset-0 w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <!-- Fallback gradient background - better for light mode -->
          <div v-else
            class="absolute inset-0 bg-gradient-to-br from-slate-100 to-gray-200 dark:from-indigo-500/10 dark:to-purple-500/10" />
        </template>

        <!-- Add date to main card -->
        <template #header>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ formatDate(transformedBlog[0]!.date) }}
          </p>
        </template>
      </BentoGridCard>

      <!-- Regular posts as BentoGridCards -->
      <BentoGridCard v-for="(post, index) in transformedBlog.slice(1, 3)" :key="post.id" :name="post.title"
        :description="post.description" :href="post.path" cta="Read more"
        :icon="post.image ? undefined : (post.icon || 'i-heroicons-document-text')">
        <template #background>
          <!-- Image takes precedence over icon -->
          <NuxtImg v-if="post.image" :src="post.image" :alt="post.title"
            class="absolute inset-0 w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <!-- Fallback gradient background - lighter for smaller cards -->
          <div v-else
            class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700/30 dark:to-slate-600/30" />
        </template>

        <!-- Add date to smaller cards -->
        <template #header>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ formatDate(post.date) }}
          </p>
        </template>
      </BentoGridCard>
    </BentoGrid>

    <!-- View All Blog Posts Card -->
    <div class="mt-6">
      <div
        class="group relative flex flex-col justify-end overflow-hidden rounded-xl bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-slate-800 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_4px_12px_rgba(0,0,0,.3),0_-20px_80px_-20px_#ffffff1f_inset]">
        <!-- Background gradient -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700/30 dark:to-slate-600/30" />

        <!-- Content -->
        <ULink to="/blog" class="relative z-10 flex items-center justify-between p-4 md:p-6">
          <div class="flex items-center gap-3">
            <UIcon name="i-heroicons-document-text" class="size-6 md:size-8 text-neutral-700 dark:text-neutral-300" />
            <span class="text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-300">
              View all blog posts
            </span>
          </div>
          <UIcon name="i-heroicons-arrow-right"
            class="size-5 md:size-6 text-neutral-700 dark:text-neutral-300 transition-transform duration-300 group-hover:translate-x-1" />
        </ULink>

        <!-- Hover overlay -->
        <div
          class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
      </div>
    </div>
  </section>

</template>

<script lang="ts" setup>
definePageMeta({
  viewTransition: false
})

// Dark mode detection for CardSpotlight
const isDark = computed(() => useColorMode().value === "dark");

const startDate = ref<Date>(new Date("2015-02-02"));

const yearsSinceStartDate = computed(() => {
  const now = new Date();
  const diff = now.getTime() - startDate.value.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
});

// Refs for AnimatedBeam component
const containerRef = ref<HTMLElement | null>(null);
const nuxtRef = ref<HTMLElement | null>(null);
const vueRef = ref<HTMLElement | null>(null);
const alpineRef = ref<HTMLElement | null>(null);
const astroRef = ref<HTMLElement | null>(null);
const elixirRef = ref<HTMLElement | null>(null);
const phoenixRef = ref<HTMLElement | null>(null);
const centralRef = ref<HTMLElement | null>(null);
const flutterRef = ref<HTMLElement | null>(null);
const dartRef = ref<HTMLElement | null>(null);
const nodeRef = ref<HTMLElement | null>(null);
const postgresRef = ref<HTMLElement | null>(null);
const csharpRef = ref<HTMLElement | null>(null);
const dotnetRef = ref<HTMLElement | null>(null);

// Blog data
const { data: blog } = await useAsyncData('homepage-blog', () =>
  queryCollection("blog")
    .where("isArchived", "<>", true)
    .andWhere((group) => group.where("isPublished", "=", true))
    .order("date", "DESC")
    .limit(3)
    .all()
);

// Transform the blog data to match the BlogPost interface
const transformedBlog = computed(() => {
  if (!blog.value) return [];

  return blog.value.map((item: any) => ({
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
