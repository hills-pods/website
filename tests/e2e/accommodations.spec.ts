import { test, expect } from '@playwright/test';
import { locales, t, url } from './_helpers';

// US2 — browse suites and open a detail page, in each language (FR-002).
for (const { lang, base } of locales) {
  test.describe(`Accommodations (${lang})`, () => {
    test('lists suites and navigates to a detail page', async ({ page }) => {
      await page.goto(url(base, '/accommodations'));
      await expect(
        page.getByRole('heading', { level: 1, name: t(lang, 'acc.title') }),
      ).toBeVisible();

      // First suite by order is Hoverla; its base slug is stable across languages.
      await page.locator('article a').first().click();
      await expect(page).toHaveURL(new RegExp(`${base}/accommodations/hoverla`));

      // Detail page is image-led — hero + gallery photos (no body, no features list).
      // Hero contributes one <img>; the gallery contributes the rest. Assert >1 to
      // confirm both rendered without depending on the exact per-suite photo count.
      expect(await page.locator('main img').count()).toBeGreaterThan(1);
    });

    // Unavailable-state assertion intentionally omitted: all suites currently render
    // `available: true`. SuiteCard/SuiteRow still render the `card.unavailable` badge
    // automatically when any suite's frontmatter flips back to `false`.

    test('lists all five suites as full-width alternating rows', async ({ page }) => {
      await page.goto(url(base, '/accommodations'));
      const rows = page.getByRole('region', { name: t(lang, 'acc.srHeading') }).locator('article');
      await expect(rows).toHaveCount(5);
      // Alternating layout: indices 1 and 3 are reversed; 0, 2, 4 are not.
      await expect(rows.nth(0)).not.toHaveClass(/lg:flex-row-reverse/);
      await expect(rows.nth(1)).toHaveClass(/lg:flex-row-reverse/);
      await expect(rows.nth(2)).not.toHaveClass(/lg:flex-row-reverse/);
      await expect(rows.nth(3)).toHaveClass(/lg:flex-row-reverse/);
      await expect(rows.nth(4)).not.toHaveClass(/lg:flex-row-reverse/);
    });
  });
}
