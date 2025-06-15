// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: ["@nuxt/content", "@nuxt/ui", "@nuxt/fonts"],
  ssr: true,
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Alex Bates | Software Developer",
      meta: [
        { name: "description", content: "Alex Bates is a web developer based in the UK. He specialises in building websites and web applications using modern technologies." },
      ],
    },
  },
});
