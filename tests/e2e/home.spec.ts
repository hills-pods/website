import { test, expect } from '@playwright/test';
import { locales, t, url } from './_helpers';
import { site } from '../../src/data/site.config';
import { resolveBookingTarget } from '../../src/lib/booking';

// Mirror BookNowButton's resolution so the CTA assertion tracks the configured
// booking mode (internal /book page, external provider, or mailto enquiry)
// rather than hard-coding one label.
const bookingKind = resolveBookingTarget({
  hasEmbeddedWidget: site.easyMs !== null,
  bookingUrl: site.bookingUrl,
  contactEmail: site.contact.email,
}).kind;
const bookingAriaKey =
  bookingKind === 'internal'
    ? 'book.ariaInternal'
    : bookingKind === 'external'
      ? 'book.ariaExternal'
      : 'book.ariaEnquire';

// US1 + US5 — the home page captivates above the fold in each language (FR-001, FR-019, FR-020).
for (const { lang, base } of locales) {
  test.describe(`Home (${lang})`, () => {
    test('communicates the experience above the fold', async ({ page }) => {
      await page.goto(url(base, '/'));
      await expect(page.getByText(t(lang, 'hero.eyebrow'))).toBeVisible();
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toContainText(t(lang, 'brand.tagline'));
    });

    test('declares the correct page language', async ({ page }) => {
      await page.goto(url(base, '/'));
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
    });

    test('exposes a reachable Book Now call-to-action', async ({ page }) => {
      await page.goto(url(base, '/'));
      await expect(
        page.getByRole('link', { name: t(lang, bookingAriaKey) }).first(),
      ).toBeVisible();
    });

    test('suites carousel shows all five suites', async ({ page }) => {
      await page.goto(url(base, '/'));
      await expect(page.locator('[data-carousel-track] article')).toHaveCount(5);
    });

    test('renders the guest reviews section with at least one quote', async ({ page }) => {
      await page.goto(url(base, '/'));
      const region = page.getByRole('region', { name: t(lang, 'home.reviews.title') });
      await expect(region).toBeVisible();
      expect(await region.locator('figure').count()).toBeGreaterThan(0);
    });
  });
}
