import { test, expect } from '@playwright/test';
import { locales, t, url } from './_helpers';

// US4 — location, directions, and a direct contact method are present, in each language (FR-009).
for (const { lang, base } of locales) {
  test(`location page presents location and contact (${lang})`, async ({ page }) => {
    await page.goto(url(base, '/location'));
    await expect(page.getByRole('heading', { level: 1, name: t(lang, 'loc.title') })).toBeVisible();
    await expect(page.getByText(t(lang, 'loc.gettingThere'))).toBeVisible();

    const email = page.locator('a[href^="mailto:"]').first();
    await expect(email).toBeVisible();
    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
  });
}

test('footer exposes contact details site-wide', async ({ page }) => {
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  await expect(footer.locator('a[href^="mailto:"]').first()).toBeVisible();
  await expect(footer.locator('a[href^="tel:"]').first()).toBeVisible();
});
