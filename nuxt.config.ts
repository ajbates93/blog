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
    // Default description; pages with their own description override it.
    // og:title, og:description, og:url and the canonical link are filled in per page by @nuxtjs/seo.
    description:
      "Alex Bates is a software developer based in the UK, building websites, web applications and mobile apps with modern technologies.",
    defaultLocale: "en-GB",
  },
  schemaOrg: {
    // Tells Google who the site belongs to, so searches for "Alex Bates" can link it to these profiles
    identity: {
      type: "Person",
      name: "Alex Bates",
      url: "https://alexbates.dev",
      image: "https://alexbates.dev/images/home-about-small.webp",
      jobTitle: "Senior Fullstack Developer",
      worksFor: { "@type": "Organization", name: "Pocketworks", url: "https://pocketworks.co.uk" },
      sameAs: ["https://github.com/ajbates93", "https://www.linkedin.com/in/alex-bates-01b548a7"],
    },
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
        // Default share image (twitter:image falls back to it); blog posts replace it with their banner
        { property: "og:image", content: "https://alexbates.dev/images/og-default.jpg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "Alex Bates, Software Developer" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@alexbates" },
      ],
    },
  },
  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  },
});