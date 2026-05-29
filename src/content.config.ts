import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    imgDesc: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

const khana = defineCollection({
  loader: glob({ base: "./src/content/khana", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      imgDesc: z.string().optional(),
      heroImage: image().optional(),
      location: z.string(),
      cuisine: z.string(),
      dateOfVisit: z.coerce.date(),
      billAmount: z.number().nonnegative(),
      peopleCount: z.number().int().positive(),
      rating: z.number().min(0).max(5),
      pinned: z.boolean().optional().default(false),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().optional(),
            caption: z.string().optional(),
          })
        )
        .optional(),
    }),
});

const watches = defineCollection({
  loader: glob({
    base: "./src/content/watches",
    pattern: ["**/*.{md,mdx}", "!**/README.md"],
  }),
  schema: z.object({
    title: z.string(),
    // movie | manga | anime | light novel | book | articles | other (free string allows custom types)
    mediaType: z.string(),
    genre: z.array(z.string()).optional().default([]),
    rating: z.number().min(0).max(5).optional(),
    progress: z.enum(["consuming", "want", "finished", "dropped"]),
    notes: z.string().optional(),
    startDate: z.coerce.date().optional(),
    finishedDate: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { blog, khana, watches };
