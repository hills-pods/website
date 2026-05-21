<!-- SPECKIT START -->
Active feature: **Bubble Hotel Website** (`001-bubble-hotel-website`).
Current plan: `specs/001-bubble-hotel-website/plan.md`.

Stack: Astro 4.x (TypeScript) + Tailwind CSS, static output deployed to Vercel. Purely
presentational marketing site — no backend/DB/auth; "Book Now" links out to an external
booking provider. Content lives in typed Astro content collections (`suites`,
`experiences`) plus `src/data/site.config.ts`.

Non-negotiables from the constitution: mobile-first responsive design, WCAG 2.1 AA
accessibility, Core Web Vitals budgets (LCP<=2.5s, INP<=200ms, CLS<=0.1), and CI quality
gates (lint/format zero-warnings, Vitest + Playwright + axe + Lighthouse CI, clean build).

For full context, read the current plan and its sibling docs (research.md, data-model.md,
contracts/routes.md, quickstart.md).
<!-- SPECKIT END -->
