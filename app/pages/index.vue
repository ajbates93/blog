<template>
  <!-- Loading Spinner -->
  <div v-if="pending" class="w-full min-h-screen bg-[#1e1d2c] flex items-center justify-center z-10">
    <div class="text-center">
      <UIcon name="i-mingcute:loading-3-fill" class="w-16 h-16 mx-auto text-[#eeeeee] animate-spin" />
    </div>
  </div>

  <!-- Hero Section -->
  <section v-else class="w-full min-h-screen flex items-center pb-10 md:py-10 px-4 md:px-10 xl:px-20 relative z-10">
    <div
      class="xl:grid xl:max-w-screen-xl xl:grid-cols-[3fr_3fr] gap-10 xl:gap-20 grid-cols-1 mx-auto text-left items-stretch">
      <div class="flex flex-col justify-start">
        <!-- Group 1: Header, Heading, and Intro -->
        <motion.div :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut' }">
          <h1 class="mt-4 sm:mt-0 xl:mt-20 text-4xl sm:text-7xl text-[#ffffff] font-bold sm:mb-10">
            Hello there.
          </h1>

        </motion.div>

        <motion.div :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.2 }">
          <TextWrapper>
            I'm
            <span class="font-bold underline">Alex Bates</span>. I'm a software developer with over
            <span>{{
              yearsSinceStartDate }}</span> years of industry experience.
          </TextWrapper>
        </motion.div>

        <!-- Group 2: Work Description, Blog/Social Links, and Social Icons -->
        <motion.div :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.4 }">
          <TextWrapper>
            I'm currently working at
            <a target="_blank" class="font-bold text-white hover:text-gray-200 transition-colors"
              href="https://www.pocketworks.co.uk">Pocketworks</a>
            as a Full Stack Developer, where I build web and mobile applications for clients across various
            industries.
          </TextWrapper>
          <TextWrapper>
            Take a look at my <ULink to="/blog" class="font-bold text-white hover:text-gray-200 transition-colors">blog
            </ULink> to see what I've been working on. I try and remember to write about things I learn or find
            interesting.
            You can also follow me on <a target="_blank"
              class="font-bold text-white hover:text-gray-200 transition-colors"
              href="https://github.com/ajbates93">Github</a> (or <a target="_blank"
              class="font-bold text-white hover:text-gray-200 transition-colors"
              href="https://www.linkedin.com/in/alex-bates-01b548a7">LinkedIn</a>, if that's your thing).
          </TextWrapper>
          <div class="flex gap-5 justify-center py-5 sm:py-10">
            <ULink class="text-white hover:text-gray-200 transition-colors" target="_blank"
              to="https://github.com/ajbates93" aria-label="Visit Alex's GitHub profile">
              <UIcon name="uil:github" size="2em" />
            </ULink>
            <ULink class="text-white hover:text-gray-200 transition-colors" target="_blank"
              to="https://www.linkedin.com/in/alex-bates-01b548a7" aria-label="Visit Alex's LinkedIn profile">
              <UIcon name="uil:linkedin" size="2em" />
            </ULink>
          </div>
        </motion.div>

        <!-- Group 3: Availability Status -->
        <motion.div :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.6 }">
          <!-- Desktop version -->
          <div class="hidden md:flex bg-white/10 backdrop-blur-sm p-5 rounded-md gap-3">
            <p aria-hidden="true">
              <span class="inline-block animate-pulse w-3 h-3 bg-green-500 rounded-full"></span>
            </p>
            <div>
              <p class="text-md text-[#ffffff] font-serif rounded-md mt-0 mb-1">
                Hooray! I'm currently available for new freelance work!<br />
                Drop me an email at <a href="mailto:hello@alexbates.dev"
                  class="font-bold text-white hover:text-gray-200 transition-colors">hello@alexbates.dev</a> to discuss
                your project.</p>
            </div>
          </div>

          <!-- Mobile version - compact status -->
          <div class="md:hidden flex flex-col items-center justify-center gap-6 mb-4">
            <div class="flex items-center gap-2">
              <span class="inline-block animate-pulse w-2 h-2 bg-green-500 rounded-full"></span>
              <span class="text-white font-serif">Available for work</span>
              <a href="mailto:hello@alexbates.dev"
                class="text-white font-serif underline hover:text-gray-200 transition-colors">
                hello@alexbates.dev
              </a>
            </div>
            <GradientButton href="mailto:hello@alexbates.dev" class="text-white">Get in touch!</GradientButton>
          </div>
        </motion.div>

      </div>

      <!-- Interactive Terminal with fade-in-fade-left animation (happens last) -->
      <motion.div :initial="{ opacity: 0, x: 30 }" :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.8 }"
        class="hidden xl:block sticky top-10 mx-auto my-10 xl:m-0 overflow-hidden w-full max-w-[600px] max-h-[90dvh]">
        <div class="bg-gray-900 rounded-lg p-4 shadow-2xl flex flex-col border border-gray-700 h-full">
          <div class="flex items-center gap-2 mb-2 flex-shrink-0">
            <div class="flex gap-1">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span class="text-gray-400 text-sm font-mono">terminal</span>
          </div>
          <InteractiveTerminal />
        </div>
      </motion.div>
    </div>
  </section>

  <!-- Work Timeline Section -->
  <section id="about" class="w-full py-4 md:py-10 xl:py-20 px-4 md:px-10 xl:px-20">
    <Timeline :items="workTimelineData" title="Experience"
      description="A timeline of my professional experience in software development">
      <template v-for="(item, index) in workTimelineData" :key="item.id + 'template'" #[item.id]>
        <div class="pl-20 lg:pl-0 relative w-full">
          <h3 class="mb-4 block text-left text-3xl font-bold text-white">
            {{ item.title }}
          </h3>
          <div class="mb-2 text-base text-gray-300">
            {{ item.period }}
          </div>
          <div class="mb-2 text-base text-gray-300 font-bold">
            {{ item.location }}
          </div>
        </div>
        <div class="pl-20 lg:pl-0 mb-8 font-normal text-gray-200 text-base">
          <p class="mb-4">{{ item.description }}</p>
          <div v-if="item.achievements && item.achievements.length > 0">
            <h4 class="font-semibold mb-2">Key achievements:</h4>
            <ul class="list-disc list-inside space-y-1">
              <li v-for="achievement in item.achievements" :key="achievement">
                {{ achievement }}
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Timeline>
  </section>

  <!-- Call to Action Section -->
  <section id="call-to-action" class="w-full py-4 md:py-10 xl:py-20 px-4 md:px-10 xl:px-20 relative z-10 mb-4 md:mb-10 xl:mb-20">
    <CallToAction />
  </section>
