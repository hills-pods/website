# Phase 0 Research: Bubble Hotel Website

This document records the technical decisions resolving the planning unknowns. Each entry
follows: **Decision → Rationale → Alternatives considered**.

## 1. Site framework

- **Decision**: Astro 4.x (TypeScript), output as a static site.
- **Rationale**: Purpose-built for content/marketing sites. Ships zero JavaScript by
  default ("islands" only where interactivity is needed), which makes the constitution's
  Core Web Vitals budgets (Principle IV) easy to hit on mobile. File-based routing and
  components support a consistent design system (Principle III) without the weight of a
  full SPA framework. First-class on Vercel.
- **Alternatives considered**:
  - *Next.js (React)* — more powerful and familiar, but ships a heavier JS baseline that
    needs active tuning to stay within performance budgets; overkill for a presentational
    brochure site.
  - *Plain HTML/CSS* — simplest and lightest, but no component reuse, making design-system
    consistency manual and error-prone as pages grow.

## 2. Styling & design system

- **Decision**: Tailwind CSS 3.x via `@astrojs/tailwind`, with a centralized theme
  (color, type scale, spacing tokens) in `tailwind.config`.
- **Rationale**: Utility-first styling with a single tokenized theme enforces UX
  consistency (Principle III) and prevents ad-hoc one-off CSS (Principle I). Tailwind purges
  unused styles at build, keeping shipped CSS tiny (Principle IV).
- **Alternatives considered**: Vanilla CSS / CSS Modules (more boilerplate, weaker
  consistency guarantees); a heavy component library (unnecessary weight, harder to make
  feel bespoke/luxurious).

## 3. Imagery & performance (image-heavy luxury site)

- **Decision**: Use Astro's built-in `<Image>` component (Sharp) to generate responsive,
  modern-format (AVIF/WebP), correctly sized images with explicit dimensions; lazy-load
  below-the-fold media; preload the hero image.
- **Rationale**: Photography is central to the luxury feel but is the main performance and
  CLS risk. Responsive sizing + lazy loading + explicit dimensions directly serve LCP ≤
  2.5s, CLS ≤ 0.1 (Principle IV / SC-002) and graceful degradation on slow connections
  (FR-012).
- **Alternatives considered**: Unoptimized `<img>` tags (fails budgets); a third-party
  image CDN (added cost/dependency, unnecessary given Astro + Vercel handle this).

## 4. Reservations / "Book Now" handoff

- **Decision**: "Book Now" is a configurable outbound link to the hotel's external booking
  provider, opening in a new tab (`target="_blank"` with `rel="noopener noreferrer"`), with
  clear labeling that it leads off-site. The provider URL lives in `src/data/site.config.ts`.
- **Rationale**: Matches the spec decision (external provider; site stays presentational —
  FR-006/FR-007). Centralizing the URL gives a single source of truth and makes the actual
  provider a content/config detail, not a code change.
- **Open content item (non-blocking)**: The specific provider/URL (e.g., a channel manager,
  Booking.com, or a PMS such as Cloudbeds/Mews) is supplied by the hotel owner before
  launch. A clearly-marked placeholder is used until then.
- **Fallback (FR-008)**: If the booking link is not configured/unreachable, the CTA falls
  back to the on-site contact method (phone/email) so guests are never stranded.

## 5. Content modeling

- **Decision**: Astro **content collections** (typed via Zod schemas) for `suites` and
  `experiences`; each entry is Markdown/MDX with structured frontmatter and referenced
  images. Site-wide values (brand, contact, booking URL, location) in `src/data/site.config.ts`.
- **Rationale**: Typed collections give schema validation at build (Principle I — catches
  bad/missing content early) and let pages render suites/experiences consistently
  (Principle III). Keeps content editable without touching layout code.
- **Alternatives considered**: A headless CMS (added infrastructure/cost, unnecessary for a
  small site with an infrequently-changing content set; can be added later if needed).

## 6. Testing strategy (constitution Principle II — NON-NEGOTIABLE)

- **Decision**:
  - *Unit*: Vitest for component/util logic.
  - *End-to-end & responsive*: Playwright, running each primary journey (US1-US4) at
    mobile, tablet, and desktop viewports.
  - *Accessibility*: axe-core run within Playwright against every primary page (WCAG 2.1 AA
    — FR-013/SC-007).
  - *Performance*: Lighthouse CI with a budget config asserting LCP/INP/CLS targets and a
    per-page asset budget (Principle IV).
- **Rationale**: Directly enforces the constitution's testing and quality gates in CI on
  every PR. Deterministic by fixing viewports and mocking the external booking link target.
- **Alternatives considered**: Manual QA only (violates Principle II); Cypress (Playwright
  chosen for built-in multi-viewport + device emulation and axe integration).

## 7. Tooling & quality gates

- **Decision**: ESLint + Prettier (zero-warning gate), TypeScript strict mode, and a CI
  pipeline running lint/format → typecheck → unit → e2e+a11y → Lighthouse → production
  build. A PR cannot merge unless all gates are green.
- **Rationale**: Implements the constitution's "Quality Gates & Tooling Standards" section
  verbatim.
- **Alternatives considered**: Looser/optional checks (rejected — the constitution requires
  enforced, automated gates).

## 8. Hosting & deployment

- **Decision**: Vercel (per user), deploying Astro's static output; preview deployments per
  PR for review.
- **Rationale**: User preference; native Astro support; per-PR preview URLs aid the review
  process (Development Workflow) and let reviewers verify the luxury/mobile experience on
  real devices.
- **Alternatives considered**: Netlify / Cloudflare Pages (equivalent; Vercel chosen by the
  user).

## 9. Typography & motion (luxury feel)

- **Decision**: A small, curated pairing of self-hosted web fonts (one elegant
  display/serif for headings, one clean sans for body), subset and preloaded; subtle,
  reduced-motion-aware transitions only.
- **Rationale**: Typography carries the "luxurious" impression while self-hosting + subsetting
  protects performance. Respecting `prefers-reduced-motion` keeps motion accessible
  (Principle III).
- **Alternatives considered**: Many/heavy font weights or large animation libraries
  (rejected — performance and accessibility cost without proportional value).

## Resolved unknowns summary

| Unknown | Resolution |
|---------|-----------|
| Framework | Astro 4.x (static) |
| Styling | Tailwind CSS + tokenized theme |
| Images | Astro `<Image>` (responsive, AVIF/WebP, lazy) |
| Booking | External provider link (configurable), contact fallback |
| Content | Typed Astro content collections + site.config |
| Testing | Vitest + Playwright + axe + Lighthouse CI |
| Hosting | Vercel |

**No remaining NEEDS CLARIFICATION** (the only outstanding item — the exact booking
provider URL — is a content value supplied at launch, not a design decision).
