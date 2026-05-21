# Phase 1 UI Contracts: Routes & Interfaces

This is a frontend application, so its "contracts" are the **pages (routes)** it exposes and
the **outbound interface** to the external booking provider. Each route lists its purpose,
source content, the user story it serves, and its acceptance-relevant behavior.

## Page routes

| Route | Page | Serves | Content source | Key behavior / acceptance |
|-------|------|--------|----------------|---------------------------|
| `/` | Home | US1 (P1) | `site.config`, featured `suites`/`experiences` | Hero (signature image + tagline) communicates the luxury mountain bubble experience above the fold; coherent scroll narrative (experience → suites → amenities → how to stay); persistent "Book Now". Mobile-first (FR-010). |
| `/accommodations` | Suite listing | US2 (P2) | `suites` collection (sorted by `order`) | Lists all suites as cards (image + summary). Unavailable suites show an "unavailable" state (edge case). |
| `/accommodations/[slug]` | Suite detail | US2 (P2) | One `suites` entry | Shows hero image, view, features, included items, gallery, full copy. 404 for unknown slug. |
| `/experiences` | Experiences & amenities | US2 (P2) | `experiences` collection | Presents signature experiences with imagery (FR-003). |
| `/gallery` | Gallery | US2 (P2) | Gallery media | High-quality, optimized imagery in an elegant responsive layout; lazy-loaded (FR-004, FR-012). |
| `/location` | Location & contact | US4 (P4) | `site.config` | Mountain location, getting-there guidance, ≥1 direct contact method, optional map link (FR-009). |
| `404` | Not found | FR-014 | static | On-brand, elegant "page not found" with a path back home. |

## Shared UI contracts (all pages)

- **Header / navigation**: consistent across all pages; includes a persistent, clearly
  labeled **"Book Now"** call-to-action (FR-005). On mobile, navigation collapses into an
  accessible menu (keyboard-operable, focus-trapped when open).
- **Footer**: contact summary + location link, consistent across pages.
- **SEO/meta**: every page emits a title, meta description, and Open Graph/Twitter preview
  (image, title, description) from `site.config` defaults, overridable per page (FR-015).
- **Responsiveness**: every route renders an intentionally-composed layout at mobile,
  tablet, and desktop breakpoints — not a reflowed desktop view (FR-010).
- **Accessibility**: semantic landmarks, logical heading order, sufficient contrast,
  meaningful image alt text, visible focus states; passes axe checks (FR-013).

## Outbound interface: external booking provider

This is the only external integration. It is a **link contract**, not an API:

| Aspect | Contract |
|--------|----------|
| Trigger | Activating any "Book Now" CTA. |
| Target | `site.config.bookingUrl` (external provider). |
| Behavior | Opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`); the CTA/labeling makes clear it leads to an external site to complete booking (FR-007). |
| Fallback | If `bookingUrl` is `null`/unconfigured, the CTA routes to the on-site contact method instead, so guests are never stranded (FR-008). |
| Data passed | None required (no query params assumed). Optional pre-fill params can be added later if the chosen provider supports them — out of scope for v1. |

## Error & empty states (contracts)

- **Unknown route** → `404` page (on-brand).
- **Suite unavailable** → listing/detail clearly marks it unavailable rather than hiding it
  silently.
- **Slow/failed imagery** → layout reserves space (no layout shift) and content remains
  readable without images (FR-012, CLS budget).
- **Booking link missing** → contact fallback (above).
