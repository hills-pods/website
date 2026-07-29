# Legal Offer Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual `/legal` public-offer page (Публічна оферта) plus footer requisites so the site meets WayForPay's merchant-disclosure requirements.

**Architecture:** Non-localized merchant requisites live in the typed `site.config.ts`; the long-form offer text lives as uk/en markdown in a new `legal` content collection; short page chrome lives in `ui.ts`. A thin `LegalScreen.astro` renders `PageHeader` + the offer `<Content/>` + a requisites block from config, wired to `/legal` and `/en/legal` routes that mirror the existing page pattern. The footer gains the legal name + a `/legal` link.

**Tech Stack:** Astro 4, Astro content collections, Tailwind (via `@astrojs/tailwind`), TypeScript.

## Global Constraints

- **uk/en parity:** every new `ui.ts` key MUST exist in both `en` and `uk`; both `legal/uk/offer.md` and `legal/en/offer.md` MUST exist. `astro check` fails otherwise (the `UIKey` type derives from `en`, and `useTranslations` indexes `ui[lang][key]`).
- **No fabricated legal facts:** every unknown value is a visible `[ЗАПОВНИТИ: …]` placeholder. Never invent a name, tax ID, address, or policy number.
- **Ukrainian is binding:** the en offer opens with a "Ukrainian version prevails" note.
- **Default language has no path prefix:** uk at `/legal`, en at `/en/legal` (per `localizeHref`).
- **Follow existing patterns:** thin page routes render a screen; screens read i18n via `getLangFromUrl` + `useTranslations`; config is the single source of truth for non-localized data.
- **Verification per task:** `npm run typecheck` (`astro check`) and, where a route/render changes, `npm run build`. No unit-test harness is wired up in this repo.

---

### Task 1: Requisites data, i18n strings, and the `legal` collection schema

Foundation task: adds the data and types everything else consumes. No visual output yet.

**Files:**
- Modify: `src/data/site.config.ts` (add `legal` block to the `SiteConfig` interface and the `site` object)
- Modify: `src/i18n/ui.ts` (add `legal.*`, `footer.legal`, `seo.legal.*` keys to both `en` and `uk`)
- Modify: `src/content/config.ts` (add the `legal` collection)

**Interfaces:**
- Produces: `site.legal` with shape `{ entityName: string; taxId: string; addressLegal: string; addressActual: string; bank?: string }`.
- Produces UIKeys: `legal.eyebrow`, `legal.title`, `legal.intro`, `legal.requisites.title`, `legal.req.name`, `legal.req.taxId`, `legal.req.addressLegal`, `legal.req.addressActual`, `legal.req.phone`, `legal.req.email`, `legal.req.bank`, `footer.legal`, `seo.legal.title`, `seo.legal.desc`.
- Produces content collection: `legal` (`type: 'content'`, schema `{ lang }`).

- [ ] **Step 1: Add the `legal` block to the `SiteConfig` interface** in `src/data/site.config.ts`, immediately after the `contact` block:

```ts
  /**
   * Legal-entity requisites, published in full on /legal and (name only) in the
   * footer to satisfy WayForPay's merchant-disclosure requirement. These are
   * placeholders — replace every [ЗАПОВНИТИ] before connecting the processor.
   */
  legal: {
    /** Full legal name — «ФОП Прізвище Ім'я По батькові» or «ТОВ "…"». */
    entityName: string;
    /** Tax ID — ІПН (ФОП) or ЄДРПОУ (ТОВ). */
    taxId: string;
    /** Registered (legal) address. */
    addressLegal: string;
    /** Actual operating address. */
    addressActual: string;
    /** Optional IBAN / bank line for the offer; empty string hides the row. */
    bank?: string;
  };
```

- [ ] **Step 2: Add the matching `legal` values to the `site` object** in `src/data/site.config.ts`, after the `contact: { … }` property:

```ts
  legal: {
    entityName: "[ЗАПОВНИТИ: повне найменування — ФОП … або ТОВ «…»]",
    taxId: '[ЗАПОВНИТИ: ІПН (ФОП) або ЄДРПОУ (ТОВ)]',
    addressLegal: '[ЗАПОВНИТИ: юридична адреса]',
    addressActual: '[ЗАПОВНИТИ: фактична адреса]',
    bank: '',
  },
```

