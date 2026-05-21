# Phase 1 Data Model: Bubble Hotel Website

The site has no database. "Data" here means **content models** validated at build time via
Astro content-collection schemas (Zod), plus a site-wide configuration object. These models
derive directly from the spec's Key Entities and Functional Requirements.

## Content collection: `suites` (Accommodation / Bubble Suite)

Source: spec **Accommodation (Bubble Suite)** entity; FR-002.

| Field | Type | Required | Validation / Notes |
|-------|------|----------|--------------------|
| `name` | string | yes | Non-empty; display name of the suite. |
| `slug` | string | yes | URL-safe; unique across suites; drives `/accommodations/[slug]`. |
| `order` | number | yes | Sort order in listing (ascending). |
| `summary` | string | yes | Short one-line description for the listing card. |
| `view` | string | yes | The suite's setting/view (e.g., "valley-facing"). |
| `features` | string[] | yes | ≥1 notable feature. |
| `included` | string[] | yes | ≥1 item describing what's included. |
| `heroImage` | image | yes | Primary suite image (Astro image ref); alt text required. |
| `gallery` | image[] | no | Additional images for the detail page. |
| `available` | boolean | no (default `true`) | When `false`, listing shows an "unavailable" state (edge case). |
| body (Markdown) | rich text | yes | Full descriptive copy rendered on the detail page. |

**Rules**: Build fails if any required field is missing or an image lacks alt text
(supports FR-013 accessibility + Principle I). `slug` uniqueness enforced.

## Content collection: `experiences` (Experience / Amenity)

Source: spec **Experience / Amenity** entity; FR-003.

| Field | Type | Required | Validation / Notes |
|-------|------|----------|--------------------|
| `name` | string | yes | Non-empty. |
| `order` | number | yes | Sort order (ascending). |
| `description` | string | yes | Concise description of the experience. |
| `image` | image | yes | Representative image; alt text required. |
| body (Markdown) | rich text | no | Optional extended copy. |

## Gallery Media

Source: spec **Gallery Media** entity; FR-004.

Represented as image assets referenced by the gallery page (and reused from suite/experience
imagery). Each gallery item carries:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `image` | image | yes | Optimized via Astro `<Image>`. |
| `alt` | string | yes | Meaningful alternative text (FR-013). |
| `caption` | string | no | Optional display caption. |

## Site configuration: `site.config.ts`

Single source of truth for site-wide values (referenced by "Book Now", contact, SEO,
location). Centralizing these satisfies the plan's structure decision and FR-005/006/009.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `brandName` | string | yes | "Bubble" hotel display name. |
| `tagline` | string | yes | Hero tagline (FR-001). |
| `bookingUrl` | string (URL) \| null | yes | External booking provider URL. `null` → CTA falls back to contact (FR-008). |
| `contact.email` | string (email) | yes | Direct contact method (FR-009). |
| `contact.phone` | string | yes | Direct contact method (FR-009). |
| `location.description` | string | yes | Mountain location description (FR-009). |
| `location.directions` | string | yes | How to get there (FR-009). |
| `location.mapUrl` | string (URL) | no | Optional external map link. |
| `seo.defaultTitle` | string | yes | Default page title (FR-015). |
| `seo.defaultDescription` | string | yes | Default meta/social description (FR-015). |
| `seo.ogImage` | image | yes | Default social-share preview image (FR-015). |

**Validation**: `bookingUrl` (when present) and `mapUrl` must be valid URLs; `contact.email`
must be a valid email. A typed config means a misconfiguration fails the build, not
production (Principle I).

## Relationships

- A `suite` and an `experience` are independent content entries; both may contribute images
  to the Gallery.
- `site.config` is global and referenced by every page/layout.
- No guest/reservation entity exists on this site — reservation data lives entirely on the
  external booking provider (per spec note and research §4).

## State / lifecycle

- The only stateful concept is suite **availability** (`available: true|false`), which
  toggles the listing's presentation (normal vs. "currently unavailable"). All other content
  is static and rebuilt on deploy.
