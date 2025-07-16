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
        // OpenGraph meta tags
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Alex Bates" },
        { property: "og:title", content: "Alex Bates | Software Developer" },
        { property: "og:description", content: "Alex Bates is a web developer based in the UK. He specialises in building websites, web applications and mobile applications using modern technologies." },
        { property: "og:url", content: "https://alexbates.dev" },
        { property: "og:image", content: "https://alexbates.dev/images/home-about-small.webp" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        // Twitter Card meta tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@alexbates" },
        { name: "twitter:title", content: "Alex Bates | Software Developer" },
        { name: "twitter:description", content: "Alex Bates is a web developer based in the UK. He specialises in building websites, web applications and mobile applications using modern technologies." },
        { name: "twitter:image", content: "https://alexbates.dev/images/home-about-small.webp" },
      ],
    },
  },
  content: {
    preview: {
      api: "https://api.nuxt.studio",
    }
  }
});