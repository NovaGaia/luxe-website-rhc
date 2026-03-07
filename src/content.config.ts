import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const seo = defineCollection({
  type: 'data',
  schema: z.object({
    siteName: z.string(),
    titleTemplate: z.string().optional(),
    defaultDescription: z.string().optional(),
    defaultOgImage: z.string().optional(),
    twitterHandle: z.string().optional(),
  }),
});

export const collections = { pages, seo };