</template>

<script lang="ts" setup>
import { motion } from 'motion-v'
import GradientButton from '@/components/inspira-ui/GradientButton.vue'
import Timeline from '@/components/inspira-ui/Timeline.vue'

definePageMeta({
  viewTransition: false
})

// Set page meta for better SEO
useHead({
  title: 'Alex Bates - Software Developer',
  meta: [
    { name: 'description', content: 'Software developer with over 9 years of experience. Currently working at Pocketworks building web and mobile applications.' }
  ]
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

// Work timeline data
const workTimelineData = [
  {
    id: "pocketworks",
    label: "2023",
    title: "Fullstack Web Developer, Pocketworks",
    period: "10/2023 - Present (2 years)",
    location: "📍 Leeds, UK",
    description: "Delivering full-stack solutions across diverse industries, working autonomously to make technical decisions and manage project timelines. Expanding technology capabilities with TypeScript, Vue/Nuxt, Alpine.js, Astro, Elixir/Phoenix, Python/Flask, and Go.",
    achievements: [
      "Led web application development for electrical testing equipment",
      "Delivered complex data visualisations using SciCharts",
      "Created custom licensing integration with C libraries using Python",
      "Migrated legacy systems to modern Astro/GraphQL/DatoCMS stack",
      "Integrated AI tools into development workflow"
    ]
  },
  {
    id: "hci-senior",
    label: "2022",
    title: "Senior Software Developer, HCI York",
    period: "07/2022 - 09/2023 (1 year 3 months)",
    location: "📍 York, UK",
    description: "Led projects involving custom .NET CMS development and migrated the company's front-end approach to modern Vue.js stacks.",
    achievements: [
      "Led custom in-house .NET CMS projects",
      "Migrated front-end development to Vue.js",
      "Mentored junior developers",
      "Improved company documentation and workflows"
    ]
  },
  {
    id: "hci-developer",
    label: "2015",
    title: "Software Developer, HCI York",
    period: "02/2015 - 06/2022 (7 years 5 months)",
    location: "📍 York, UK",
    description: "Progressed from Software Apprentice to Senior Developer over 7+ years, developing expertise in C#, ASP.NET, and modern web technologies.",
    achievements: [
      "Progressed from Apprentice to Senior Developer",
      "Developed expertise in C#, ASP.NET, and web technologies",
      "Built custom CMS solutions for various industries",
      "Built successful e-commerce solution for local business"
    ]
  }
];
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
