import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSchemaOrgCollection } from "nuxt-schema-org/content";

const blogSchema = z.object({
  title: z.string(),
  date: z.date(),
  description: z.string().optional(),
  isArchived: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  bannerImgUrl: z.string().optional(),
  content: z.string(),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection(
      asSchemaOrgCollection({
        type: "page",
        source: "blog/*.md",
        schema: blogSchema,
      })
    ),
  },
});
