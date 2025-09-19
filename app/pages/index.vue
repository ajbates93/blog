<template>
  <!-- Hero Section with Blue Background -->
  <section class="w-full h-screen bg-[#5385c2] flex items-center">
    <div
      class="grid md:max-w-3/5 lg:max-w-screen-xl h-full max-h-[1000px] sm:grid-cols-[3fr_2fr] grid-cols-1 mx-auto text-left sm:pr-10 md:pr-20">
      <div class="px-0 sm:px-10 flex flex-col justify-start">
        <Header />
        <h1 class="text-7xl text-[#2b2b2b] font-bold mb-10">
          Hello there.
        </h1>
        <TextWrapper>
          I'm
          <span class="font-bold underline text-[#2b2b2b]">Alex Bates</span>. I'm a software developer with over
          <span>{{
            yearsSinceStartDate }}</span> years of industry experience.
        </TextWrapper>
        <div class="italic text-5xl py-5 text-[#2b2b2b] text-center block">~</div>
        <TextWrapper>
          I'm currently working at
          <a target="_blank" class="font-bold text-white hover:text-gray-200 transition-colors"
            href="https://www.pocketworks.co.uk">Pocketworks</a>
          as a Full Stack Developer, where I build web and mobile applications for clients across various
          industries.
        </TextWrapper>
        <TextWrapper>
          Take a look at my <ULink to="/blog" class="font-bold text-white hover:text-gray-200 transition-colors">blog</ULink> to see what I've been working on. I try and remember to write about things I learn or find interesting.
          You can also follow me on <a target="_blank"
            class="font-bold text-white hover:text-gray-200 transition-colors"
            href="https://github.com/ajbates93">Github</a> (or <a target="_blank"
            class="font-bold text-white hover:text-gray-200 transition-colors"
            href="https://www.linkedin.com/in/alex-bates-01b548a7">LinkedIn</a>, if that's your thing).
        </TextWrapper>
        <div class="flex gap-5 justify-center py-10">
          <ULink class="text-white hover:text-gray-200 transition-colors" target="_blank"
            to="https://github.com/ajbates93" aria-label="Visit Alex's GitHub profile">
            <UIcon name="uil:github" size="2em" />
          </ULink>
          <ULink class="text-white hover:text-gray-200 transition-colors" target="_blank"
            to="https://www.linkedin.com/in/alex-bates-01b548a7" aria-label="Visit Alex's LinkedIn profile">
            <UIcon name="uil:linkedin" size="2em" />
          </ULink>
        </div>

        <!-- Availability Status -->
        <div class="bg-[#4278ba] p-5 rounded-md flex gap-3">
          <!-- <p class="font-bold mb-2 text-md text-[#ffffff] font-mono rounded-md">Availability:</p> -->
          <p aria-hidden="true">
            <span class="inline-block animate-pulse w-3 h-3 bg-green-500 rounded-full"></span>
          </p>
          <div>
            <p class="text-md text-[#ffffff] font-mono rounded-md mt-0 mb-1">
              Hooray! I'm currently available for new freelance work!<br />
            Drop me an email at <a
                href="mailto:hello@alexbates.dev"
                class="font-bold text-white hover:text-gray-200 transition-colors">hello@alexbates.dev</a> to discuss
              your project.</p>
          </div>

        </div>

      </div>
      <div class="absolute right-0 top-0">
        <img src="/images/home-about-small.webp" alt="Alex Bates, a software developer"
          class="object-cover w-full h-60 rounded-[0_0_0_20rem] xs:h-72 sm:h-80 md:h-full lg:w-full lg:h-full md:max-h-144 lg:max-h-200 2xl:max-h-full transition-opacity delay-500 duration-1000 ease-out" />
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

<style scoped>
/* Ensure proper focus indicators for accessibility */
input:focus,
button:focus {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

/* High contrast for better readability */
.text-white {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Ensure minimum touch target size */
button {
  min-height: 44px;
  min-width: 44px;
}

/* Smooth scrolling for better UX */
html {
  scroll-behavior: smooth;
}

.font-serif {
  font-family: 'Lora', serif;
}
</style>
