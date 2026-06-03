# World Peaks — Luxury Bubble Hotel Website

A simple, beautiful, mobile-first marketing site for the World Peaks hotel — transparent bubble
suites in an alpine meadow. Built with **Astro + Tailwind CSS**, static, deployed to
**Vercel**. The site is purely presentational; "Book Now" hands off to an external booking
provider.

See `specs/001-bubble-hotel-website/` for the full spec, plan, and tasks, and
`.specify/memory/constitution.md` for the project principles.

## Requirements

- Node.js 20+ and npm

## Develop

```bash
npm install
npm run dev        # local dev server (http://localhost:4321)
```

## Quality gates (run before every PR)

```bash
npm run lint        # ESLint + Prettier (zero warnings)
npm run typecheck   # astro check
npm run test:unit   # Vitest + coverage threshold (coverage must not decrease)
npm run test:e2e    # Playwright: journeys + responsive viewports + axe (WCAG 2.1 AA)
npm run lighthouse  # Lighthouse CI: Core Web Vitals + asset budgets
npm run build       # clean production build
```

These same gates run in CI (`.github/workflows/ci.yml`) on every pull request.

## Languages (Ukrainian + English)

The site is bilingual (FR-016–FR-021). **Ukrainian is the default**, served at the root
(`/`, `/accommodations`, …); **English** is served under `/en/`. A header language switcher
moves between the two and keeps the visitor on the equivalent page.

- **UI strings** (nav, buttons, headings, page copy) live in `src/i18n/ui.ts` as a
  `uk` / `en` dictionary. `en` is the canonical key set — every key must exist in both.
- **Routing helpers** (`getLangFromUrl`, `useTranslations`, `localizeHref`,
  `getAlternateUrl`, `baseSlug`) live in `src/i18n/utils.ts`.
- **Page bodies** live in `src/screens/`; thin route files in `src/pages/` (root = uk) and
  `src/pages/en/` (English) render them and derive the language from the URL.

To add another language later: add it to `astro.config.mjs` `i18n.locales`, add its block to
`src/i18n/ui.ts`, add a content subfolder per collection, and add `src/pages/<lang>/` routes.

## Editing content

Content is data-driven via Astro content collections (schemas in `src/content/config.ts`).
Each collection is split into per-language subfolders, and entries carry a `lang` field.
A suite/experience shares the same filename (base slug) across languages so the switcher can
map equivalents.

- **Suites**: add `src/content/suites/uk/<slug>.md` and `src/content/suites/en/<slug>.md`.
  Fields: `lang`, `name`, `order`, `summary`, `view`, `features[]`, `included[]`, `heroImage`,
  `heroImageAlt`, optional `gallery[]`, and `available` (set `false` for a "currently
  unavailable" state).
- **Experiences**: add `src/content/experiences/<uk|en>/<slug>.md`. Fields: `lang`, `name`,
  `order`, `description`, `image`, `imageAlt`.

Place images in `src/assets/` and reference them with a relative path in the frontmatter
(e.g. `../../../assets/suites/aurora.jpg`). Every image requires alt text — the build fails
otherwise.

### Placeholder imagery

The photos in `src/assets/` are generated gradient placeholders
(`node scripts/gen-placeholders.mjs`). **Replace them with real photography before launch.**

## Configuring the booking provider

Site-wide settings live in `src/data/site.config.ts`:

- `bookingUrl` — the external booking provider URL. When set, "Book Now" opens it in a new
  tab. When `null`, "Book Now" falls back to the contact email (so guests are never
  stranded). **Set this to the real provider URL before launch** (currently a placeholder).
- `contact`, `location`, `seo` — contact details, location/directions, and SEO defaults.

## Deploy

Connect the repo to Vercel (auto-detects Astro). Pull requests get preview deployments;
merges to `main` deploy to production.
