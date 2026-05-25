import { test, expect } from '@playwright/test';
import { locales, t, url } from './_helpers';

// US2 — experiences and gallery render; gallery images lazy-load (FR-003, FR-004, FR-012).
for (const { lang, base } of locales) {
  test(`experiences page renders (${lang})`, async ({ page }) => {
    await page.goto(url(base, '/experiences'));
    await expect(page.getByRole('heading', { level: 1, name: t(lang, 'exp.title') })).toBeVisible();
  });

  test(`gallery renders lazy-loaded images (${lang})`, async ({ page }) => {
    await page.goto(url(base, '/gallery'));
    await expect(
      page.getByRole('heading', { level: 1, name: t(lang, 'gallery.title') }),
    ).toBeVisible();
    expect(await page.locator('img[loading="lazy"]').count()).toBeGreaterThan(0);
  });
}
