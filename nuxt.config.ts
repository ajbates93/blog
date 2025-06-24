// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    viewTransition: true,
  },
  modules: ["@nuxtjs/seo", "@nuxt/content", "@nuxt/ui", "@nuxt/fonts"],
  ssr: true,
  nitro: {
    preset: "netlify-static",
  },
  site: {
    url: "https://www.alexbates.dev",
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
            "Alex Bates is a web developer based in the UK. He specialises in building websites and web applications using modern technologies.",
        },
      ],
    },
  },
});
