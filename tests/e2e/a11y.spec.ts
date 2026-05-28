import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { locales, url } from './_helpers';

// WCAG 2.1 AA + best-practice across all primary pages in both languages (FR-013, SC-007).
const canonicalPages = [
  '/',
  '/accommodations',
  '/accommodations/hoverla',
  '/experiences',
  '/gallery',
  '/location',
  '/book',
];

for (const { lang, base } of locales) {
  for (const canonical of canonicalPages) {
    test(`no accessibility violations: ${url(base, canonical)} (${lang})`, async ({ page }) => {
      await page.goto(url(base, canonical));
      let builder = new AxeBuilder({ page }).withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'best-practice',
      ]);
      // The EasyMS widget is third-party DOM injected by a vendor script —
      // its internal a11y isn't ours to audit. Our own page chrome (header,
      // intro, fallback panel) still gets the full sweep.
      if (canonical === '/book') {
        builder = builder.exclude('#easyms-reservation-module');
      }
      const results = await builder.analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
