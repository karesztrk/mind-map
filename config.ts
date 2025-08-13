import { z, defineCollection } from "astro:content";

const baseSchema = {
  type: "content",
  schema: z.object({
    tags: z.array(z.string()),
  }),
};

const blogSchema = defineCollection({
  type: "content",
  schema: z.object({
    tags: z.array(z.string()),
    date: z.date(),
    features: z.array(z.string()).optional(),
  }),
});

export const collections = {
  Blog: blogSchema,
  Articles: baseSchema,
  Codepens: baseSchema,
  Libraries: baseSchema,
  Snippets: baseSchema,
  Tools: baseSchema,
};
