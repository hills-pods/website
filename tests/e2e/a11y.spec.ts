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
];

for (const { lang, base } of locales) {
  for (const canonical of canonicalPages) {
    test(`no accessibility violations: ${url(base, canonical)} (${lang})`, async ({ page }) => {
      await page.goto(url(base, canonical));
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
