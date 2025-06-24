import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSeoCollection } from "@nuxtjs/seo/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection(
      asSeoCollection({
        type: "page",
        source: "blog/**/*.md",
        schema: z.object({
          title: z.string(),
          date: z.string(),
          description: z.string().optional(),
          isArchived: z.boolean().optional(),
          isPublished: z.boolean().optional(),
          tags: z.array(z.string()).optional(),
          bannerImgUrl: z.string().optional(),
          content: z.string(),
        }),
      })
    ),
  },
});
