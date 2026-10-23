// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-13",
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    viewTransition: true,
  },
  modules: ["@nuxtjs/seo", "@nuxt/ui", "@nuxt/fonts", "@nuxt/image", "@nuxt/icon", "motion-v/nuxt", "nuxt-lottie", "@storyblok/nuxt"],
  ssr: true,
  nitro: {
    preset: "netlify-static",
  },
  site: {
    url: "https://alexbates.dev",
    name: "Alex Bates",
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
  hooks: {
    // Prerender every published Storyblok post so each one gets real HTML
    // (and its own meta tags) instead of falling through to 404.html.
    async "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) return;
      const token = process.env.STORYBLOK_ACCESS_TOKEN;
      if (!token) throw new Error("STORYBLOK_ACCESS_TOKEN is required to prerender blog posts");

      const slugs: string[] = [];
      for (let page = 1; ; page++) {
        const url = `https://api.storyblok.com/v2/cdn/stories?token=${token}&version=published&starts_with=posts/&per_page=100&page=${page}&cv=${Date.now()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Storyblok request failed: ${res.status}`);
        const { stories } = (await res.json()) as { stories: { slug: string }[] };
        slugs.push(...stories.map((s) => s.slug));
        if (stories.length < 100) break;
      }

      nitroConfig.prerender ??= {};
      nitroConfig.prerender.routes = [
        ...(nitroConfig.prerender.routes ?? []),
        ...slugs.map((slug) => `/blog/${slug}`),
        "/rss.xml",
      ];
    },
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Alex Bates | Software Developer",
      link: [
        { rel: "alternate", type: "application/rss+xml", title: "Alex Bates", href: "/rss.xml" },
      ],
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
  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  },
  // Configure caching for blog pages using Nuxt 4's advanced caching
  routeRules: {
    // Blog pages - use ISR for better performance and cache invalidation
    "/blog/**": {
      isr: 60 * 60, // Revalidate every hour
    },
    // Static assets - cache indefinitely (Nuxt 4 handles invalidation on deploy)
    "/_nuxt/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Netlify-CDN-Cache-Control": "public, max-age=31536000, stale-while-revalidate=31536000, durable",
      },
    },
  }
});