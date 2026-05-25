# Implementation Plan: Bubble Hotel Website

**Branch**: `001-bubble-hotel-website` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-bubble-hotel-website/spec.md`

## Summary

A simple, beautiful, luxurious marketing/brochure website for the Bubble hotel — a
collection of transparent bubble suites in a mountain setting. The site immerses visitors
in the experience through striking imagery and restrained copy, presents the suites and
signature amenities, and hands off to an external booking provider for reservations. It is
mobile-first, fully responsive, fast (Core Web Vitals budgets), and accessible (WCAG 2.1
AA), per the project constitution.

**Technical approach**: Build a static, content-driven site with **Astro** (TypeScript),
styled with **Tailwind CSS**, using Astro's built-in image optimization for the heavy
photography. The site is purely presentational — no backend, database, or auth — with
"Book Now" linking out to the hotel's external booking provider. Deploy to **Vercel** as a
static/edge-rendered site.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20 LTS (build-time); output is static
HTML/CSS with minimal/zero client JS.

**Primary Dependencies**: Astro 4.x (site framework), Tailwind CSS 3.x (styling via
`@astrojs/tailwind`), Astro's built-in `<Image>` / Sharp for responsive image optimization.
Optional, kept minimal: a small accessible component for the mobile navigation menu.

**Storage**: N/A — content is authored as local content (Markdown/MDX + structured content
collections and image assets in the repo). No database. No persisted guest/reservation data
(bookings occur on the external provider).

**Testing**: Vitest (unit/component logic, with coverage thresholds enforced in CI so
coverage cannot decrease — constitution Quality Gates), Playwright (end-to-end +
responsive/mobile viewport checks), axe-core via Playwright (accessibility), Lighthouse CI
(performance & Core Web Vitals budgets). ESLint + Prettier for lint/format gates.

**Target Platform**: Modern evergreen browsers on phone, tablet, and desktop. Deployed to
Vercel. Mobile-first is a hard requirement (FR-010).

**Project Type**: Web application — single static frontend (no backend service).

**Performance Goals**: Core Web Vitals at the 75th percentile: LCP ≤ 2.5s, INP ≤ 200ms,
CLS ≤ 0.1 (constitution Principle IV). Home page visually usable within 3s on a typical
mobile connection (SC-002). Per-page asset budget enforced; ship ~zero render-blocking JS.

**Constraints**: Image-heavy yet must stay within asset budgets and degrade gracefully on
slow connections (FR-012). WCAG 2.1 AA on all primary pages (FR-013, SC-007). Bilingual:
Ukrainian (default, at root) and English (under `/en/`) via Astro i18n (FR-016–FR-021).
No login/accounts. Booking handled externally.

**Scale/Scope**: Small brochure site — roughly 4-6 pages/sections: Home, Accommodations
(suite detail), Experiences/Amenities, Gallery, Location & Contact, plus a graceful 404.
Content set: a handful of bubble suites and a handful of experiences.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Evaluated against `.specify/memory/constitution.md` v1.0.0:

| Principle | How this plan complies | Status |
|-----------|------------------------|--------|
| I. Code Quality | ESLint + Prettier enforced (zero warnings); Astro components are small, single-purpose; Tailwind avoids ad-hoc CSS sprawl; new dependencies kept minimal and justified above. | ✅ PASS |
| II. Testing Standards (NON-NEGOTIABLE) | Vitest + Playwright + axe + Lighthouse CI run in CI on every PR; tests cover primary user journeys (US1-US4) and edge cases; deterministic (fixed viewports, mocked external booking link). | ✅ PASS |
| III. UX Consistency | Shared design tokens (Tailwind theme: color, type scale, spacing) + reusable components form one design system; consistent nav/CTA/empty/error patterns; WCAG 2.1 AA; mobile-first per FR-010. | ✅ PASS |
| IV. Performance Requirements | Astro ships ~zero JS by default; built-in responsive image optimization; CWV budgets (LCP/INP/CLS) enforced via Lighthouse CI; per-page asset budget gate. | ✅ PASS |
| Quality Gates & Tooling | CI gates: lint/format (zero warnings), tests green, unit coverage threshold (coverage cannot decrease), automated a11y checks, Lighthouse performance audit, clean production build. | ✅ PASS |
| Development Workflow | Branch + PR (`001-bubble-hotel-website`), PR links this spec/plan, ≥1 reviewer verifies all four principles. | ✅ PASS |

**Result**: PASS — no violations. Complexity Tracking section is intentionally empty.

## Project Structure

### Documentation (this feature)

```text
specs/001-bubble-hotel-website/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── routes.md        # Page/route + external-link UI contracts
├── checklists/
│   └── requirements.md  # Spec quality checklist (/speckit.specify)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created here)
```

### Source Code (repository root)

```text
src/
├── components/          # Reusable UI: Header, Footer, BookNowButton, SuiteCard,
│                        #   ExperienceCard, Gallery, Hero, SEO, MobileNav
├── layouts/             # BaseLayout.astro (shared shell: head/SEO, header, footer)
├── pages/               # Routes (file-based):
│   ├── index.astro          #   Home (US1)
│   ├── accommodations/      #   Suite listing + detail (US2)
│   ├── experiences.astro    #   Amenities & experiences (US2)
│   ├── gallery.astro        #   Image gallery (US2)
│   ├── location.astro       #   Location, getting there, contact (US4)
│   └── 404.astro            #   On-brand not-found (FR-014)
├── content/             # Astro content collections (typed):
│   ├── suites/          #   One entry per bubble suite (Markdown/MDX + frontmatter)
│   └── experiences/     #   One entry per experience/amenity
├── data/                # site.config.ts (booking provider URL, contact, brand)
├── styles/              # tailwind base layer / global tokens
└── assets/              # Optimized photography (processed by Astro <Image>)

public/                  # Static files served as-is (favicon, robots.txt, og fallback)

tests/
├── e2e/                 # Playwright: journeys US1-US4, responsive viewports, a11y (axe)
└── unit/                # Vitest: component/util logic

Config (root): astro.config.mjs, tailwind.config.* , tsconfig.json,
  .eslintrc / prettier, lighthouserc (budgets), vercel.json (if needed)
```

**Structure Decision**: Single static Astro project at the repository root (Project Type:
web application, frontend-only). No `backend/` because the site is purely presentational
and booking is external. Content lives in typed Astro content collections so suites and
experiences are data-driven and consistently rendered. The external booking URL and contact
details are centralized in `src/data/site.config.ts` so "Book Now" and contact points have a
single source of truth.

## Complexity Tracking

> No constitution violations — no entries required.
