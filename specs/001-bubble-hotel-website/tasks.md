# Tasks: Bubble Hotel Website

**Input**: Design documents from `/specs/001-bubble-hotel-website/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/routes.md, quickstart.md

**Tests**: INCLUDED. The constitution makes testing NON-NEGOTIABLE (Principle II), and the
spec requires accessibility (SC-007), performance (SC-002), and responsive (SC-006)
verification. Test tasks are therefore part of every user story.

**Organization**: Tasks are grouped by user story (from spec.md) so each story is an
independently implementable, testable, deployable increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks)
- **[Story]**: User story the task belongs to (US1-US4)
- Stack: Astro 4.x (TypeScript) + Tailwind CSS, static → Vercel. Single project at repo root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Astro project and the constitution-mandated quality gates.

- [ ] T001 Initialize Astro project (TypeScript strict) at repository root per quickstart.md (creates `package.json`, `astro.config.mjs`, `tsconfig.json`)
- [ ] T002 [P] Add and configure Tailwind via `@astrojs/tailwind`; define brand design tokens (color, type scale, spacing) in `tailwind.config.mjs`
- [ ] T003 [P] Configure ESLint + Prettier with a zero-warning policy in `.eslintrc.cjs` and `.prettierrc`, plus `lint`/`format` npm scripts
- [ ] T004 [P] Configure Vitest in `vitest.config.ts` (with V8 coverage reporting and minimum coverage thresholds) and Playwright in `playwright.config.ts` with mobile/tablet/desktop viewport projects and `@axe-core/playwright`
- [ ] T005 [P] Configure Lighthouse CI budgets in `lighthouserc.json` (LCP≤2.5s, INP≤200ms, CLS≤0.1 + per-page asset budget) and a `lighthouse` npm script
- [ ] T006 [P] Add CI workflow `.github/workflows/ci.yml` running lint → typecheck → unit (with coverage) → e2e+a11y → lighthouse → build on every pull request; the unit step MUST fail the build if coverage falls below the configured threshold (enforces the constitution's "coverage MUST NOT decrease" gate)
- [ ] T007 [P] Add Vercel deployment config (`vercel.json` if needed) and document the per-PR preview-deploy flow

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared content models, layout, and design system used by ALL user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T008 Define typed content-collection schemas (Zod) for `suites` and `experiences` in `src/content/config.ts` per data-model.md (required fields, alt-text required, slug uniqueness)
- [ ] T009 [P] Create typed site config in `src/data/site.config.ts` (brandName, tagline, `bookingUrl: string | null`, contact, location, seo defaults) per data-model.md
- [ ] T010 [P] Create global styles / design-system base in `src/styles/global.css` (Tailwind layers, base typography, `prefers-reduced-motion` handling)
- [ ] T011 [P] Add self-hosted, subset web fonts (one display, one body) in `src/assets/fonts/` and preload them
- [ ] T012 Create `src/layouts/BaseLayout.astro` (semantic landmarks, head/SEO slot, header + footer, skip-to-content link)
- [ ] T013 [P] Create SEO component in `src/components/SEO.astro` emitting title/description/OG/Twitter from `site.config` (FR-015)
- [ ] T014 Create `src/components/Header.astro` and accessible `src/components/MobileNav.astro` (persistent nav + Book Now slot; keyboard-operable, focus-trapped menu) — supports FR-010
- [ ] T015 [P] Create `src/components/Footer.astro` (contact summary + location link from `site.config`)
- [ ] T016 Create persistent `src/components/BookNowButton.astro` rendering a clearly-labeled CTA linking to `site.config.bookingUrl` (basic external link; reachable on every page via Header) — FR-005
- [ ] T017 [P] Create on-brand not-found page `src/pages/404.astro` (FR-014)

**Checkpoint**: Foundation ready — user stories can now proceed (in parallel if staffed).

---

## Phase 3: User Story 1 - Be captivated by the experience (Priority: P1) 🎯 MVP

**Goal**: A first-time visitor lands on a beautiful, luxurious, mobile-first home page whose
hero and scroll narrative immediately convey the mountain bubble experience.

**Independent Test**: Load `/` on phone and desktop; confirm the hero (signature image +
tagline) communicates what/where above the fold, the scroll narrative builds desire, and the
page passes axe + Lighthouse budgets.

### Tests for User Story 1 ⚠️ (write first, ensure they FAIL before implementation)

- [ ] T018 [P] [US1] E2E test for home hero + above-the-fold messaging at mobile/tablet/desktop viewports in `tests/e2e/home.spec.ts`
- [ ] T019 [P] [US1] Accessibility (axe) test for the home page in `tests/e2e/home.a11y.spec.ts`

### Implementation for User Story 1

- [ ] T020 [P] [US1] Create `src/components/Hero.astro` (signature image + tagline, mobile-first, responsive, no layout shift) — FR-001
- [ ] T021 [US1] Build `src/pages/index.astro` using BaseLayout + Hero, composing the narrative sections (experience → suites → amenities → how to stay) — US1 scenarios
- [ ] T022 [US1] Add featured suites/experiences preview sections to `src/pages/index.astro` sourced from content collections
- [ ] T023 [US1] Optimize hero and home imagery with Astro `<Image>` (responsive sizes, preload hero, explicit dimensions) — FR-012, CLS budget

**Checkpoint**: Home page is a fully functional, beautiful, mobile-first MVP — deployable on its own.

---

## Phase 4: User Story 2 - Explore accommodations and amenities (Priority: P2)

**Goal**: Guests browse the bubble suites (with detail pages), the experiences/amenities,
and a high-quality gallery.

**Independent Test**: From the home page, open the suite listing, view a suite detail, view
experiences, and view the gallery — confirming a guest can evaluate the offering end to end
on any device.

### Tests for User Story 2 ⚠️

- [ ] T024 [P] [US2] E2E test: suite listing → suite detail navigation at responsive viewports in `tests/e2e/accommodations.spec.ts`
- [ ] T025 [P] [US2] E2E test: experiences + gallery render and images lazy-load in `tests/e2e/experiences-gallery.spec.ts`
- [ ] T026 [P] [US2] Accessibility (axe) tests for accommodations/experiences/gallery pages in `tests/e2e/us2.a11y.spec.ts`

### Implementation for User Story 2

- [ ] T027 [P] [US2] Create `src/components/SuiteCard.astro` (image + summary card)
- [ ] T028 [P] [US2] Create `src/components/ExperienceCard.astro`
- [ ] T029 [P] [US2] Create `src/components/Gallery.astro` (responsive grid, lazy-loaded optimized images, required alt text) — FR-004
- [ ] T030 [US2] Build suite listing page `src/pages/accommodations/index.astro` (sorted by `order`; renders "unavailable" state when `available` is false) — FR-002, edge case
- [ ] T031 [US2] Build suite detail page `src/pages/accommodations/[slug].astro` via `getStaticPaths` from the `suites` collection (hero, view, features, included, gallery, body; 404 for unknown slug)
- [ ] T032 [US2] Build experiences page `src/pages/experiences.astro` from the `experiences` collection — FR-003
- [ ] T033 [US2] Build gallery page `src/pages/gallery.astro` using the Gallery component
- [ ] T034 [P] [US2] Add placeholder suite + experience content entries and images under `src/content/` and `src/assets/` (per data-model.md schemas)

**Checkpoint**: Suites, experiences, and gallery work independently and on all devices.

---

## Phase 5: User Story 3 - Book a stay (Priority: P3)

**Goal**: A guest can reach "Book Now" from any page and be handed off to the external
booking provider, with a contact fallback if the provider is not configured.

**Independent Test**: From every page, activate "Book Now" and confirm it opens the external
provider in a new tab with clear external-site labeling; with `bookingUrl` unset, confirm it
falls back to contact.

### Tests for User Story 3 ⚠️

- [ ] T035 [P] [US3] E2E test: "Book Now" reachable on every page, opens external provider in a new tab, external-site labeling present in `tests/e2e/booking.spec.ts`
- [ ] T036 [P] [US3] E2E test: when `site.config.bookingUrl` is null, "Book Now" routes to the contact method in `tests/e2e/booking-fallback.spec.ts`

### Implementation for User Story 3

- [ ] T037 [US3] Enhance `src/components/BookNowButton.astro` with `target="_blank"` + `rel="noopener noreferrer"` and explicit "opens external booking site" labeling — FR-006, FR-007
- [ ] T038 [US3] Implement the contact fallback in `src/components/BookNowButton.astro` when `bookingUrl` is null — FR-008
- [ ] T039 [P] [US3] Document the placeholder `bookingUrl` and how to set the real provider in `src/data/site.config.ts`

**Checkpoint**: Booking handoff and fallback work consistently across the site.

---

## Phase 6: User Story 4 - Plan the visit (Priority: P4)

**Goal**: Guests find the mountain location, how to get there, and how to contact the hotel.

**Independent Test**: Locate the location/getting-there/contact information from the site and
confirm it is complete and reachable.

### Tests for User Story 4 ⚠️

- [ ] T040 [P] [US4] E2E test: location, directions, and a direct contact method are present and reachable in `tests/e2e/location.spec.ts`
- [ ] T041 [P] [US4] Accessibility (axe) test for the location page in `tests/e2e/location.a11y.spec.ts`

### Implementation for User Story 4

- [ ] T042 [US4] Build location page `src/pages/location.astro` (location description, directions, direct contact method, optional map link) from `site.config` — FR-009
- [ ] T043 [US4] Wire footer contact details from `site.config` and link to the location page

**Checkpoint**: All four user stories are independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Site-wide quality, performance, accessibility, and launch readiness.

- [ ] T044 [P] Run Lighthouse CI across all pages and tune to meet Core Web Vitals + asset budgets (Principle IV, SC-002)
- [ ] T045 [P] Full-site WCAG 2.1 AA accessibility sweep across all primary pages (SC-007)
- [ ] T046 [P] Verify mobile-first parity at phone/tablet/desktop on every page; fix any reflow-only (non-purpose-built) layouts (FR-010, SC-006)
- [ ] T047 [P] Add `public/robots.txt`, favicon, and a default OG share image (FR-015)
- [ ] T048 [P] Add unit tests for utilities/components in `tests/unit/`
- [ ] T049 Run the quickstart.md validation end to end (setup → verify scripts → production build)
- [ ] T050 [P] Update `README.md` with content-editing and booking-provider configuration instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories.
- **User Stories (Phases 3-6)**: All depend on Foundational. Then may proceed in parallel
  (if staffed) or sequentially by priority (US1 → US2 → US3 → US4).
- **Polish (Phase 7)**: Depends on the targeted user stories being complete.

### User Story Dependencies

- **US1 (P1)**: After Foundational. No dependency on other stories. This is the MVP.
- **US2 (P2)**: After Foundational. Independent of US1 (reuses shared content collections).
- **US3 (P3)**: After Foundational (BookNowButton exists from T016). Independent; enhances the CTA.
- **US4 (P4)**: After Foundational. Independent.

### Within Each User Story

- Tests are written FIRST and must FAIL before implementation.
- Components before pages; pages before image optimization/integration.
- Story complete and independently testable before moving to the next priority.

### Parallel Opportunities

- Setup tasks T002-T007 can run in parallel after T001.
- Foundational tasks marked [P] (T009, T010, T011, T013, T015, T017) can run in parallel; T012/T014/T016 depend on tokens/config/layout being present.
- Once Foundational completes, US1-US4 can be staffed in parallel.
- Within a story, all [P] test tasks and all [P] component tasks can run together.

---

## Parallel Example: User Story 2

```bash
# Tests for US2 together:
Task: "E2E test suite listing → detail in tests/e2e/accommodations.spec.ts"
Task: "E2E test experiences + gallery in tests/e2e/experiences-gallery.spec.ts"
Task: "axe tests for US2 pages in tests/e2e/us2.a11y.spec.ts"

# Components for US2 together:
Task: "Create SuiteCard in src/components/SuiteCard.astro"
Task: "Create ExperienceCard in src/components/ExperienceCard.astro"
Task: "Create Gallery in src/components/Gallery.astro"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1: Setup
2. Phase 2: Foundational (CRITICAL — blocks all stories)
3. Phase 3: User Story 1 (the captivating home page)
4. **STOP and VALIDATE**: test US1 independently (axe + Lighthouse + responsive)
5. Deploy the MVP to Vercel

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. US1 → test → deploy (MVP: a beautiful single presence)
3. US2 → test → deploy (suites, experiences, gallery)
4. US3 → test → deploy (booking handoff)
5. US4 → test → deploy (location & contact)
6. Phase 7 polish → final launch-ready pass

---

## Notes

- [P] = different files, no dependency on incomplete tasks.
- [Story] labels map tasks to spec user stories for traceability.
- Verify each story's tests fail before implementing it.
- Commit after each task or logical group (per the constitution's workflow).
- Before launch, supply real content: photography/brand assets, contact details, and the
  external booking provider URL (the build uses placeholders until then).
- Total tasks: 50 (Setup 7, Foundational 10, US1 6, US2 11, US3 5, US4 4, Polish 7).
