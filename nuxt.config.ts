// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
  },
  modules: ["@nuxtjs/seo", "@nuxt/content", "@nuxt/ui", "@nuxt/fonts", "@nuxt/image", "@nuxt/icon"],
  ssr: true,
  nitro: {
    preset: "netlify-static",
  },
  site: {
    url: "https://alexbates.dev",
  },
  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
    },
  },
  // nitro: {
  //   prerender: {
  //     routes: ['/sitemap.xml']
  //   }
  // },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Alex Bates | Software Developer",
      meta: [
        {
          name: "description",
          content:
            "Alex Bates is a web developer based in the UK. He specialises in building websites, web applications and mobile applications using modern technologies.",
        },
      ],
    },
  },
  content: {
    preview: {
      api: "https://api.nuxt.studio",
    }
  }
});