- [ ] **Step 3: Add the `legal` content collection** in `src/content/config.ts`. Add this definition after the `reviews` collection:

```ts
// Legal / public-offer document. One markdown file per language (uk binding,
// en courtesy translation). Body is the offer prose; only `lang` is structured.
const legal = defineCollection({
  type: 'content',
  schema: z.object({ lang }),
});
```

Then extend the export:

```ts
export const collections = { suites, experiences, reviews, legal };
```

- [ ] **Step 4: Add the English keys** in `src/i18n/ui.ts`, inside the `en: { … }` block. Put the page keys after the `loc.*` group and `footer.legal` in the `footer.*` group; add `seo.legal.*` in the SEO group:

```ts
    'legal.eyebrow': 'Legal',
    'legal.title': 'Public Offer Agreement',
    'legal.intro':
      'The terms on which we provide accommodation, how payment and refunds work, and our full company details. The Ukrainian version of this offer is the legally binding one.',
    'legal.requisites.title': 'Merchant details',
    'legal.req.name': 'Legal name',
    'legal.req.taxId': 'Tax ID (ІПН / ЄДРПОУ)',
    'legal.req.addressLegal': 'Legal address',
    'legal.req.addressActual': 'Actual address',
    'legal.req.phone': 'Phone',
    'legal.req.email': 'Email',
    'legal.req.bank': 'Bank details',
```

Add to the `footer.*` group in `en`:

```ts
    'footer.legal': 'Terms & Conditions',
```

Add to the SEO group in `en`:

```ts
    'seo.legal.title': 'Terms & Conditions',
    'seo.legal.desc':
      'The public offer agreement for stays at World Peaks — booking, payment, refunds, and our company details.',
```

- [ ] **Step 5: Add the Ukrainian keys** in `src/i18n/ui.ts`, inside the `uk: { … }` block, in the SAME positions:

```ts
    'legal.eyebrow': 'Правова інформація',
    'legal.title': 'Публічна оферта',
    'legal.intro':
      'Умови, на яких ми надаємо послуги проживання, як відбувається оплата й повернення коштів, а також повні реквізити виконавця.',
    'legal.requisites.title': 'Реквізити виконавця',
    'legal.req.name': 'Найменування',
    'legal.req.taxId': 'Податковий номер (ІПН / ЄДРПОУ)',
    'legal.req.addressLegal': 'Юридична адреса',
    'legal.req.addressActual': 'Фактична адреса',
    'legal.req.phone': 'Телефон',
    'legal.req.email': 'Ел. пошта',
    'legal.req.bank': 'Банківські реквізити',
```

Add to the `footer.*` group in `uk`:

```ts
    'footer.legal': 'Публічна оферта',
```

Add to the SEO group in `uk`:

```ts
    'seo.legal.title': 'Публічна оферта',
    'seo.legal.desc':
      'Договір публічної оферти на проживання у «Вершинах Світу» — бронювання, оплата, повернення коштів і реквізити.',
```

- [ ] **Step 6: Typecheck.** Run: `npm run typecheck`
  Expected: PASS (no missing-key errors — proves parity; `legal` collection type resolves). It is fine that the new keys/collection are not yet consumed.

- [ ] **Step 7: Commit.**

```bash
git add src/data/site.config.ts src/i18n/ui.ts src/content/config.ts
git commit -m "feat(legal): add requisites config, i18n keys, and legal collection schema"
```

---

### Task 2: Offer document markdown (uk + en)

**Files:**
- Create: `src/content/legal/uk/offer.md`
- Create: `src/content/legal/en/offer.md`

**Interfaces:**
- Consumes: the `legal` collection schema from Task 1 (`{ lang }`).
- Produces: two entries filterable by `data.lang`, each with a renderable body.

- [ ] **Step 1: Create `src/content/legal/uk/offer.md`** (binding version):

