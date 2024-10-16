// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/ui", "@nuxt/fonts", "@nuxtjs/seo"],
  site: {
    url: "https://alexbates.dev",
    name: "Alex Bates | Software Developer",
    description:
      "Alex Bates is a web developer based in the UK. He specialises in building websites and web applications using modern technologies.",
    defaultLocale: "en",
  },
});
