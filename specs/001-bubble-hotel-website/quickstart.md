# Quickstart: Bubble Hotel Website

How to set up, run, test, and deploy this project once implementation begins.

## Prerequisites

- Node.js 20 LTS and npm
- A Vercel account (for deployment)

## Initial setup

```bash
# From the repository root (the Astro project lives at the root)
npm create astro@latest -- --template minimal --typescript strict .
npx astro add tailwind
npm install
```

Then add the supporting dev tooling:

```bash
npm install -D vitest @playwright/test axe-core @axe-core/playwright \
  eslint prettier @lighthouse-ci/cli
npx playwright install --with-deps
```

## Project layout (target)

```
src/
├── components/   # Header, Footer, BookNowButton, SuiteCard, ExperienceCard, Gallery, Hero, SEO, MobileNav
├── layouts/      # BaseLayout.astro
├── pages/        # index, accommodations/[slug], experiences, gallery, location, 404
├── content/      # suites/, experiences/ (typed collections) + config.ts (Zod schemas)
├── data/         # site.config.ts (booking URL, contact, brand, SEO defaults)
├── styles/       # global.css (Tailwind layers)
└── assets/       # photography (optimized via Astro <Image>)
tests/
├── e2e/          # Playwright journeys (US1-US4) at mobile/tablet/desktop + axe
└── unit/         # Vitest
```

## Configure content

1. Set site-wide values in `src/data/site.config.ts` — including `bookingUrl` (the external
   booking provider) and contact details. Leave `bookingUrl: null` until the provider is
   confirmed; the "Book Now" CTA will fall back to contact.
2. Add suites under `src/content/suites/` and experiences under `src/content/experiences/`,
   following the schemas in `src/content/config.ts` (see `data-model.md`).
3. Place photography in `src/assets/` and reference it from content frontmatter.

## Develop

```bash
npm run dev        # local dev server with hot reload
```

## Verify (must pass before any PR merges — constitution gates)

```bash
npm run lint           # ESLint + Prettier, zero warnings
npm run typecheck      # tsc --noEmit (strict)
npm run test:unit      # Vitest
npm run test:e2e       # Playwright: journeys + responsive viewports + axe (a11y)
npm run lighthouse     # Lighthouse CI: LCP<=2.5s, INP<=200ms, CLS<=0.1 + asset budget
npm run build          # clean production build
```

(These scripts are wired into CI to run on every pull request.)

## Deploy

- Connect the repository to Vercel; Vercel auto-detects Astro.
- Each pull request gets a **preview deployment** — use it to review the luxury look on a
  real phone before merging.
- Merges to the default branch deploy to production.

## Definition of done (per user story)

- **US1**: Home page loads mobile + desktop; hero communicates the experience above the
  fold; passes Lighthouse budgets and axe.
- **US2**: Suites, experiences, and gallery render from content collections; images
  optimized and lazy-loaded.
- **US3**: "Book Now" is reachable from every page and opens the external provider in a new
  tab (or falls back to contact when unconfigured).
- **US4**: Location, getting-there, and contact details present and correct.
