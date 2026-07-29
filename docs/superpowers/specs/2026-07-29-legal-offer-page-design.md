# Design: `/legal` public offer page + footer requisites (WayForPay)

**Date:** 2026-07-29
**Status:** Approved (pending spec review)

## Purpose

Connecting the WayForPay payment processor requires the site to publicly display,
per <https://help.wayforpay.com/uk/view/13729832>:

1. A public offer agreement (договір публічної оферти).
2. Payment terms and accepted payment methods.
3. Refund / cancellation conditions and procedure.
4. Full merchant requisites: legal name, tax ID (ІПН or ЄДРПОУ), legal + actual
   address, phone, email.

## Decisions

- **Structure:** one combined `/legal` page ("Публічна оферта") holding offer +
  payment + refund + requisites. Not separate pages.
- **Localization:** bilingual, honoring the site's uk/en parity invariant.
  Ukrainian is the legally-binding version; English is a courtesy translation
  carrying an explicit "the Ukrainian version prevails" note.
- **Legal data:** scaffolded with obvious `[ЗАПОВНИТИ: ...]` placeholders — no
  fabricated legal facts are published. A pre-launch checklist lists every
  placeholder to replace.
- **Footer:** clean — legal name + a link to `/legal`. The *full* requisites live
  on `/legal`. (WayForPay's requirement is met as long as requisites are publicly
  reachable.)
- **Refund section:** a reasonable hotel cancellation template with the numbers as
  `[ЗАПОВНИТИ]` placeholders (e.g. free cancellation up to N days before arrival;
  within N days the prepayment is non-refundable).
- **Primary nav:** unchanged. Legal links belong in the footer, not the top nav.

## Where content lives (matches existing patterns)

| Content | Home | Rationale |
|---|---|---|
| Merchant requisites (name, tax ID, legal/actual address, phone, email, optional IBAN) | new typed `legal: {...}` block in `src/data/site.config.ts` | Non-localized factual data; config is the single source of truth and a missing field fails the build. Rendered in both footer and `/legal`. |
| Offer body prose (numbered sections, uk + en) | new `legal` content collection: `src/content/legal/{uk,en}/offer.md` | Long-form legal text is easier to edit as markdown; matches the en/uk content-collection pattern (suites, experiences, reviews). |
| Page chrome (labels, headings, SEO title/desc) | `legal.*` + `seo.legal.*` keys in `src/i18n/ui.ts` (uk + en) | Same as every other page's short strings; preserves parity. |

## Files

**Create:**
- `src/screens/LegalScreen.astro` — `PageHeader`, offer `<Content/>` for the active
  lang, then a requisites definition-list built from `site.config.ts`. Mirrors
  `LocationScreen`'s config + i18n usage.
- `src/pages/legal.astro`, `src/pages/en/legal.astro` — thin routes rendering
  `<LegalScreen />` (same pattern as `location.astro`).
- `src/content/legal/uk/offer.md`, `src/content/legal/en/offer.md` — offer text in
  the sections below; the en file carries the "UA version prevails" note.

**Edit:**
- `src/content/config.ts` — add the `legal` collection (`type: 'content'`,
  schema `{ lang }`).
- `src/data/site.config.ts` — add the typed `legal` requisites block (placeholders).
- `src/i18n/ui.ts` — add `legal.*` and `seo.legal.*` keys (uk + en).
- `src/components/Footer.astro` — add legal name (from config) + a `/legal` link.

**Not touched:**
- `src/data/nav.ts` — primary nav unchanged.

## Offer document sections (→ WayForPay checklist)

1. Загальні положення / acceptance of the offer.
2. Предмет договору — provision of accommodation/hotel services.
3. Порядок бронювання та оплати — booking flow + payment methods (Visa/Mastercard
   online via WayForPay, prepayment).
4. Умови надання послуг — check-in/out, what a stay includes, geography (property
   location, Ukraine).
5. Повернення коштів та скасування — cancellation policy + refund procedure and
   timeframe (templated, placeholder numbers).
6. Права, обов'язки та відповідальність сторін — brief.
7. Захист персональних даних / безпека платежів — WayForPay + card-data security note.
8. Реквізити виконавця — rendered from config.

## Success criteria

- `/legal` and `/en/legal` build and render; language switcher moves between them.
- Every WayForPay-required element is present (offer, payment methods, refund
  procedure, full requisites).
- No fabricated legal facts: every unknown is a visible `[ЗАПОВНИТИ]` placeholder.
- uk/en parity preserved (every new `ui.ts` key exists in both languages;
  both offer markdown files exist).
- Footer shows legal name + `/legal` link on every page.

## Pre-launch checklist (owner fills before connecting WayForPay)

- [ ] `site.config.legal.entityName` — full legal name (ФОП … or ТОВ «…»).
- [ ] `site.config.legal.taxId` — ІПН (ФОП) or ЄДРПОУ (ТОВ).
- [ ] `site.config.legal.addressLegal` — legal address.
- [ ] `site.config.legal.addressActual` — actual address.
- [ ] `site.config.contact.phone` / `.email` — confirm real values (current ones
      look like placeholders).
- [ ] Refund section N-day numbers in both offer markdown files.
- [ ] (Optional) IBAN / bank details if you want them in the offer.
