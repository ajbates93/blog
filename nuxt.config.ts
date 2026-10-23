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
    // Static output served by a Cloudflare Worker (see wrangler.jsonc).
    preset: "cloudflare-pages-static",
  },
  site: {
    url: "https://alexbates.dev",
    name: "Alex Bates",
  },
  image: {
    // Resize/convert via Storyblok's image service, which works on any host
    provider: "storyblok",
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
    // The preset writes `/* /404.html 404` to _redirects, which Workers rejects
    // (only 200/3xx allowed). wrangler.jsonc's not_found_handling does the same job.
    "nitro:init"(nitro) {
      nitro.hooks.hook("compiled", async () => {
        const { rm } = await import("node:fs/promises");
        await rm(`${nitro.options.output.dir}/_redirects`, { force: true });
      });
    },
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
      script: [
        // Cloudflare Web Analytics (cookieless). Auto-injection doesn't apply to Worker static assets.
        {
          src: "https://static.cloudflareinsights.com/beacon.min.js",
          defer: true,
          "data-cf-beacon": '{"token": "ac277e546c114998b33d176bda0690f5"}',
        },
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
});