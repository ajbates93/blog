<template>
  <section class="grid sm:grid-cols-[2fr_3fr] grid-cols-1 container mx-auto p-5 sm:p-10 text-left mt-[68px]">
    <picture class="rounded-xl shadow-2xl overflow-hidden mb-5 sm:mb-0">
      <img src="/images/home-about-small.webp" alt="Alex Bates" class="w-full" />
    </picture>
    <div class="py-5 px-0 sm:px-10 flex flex-col justify-start">
      <h1 class="text-5xl text-slate-700 dark:text-white font-bold mb-5">
        Hello there.
      </h1>
      <TextWrapper>
        I'm
        <span class="font-bold text-slate-700 dark:text-gray-300">Alex Bates</span>. I'm a software developer that's
        been working professionally for
        <span>{{ yearsSinceStartDate }}</span> years.
      </TextWrapper>
      <TextWrapper>
        I'm currently working at
        <a target="_blank" class="text-[#e68937] font-bold" href="https://www.pocketworks.co.uk">Pocketworks</a>
        as a Full Stack Developer, where I build mobile applications and web solutions for clients across various
        industries.
      </TextWrapper>
      <TextWrapper>
        My expertise spans across modern web technologies including Vue.js, Astro, Elixir & Phoenix, and mobile
        development with Flutter. I'm passionate about creating user-friendly applications that solve real-world
        problems and deliver exceptional user experiences.
      </TextWrapper>
      <TextWrapper>
        I try and remember to write about things I learn or find interesting.
        You can also follow me on Github (or LinkedIn, if that's your thing).
      </TextWrapper>
      <div class="flex gap-5 mt-auto">
        <ULink class="text-indigo-500 dark:text-indigo-400" target="_blank" to="https://github.com/ajbates93">
          <UIcon name="uil:github" size="2em" />
        </ULink>
        <ULink class="text-indigo-500 dark:text-indigo-400" target="_blank"
          to="https://www.linkedin.com/in/alex-bates-01b548a7">
          <UIcon name="uil:linkedin" size="2em" />
        </ULink>
      </div>
    </div>
  </section>

  <!-- Technologies & Skills Section -->
  <section class="container mx-auto p-5 sm:p-10 text-left">
    <CardSpotlight
      class="shadow-2xl"
      :gradient-color="'#C9C9C9'"
      :gradient-opacity="0.8"
      slot-class="p-8"
    >
      <h2 class="text-3xl font-bold text-slate-700 dark:text-white mb-4">Technologies & Skills</h2>
      <TextWrapper>
        I'm proficient in a range of languages and frameworks, from frontend technologies to backend systems and mobile development. 
        The connections show how these technologies relate and complement each other in modern development workflows.
      </TextWrapper>

      <div ref="containerRef"
        class="relative flex h-[500px] px-10 mx-auto items-center justify-center overflow-hidden rounded-lg my-10 md:my-20">
        <div class="flex size-full max-h-[500px] flex-col items-stretch justify-between gap-12">
          <!-- Top row - Frameworks -->
          <div class="flex flex-row items-center justify-between">
            <UTooltip :delay-duration="0" text="Nuxt">
              <div ref="nuxtRef"
                class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
                <UIcon name="i-logos-nuxt-icon" size="28" class="sm:w-8 sm:h-8" />
              </div>
            </UTooltip>
            <UTooltip :delay-duration="0" text="Vue">
              <div ref="vueRef"
                class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
                <UIcon name="i-logos-vue" size="28" class="sm:w-8 sm:h-8" />
              </div>
            </UTooltip>
            <UTooltip :delay-duration="0" text="Alpine">
              <div ref="alpineRef"
                class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
                <UIcon name="i-logos-alpinejs-icon" size="28" class="sm:w-8 sm:h-8" />
              </div>
            </UTooltip>
            <UTooltip :delay-duration="0" text="Astro">
              <div ref="astroRef"
                class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
                <UIcon name="i-logos-astro" size="28" class="sm:w-8 sm:h-8" />
              </div>
            </UTooltip>
          </div>

          <!-- Middle row - Languages and Central -->
          <div class="flex flex-row items-center justify-between">

                      <UTooltip :delay-duration="0" text="Phoenix">
            <div ref="phoenixRef"
              class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
              <UIcon name="i-logos-phoenix" size="28" class="sm:w-8 sm:h-8" />
            </div>
          </UTooltip>
          <UTooltip :delay-duration="0" text="Elixir">
            <div ref="elixirRef"
              class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
              <Icon name="vscode-icons:file-type-elixir" size="28" class="sm:w-8 sm:h-8" />
            </div>
          </UTooltip>
          <UTooltip :delay-duration="0" text="Alex Bates">
            <div ref="centralRef"
              class="z-10 flex size-18 sm:size-20 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
              <img src="/favicon.svg" alt="Alex Bates" class="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
          </UTooltip>

          <UTooltip :delay-duration="0" text="C#">
            <div ref="csharpRef"
              class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
              <UIcon name="i-logos-c-sharp" size="28" class="sm:w-8 sm:h-8" />
            </div>
          </UTooltip>
          <UTooltip :delay-duration="0" text="ASP.NET">
            <div ref="dotnetRef"
              class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
              <UIcon name="i-logos-dotnet" size="28" class="sm:w-8 sm:h-8" />
            </div>
          </UTooltip>
          </div>

          <!-- Bottom row - Frameworks and Tools -->
          <div class="flex flex-row items-center justify-between">
                      <UTooltip :delay-duration="0" text="Node.js">
            <div ref="nodeRef"
              class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
              <UIcon name="i-logos-nodejs-icon" size="28" class="sm:w-8 sm:h-8" />
            </div>
          </UTooltip>
          <UTooltip :delay-duration="0" text="PostgreSQL">
            <div ref="postgresRef"
              class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
              <UIcon name="i-logos-postgresql" size="28" class="sm:w-8 sm:h-8" />
            </div>
          </UTooltip>
          <UTooltip :delay-duration="0" text="Dart">
            <div ref="dartRef"
              class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
              <UIcon name="i-logos-dart" size="28" class="sm:w-8 sm:h-8" />
            </div>
          </UTooltip>
          <UTooltip :delay-duration="0" text="Flutter">
            <div ref="flutterRef"
              class="z-10 flex size-14 sm:size-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-500 dark:shadow-gray-900/50">
              <UIcon name="i-logos-flutter" size="28" class="sm:w-8 sm:h-8" />
            </div>
          </UTooltip>
          </div>
        </div>

        <!-- Framework to Language connections -->
        <AnimatedBeam :container-ref="containerRef" :from-ref="nuxtRef" :to-ref="vueRef" :curvature="20" :duration="6" />
        <AnimatedBeam :container-ref="containerRef" :from-ref="phoenixRef" :to-ref="elixirRef" :curvature="20"
          :duration="6" />
        <AnimatedBeam :container-ref="containerRef" :from-ref="flutterRef" :to-ref="dartRef" :curvature="30"
          :duration="6" />
        <AnimatedBeam :container-ref="containerRef" :from-ref="dotnetRef" :to-ref="csharpRef" :curvature="20"
          :duration="6" />

        <!-- Direct connections to central -->
        <AnimatedBeam :container-ref="containerRef" :from-ref="vueRef" :to-ref="centralRef" :curvature="-40"
          :end-y-offset="-10" :duration="6" />
        <AnimatedBeam :container-ref="containerRef" :from-ref="alpineRef" :to-ref="centralRef" :curvature="-20"
          :end-y-offset="-5" :duration="6" />
        <AnimatedBeam :container-ref="containerRef" :from-ref="astroRef" :to-ref="centralRef" :curvature="-10"
          :end-y-offset="-5" :duration="6" />
        <AnimatedBeam :container-ref="containerRef" :from-ref="nodeRef" :to-ref="centralRef" :curvature="-30"
          :end-y-offset="10" :duration="6" />
        <AnimatedBeam :container-ref="containerRef" :from-ref="elixirRef" :to-ref="centralRef" :curvature="-30"
          :duration="6" />
        <AnimatedBeam :container-ref="containerRef" :from-ref="dartRef" :to-ref="centralRef" :curvature="30"
          :duration="6" />
        <AnimatedBeam :container-ref="containerRef" :from-ref="csharpRef" :to-ref="centralRef" :curvature="40"
          :duration="6" />

        <!-- Direct tool connections to central -->
        <AnimatedBeam :container-ref="containerRef" :from-ref="postgresRef" :to-ref="centralRef" :curvature="-20"
          :end-y-offset="5" :duration="6" />
      </div>
    </CardSpotlight>
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
        :icon="post.image ? undefined : (post.icon || 'i-heroicons-document-text')" class="col-span-1">
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

    <div class="mt-6 text-center">
      <ULink to="/blog" class="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
        View all blog posts →
      </ULink>
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
