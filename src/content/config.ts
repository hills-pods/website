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
      // Longer descriptive blurb shown only on the /accommodations listing row.
      // Capped at 300 chars so it cannot grow into a body of its own; `SuiteRow`
      // falls back to `summary` when this is absent.
      description: z.string().min(1).max(300).optional(),
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

// Guest reviews. Body of each markdown file is the quote itself; frontmatter
// carries the guest's name and a short "stay" line (which suite, what date).
// Bilingual: each review has a uk/ and en/ file with the shared base slug
// linking the two — same translation model used by suites and experiences.
const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    lang,
    name: z.string().min(1),
    order: z.number(),
    stay: z.string().min(1),
  }),
});

// Legal / public-offer document. One markdown file per language (uk binding,
// en courtesy translation). Body is the offer prose; only `lang` is structured.
const legal = defineCollection({
  type: 'content',
  schema: z.object({ lang }),
});

export const collections = { suites, experiences, reviews, legal };