```md
---
lang: uk
---

## 1. Загальні положення

Цей документ є офіційною публічною пропозицією (офертою) Виконавця, повне найменування та реквізити якого наведено в розділі «Реквізити виконавця» на цій сторінці, укласти договір про надання послуг тимчасового розміщення (проживання) на умовах, викладених нижче. Оформлення бронювання та/або здійснення оплати означає повне й беззастережне прийняття (акцепт) умов цієї оферти.

## 2. Предмет договору

Виконавець надає послуги тимчасового розміщення у панорамних номерах готелю «Вершини Світу», розташованого в Карпатах (Україна), а Замовник зобов'язується оплатити ці послуги відповідно до обраного тарифу.

## 3. Порядок бронювання та оплати

- Бронювання здійснюється на сайті, за телефоном або електронною поштою, зазначеними в розділі «Реквізити виконавця».
- Оплата приймається у безготівковій формі — банківськими картками **Visa** та **Mastercard** через платіжний сервіс **WayForPay**.
- Для підтвердження бронювання стягується передоплата у розмірі **[ЗАПОВНИТИ: розмір передоплати, %]** від вартості проживання; решта суми сплачується **[ЗАПОВНИТИ: при заселенні / інші умови]**.
- Послуга вважається наданою після завершення періоду проживання, зазначеного у бронюванні.

## 4. Умови надання послуг

- Час заселення — з **[ЗАПОВНИТИ: напр. 14:00]**, час виїзду — до **[ЗАПОВНИТИ: напр. 12:00]**.
- До вартості проживання включено **[ЗАПОВНИТИ: що входить — сніданок, паркування тощо]**.
- Послуги надаються за адресою фактичного розташування готелю, зазначеною в розділі «Реквізити виконавця». Географія надання послуг — Україна.

## 5. Повернення коштів та скасування бронювання

- Замовник має право скасувати бронювання, повідомивши Виконавця за контактами з розділу «Реквізити виконавця».
- У разі скасування **більш ніж за [ЗАПОВНИТИ: N] днів** до дати заселення передоплата повертається в повному обсязі.
- У разі скасування **менш ніж за [ЗАПОВНИТИ: N] днів** до дати заселення передоплата **[ЗАПОВНИТИ: не повертається / повертається частково — умови]**.
- Повернення коштів здійснюється тим самим способом, яким було здійснено оплату, протягом **[ЗАПОВНИТИ: до 30 (тридцяти)]** банківських днів з моменту отримання запиту.
- Повернення здійснюється з урахуванням Закону України «Про захист прав споживачів».

## 6. Права, обов'язки та відповідальність сторін

- Виконавець зобов'язується надати послуги належної якості згідно з умовами бронювання.
- Замовник зобов'язується дотримуватися правил проживання та дбайливо ставитися до майна Виконавця.
- Сторони звільняються від відповідальності за невиконання зобов'язань унаслідок обставин непереборної сили (форс-мажор).

## 7. Захист персональних даних та безпека платежів

- Виконавець обробляє персональні дані Замовника виключно з метою виконання цього договору відповідно до Закону України «Про захист персональних даних».
- Обробку платежів здійснює сервіс WayForPay; дані банківської картки передаються захищеним з'єднанням і Виконавцю не розкриваються.

## 8. Реквізити виконавця

Повні реквізити Виконавця наведено у блоці «Реквізити виконавця» на цій сторінці.
```

- [ ] **Step 2: Create `src/content/legal/en/offer.md`** (courtesy translation, with prevails note):

