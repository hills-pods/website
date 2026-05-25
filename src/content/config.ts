import { defineCollection, z } from 'astro:content';

// Typed content collections (data-model.md). Schemas are validated at build time:
// a missing required field or an image without alt text fails the build (Principle I).

// Content is localized via `en/` and `uk/` subfolders; `lang` mirrors the folder and is
// used to filter entries per locale (FR-019). The shared base slug (filename) maps a
// suite/experience to its equivalent across languages for the language switcher (FR-018).
const lang = z.enum(['uk', 'en']);

const suites = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      lang,
      name: z.string().min(1),
      order: z.number(),
      summary: z.string().min(1),
      view: z.string().min(1),
      features: z.array(z.string()).min(1),
      included: z.array(z.string()).min(1),
      heroImage: image(),
      heroImageAlt: z.string().min(1),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string().min(1),
            caption: z.string().optional(),
          }),
        )
        .optional(),
      available: z.boolean().default(true),
    }),
});

const experiences = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      lang,
      name: z.string().min(1),
      order: z.number(),
      description: z.string().min(1),
      image: image(),
      imageAlt: z.string().min(1),
    }),
});

export const collections = { suites, experiences };
