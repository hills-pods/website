import { test, expect } from '@playwright/test';
import { locales, t, url } from './_helpers';

// US3 — "Book Now" is reachable on every page and hands off externally, in each language
// (FR-005/006/007). The accessible name is the localized external label.
const canonicalPages = ['/', '/accommodations', '/experiences', '/gallery', '/location'];

for (const { lang, base } of locales) {
  for (const canonical of canonicalPages) {
    test(`Book Now hands off externally on ${url(base, canonical)} (${lang})`, async ({ page }) => {
      await page.goto(url(base, canonical));
      const cta = page.getByRole('link', { name: t(lang, 'book.ariaExternal') }).first();
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute('target', '_blank');
      await expect(cta).toHaveAttribute('rel', /noopener/);
      await expect(cta).toHaveAttribute('href', /^https?:\/\//);
    });
  }
}