```md
---
lang: en
---

> This is a courtesy translation. The Ukrainian version of this offer is the legally binding one and prevails in case of any discrepancy.

## 1. General provisions

This document is an official public offer by the Provider — whose full legal name and details appear in the "Merchant details" section on this page — to enter into an agreement for temporary accommodation services on the terms set out below. Making a booking and/or payment constitutes full and unconditional acceptance of this offer.

## 2. Subject of the agreement

The Provider supplies temporary accommodation in the panoramic suites of the World Peaks hotel, located in the Carpathians (Ukraine), and the Customer undertakes to pay for those services according to the chosen rate.

## 3. Booking and payment

- Bookings are made on the website, by phone, or by email, as listed in the "Merchant details" section.
- Payment is accepted by bank card — **Visa** and **Mastercard** — via the **WayForPay** payment service.
- A prepayment of **[ЗАПОВНИТИ: prepayment amount, %]** of the accommodation cost is charged to confirm a booking; the balance is paid **[ЗАПОВНИТИ: at check-in / other terms]**.
- The service is deemed rendered at the end of the stay specified in the booking.

## 4. Provision of services

- Check-in from **[ЗАПОВНИТИ: e.g. 14:00]**, check-out by **[ЗАПОВНИТИ: e.g. 12:00]**.
- The price includes **[ЗАПОВНИТИ: what is included — breakfast, parking, etc.]**.
- Services are provided at the hotel's actual address listed in "Merchant details". Service area — Ukraine.

## 5. Refunds and cancellation

- The Customer may cancel a booking by notifying the Provider using the contacts in "Merchant details".
- If cancelled **more than [ЗАПОВНИТИ: N] days** before the arrival date, the prepayment is refunded in full.
- If cancelled **fewer than [ЗАПОВНИТИ: N] days** before the arrival date, the prepayment is **[ЗАПОВНИТИ: non-refundable / partially refundable — terms]**.
- Refunds are made by the same method used for payment, within **[ЗАПОВНИТИ: up to 30 (thirty)]** banking days of receiving the request.
- Refunds are handled in accordance with the Law of Ukraine "On Protection of Consumer Rights".

## 6. Rights, obligations, and liability

- The Provider undertakes to deliver services of proper quality per the booking terms.
- The Customer undertakes to observe the accommodation rules and to treat the Provider's property with care.
- The parties are released from liability for non-performance caused by force majeure.

## 7. Personal data and payment security

- The Provider processes the Customer's personal data solely to perform this agreement, in accordance with the Law of Ukraine "On Protection of Personal Data".
- Payments are processed by WayForPay; card data is transmitted over a secure connection and is not disclosed to the Provider.

## 8. Merchant details

The Provider's full details are shown in the "Merchant details" section on this page.
```

- [ ] **Step 3: Typecheck** to validate both entries against the schema. Run: `npm run typecheck`
  Expected: PASS.

- [ ] **Step 4: Commit.**

```bash
git add src/content/legal/uk/offer.md src/content/legal/en/offer.md
git commit -m "feat(legal): add bilingual public-offer document"
```

---

### Task 3: LegalScreen + routes

**Files:**
- Create: `src/screens/LegalScreen.astro`
- Create: `src/pages/legal.astro`
- Create: `src/pages/en/legal.astro`

**Interfaces:**
- Consumes: `site.legal` and `site.contact` (config), the `legal` collection, and the `legal.*` / `seo.legal.*` UIKeys from Task 1; the offer entries from Task 2.
- Produces: routes `/legal` and `/en/legal`.

- [ ] **Step 1: Create `src/screens/LegalScreen.astro`:**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import PageHeader from '@/components/PageHeader.astro';
import { getCollection } from 'astro:content';
import { site } from '@/data/site.config';
import { getLangFromUrl, useTranslations } from '@/i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

// One offer entry per language; base slug is shared ("offer").
const [offer] = await getCollection('legal', ({ data }) => data.lang === lang);
const { Content } = await offer.render();

const req = site.legal;
const rows = [
  { label: t('legal.req.name'), value: req.entityName },
  { label: t('legal.req.taxId'), value: req.taxId },
  { label: t('legal.req.addressLegal'), value: req.addressLegal },
  { label: t('legal.req.addressActual'), value: req.addressActual },
  { label: t('legal.req.phone'), value: site.contact.phone },
  { label: t('legal.req.email'), value: site.contact.email },
  ...(req.bank ? [{ label: t('legal.req.bank'), value: req.bank }] : []),
];
---

<BaseLayout title={t('seo.legal.title')} description={t('seo.legal.desc')}>
  <PageHeader eyebrow={t('legal.eyebrow')} title={t('legal.title')} intro={t('legal.intro')} />

  <section class="container-luxe grid gap-12 pb-24 lg:grid-cols-3">
    <article class="legal-prose max-w-2xl lg:col-span-2">
      <Content />
    </article>

    <aside class="h-max rounded-lg border border-white/10 bg-night-800 p-6">
      <p class="eyebrow mb-4">{t('legal.requisites.title')}</p>
      <dl class="space-y-3 text-sm">
        {
          rows.map((row) => (
            <div>
              <dt class="text-mist">{row.label}</dt>
              <dd class="text-cream/90">{row.value}</dd>
            </div>
          ))
        }
      </dl>
    </aside>
  </section>
</BaseLayout>

