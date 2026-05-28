import { test, expect } from '@playwright/test';
import { locales, t, url } from './_helpers';

// US3 — "Book Now" is reachable on every page and routes to the in-page
// reservation screen, in each language (FR-005/006/007). Persistent CTA in
// header + mobile menu + per-screen instances.
const canonicalPages = ['/', '/accommodations', '/experiences', '/gallery', '/location'];

for (const { lang, base } of locales) {
  for (const canonical of canonicalPages) {
    test(`Book Now routes to /book on ${url(base, canonical)} (${lang})`, async ({ page }) => {
      await page.goto(url(base, canonical));
      const cta = page.getByRole('link', { name: t(lang, 'book.ariaInternal') }).first();
      await expect(cta).toBeVisible();
      // Internal: no new tab, no external attrs, localized href.
      await expect(cta).toHaveAttribute('href', url(base, '/book'));
      await expect(cta).not.toHaveAttribute('target', '_blank');
    });
  }

  test.describe(`Booking page (${lang})`, () => {
    test('renders the reservation widget container and the fallback panel', async ({ page }) => {
      await page.goto(url(base, '/book'));
      // Header + intro are localized.
      await expect(
        page.getByRole('heading', { level: 1, name: t(lang, 'book.title') }),
      ).toBeVisible();
      // The widget container is always in the DOM; the third-party bundle
      // populates it at runtime. We assert presence, not script execution.
      await expect(page.locator('#easyms-reservation-module')).toBeAttached();
      // Always-visible safety net: fallback panel exposes the external
      // provider link so guests are never stranded if the script is blocked.
      const partner = page.getByRole('link', { name: t(lang, 'book.fallback.partnerAria') });
      await expect(partner).toBeVisible();
      await expect(partner).toHaveAttribute('target', '_blank');
      await expect(partner).toHaveAttribute('rel', /noopener/);
    });
  });
}