<style>
  .legal-prose :global(h2) {
    @apply mt-10 text-2xl;
  }
  .legal-prose :global(h3) {
    @apply mt-6 text-xl;
  }
  .legal-prose :global(p),
  .legal-prose :global(ul),
  .legal-prose :global(ol) {
    @apply mt-4 leading-relaxed text-cream/80;
  }
  .legal-prose :global(ul),
  .legal-prose :global(ol) {
    @apply list-disc space-y-2 pl-6;
  }
  .legal-prose :global(blockquote) {
    @apply mt-4 border-l-2 border-champagne/50 pl-4 text-mist italic;
  }
  .legal-prose :global(strong) {
    @apply text-cream;
  }
</style>
```

- [ ] **Step 2: Create `src/pages/legal.astro`:**

```astro
---
import LegalScreen from '@/screens/LegalScreen.astro';
---

<LegalScreen />
```

- [ ] **Step 3: Create `src/pages/en/legal.astro`:**

```astro
---
import LegalScreen from '@/screens/LegalScreen.astro';
---

<LegalScreen />
```

- [ ] **Step 4: Build** (validates rendering of both routes). Run: `npm run build`
  Expected: PASS; output lists `legal/index.html` and `en/legal/index.html`.

- [ ] **Step 5: Commit.**

```bash
git add src/screens/LegalScreen.astro src/pages/legal.astro src/pages/en/legal.astro
git commit -m "feat(legal): add LegalScreen and /legal routes (uk + en)"
```

---

### Task 4: Footer requisites link

**Files:**
- Modify: `src/components/Footer.astro` (bottom bar)

**Interfaces:**
- Consumes: `site.legal.entityName`, `t('footer.legal')`, `localizeHref` (all already imported in `Footer.astro`).

- [ ] **Step 1: Replace the bottom-bar block** in `src/components/Footer.astro` (the `<div class="container-luxe border-t border-white/5 py-6">…</div>`) with:

```astro
  <div class="container-luxe border-t border-white/5 py-6">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-xs text-mist">© {year} {t('brand.name')}. {t('footer.rights')}</p>
      <p class="text-xs text-mist">
        {site.legal.entityName} ·{' '}
        <a
          href={localizeHref('/legal', lang)}
          class="text-cream/70 underline-offset-4 transition-colors hover:text-champagne hover:underline"
        >
          {t('footer.legal')}
        </a>
      </p>
    </div>
  </div>
```

- [ ] **Step 2: Build.** Run: `npm run build`
  Expected: PASS.

- [ ] **Step 3: Commit.**

```bash
git add src/components/Footer.astro
git commit -m "feat(legal): show legal name and offer link in footer"
```

---

### Task 5: Full verification

**Files:** none (verification only).

- [ ] **Step 1: Typecheck + lint + build.** Run: `npm run typecheck && npm run build`
  Expected: both PASS. (Skip `npm run lint` if no `eslint.config.js` exists; note it if it fails for that reason.)

- [ ] **Step 2: Manual visual check.** Run: `npm run dev`, then open:
  - `http://localhost:4321/legal` — offer renders with styled headings/lists; requisites block shows the `[ЗАПОВНИТИ]` placeholders; footer shows legal name + "Публічна оферта" link.
  - `http://localhost:4321/en/legal` — English offer with the "Ukrainian version prevails" blockquote at top.
  - Toggle the language switcher on `/legal` → lands on `/en/legal` and back (handled automatically by `getAlternateUrl`; no code change needed).

- [ ] **Step 3: Confirm the pre-launch checklist** in the spec (`docs/superpowers/specs/2026-07-29-legal-offer-page-design.md`) is accurate — every `[ЗАПОВНИТИ]` in config and both markdown files is listed.

## Self-Review

- **Spec coverage:** offer (Task 2) ✓; payment methods (offer §3) ✓; refund procedure + timeframe (offer §5) ✓; full requisites in config + rendered block (Tasks 1, 3) ✓; bilingual w/ prevails note (Task 2) ✓; clean footer name+link (Task 4) ✓; placeholders only, no fabricated facts ✓; nav untouched ✓.
- **Placeholder scan:** the only placeholders are intentional `[ЗАПОВНИТИ]` legal-data tokens; no plan-level TODOs.
- **Type consistency:** `site.legal` shape and every UIKey used in `LegalScreen`/`Footer` are defined in Task 1; collection name `legal` matches between `content/config.ts`, `getCollection('legal', …)`, and the file paths.
