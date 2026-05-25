import { test, expect } from '@playwright/test';
import { t } from './_helpers';

// US5 — Ukrainian default, header switcher, stay on the same page, alternates (FR-016..FR-021).
test('root is Ukrainian by default', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
});

test('switching to English keeps you on the same page', async ({ page }) => {
  await page.goto('/accommodations');
  await page.getByRole('link', { name: 'English' }).first().click();
  await expect(page).toHaveURL(/\/en\/accommodations\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1, name: t('en', 'acc.title') })).toBeVisible();
});

test('switching back to Ukrainian returns to the same page', async ({ page }) => {
  await page.goto('/en/gallery');
  await page.getByRole('link', { name: 'Українська' }).first().click();
  await expect(page).toHaveURL(/(?<!\/en)\/gallery\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await expect(
    page.getByRole('heading', { level: 1, name: t('uk', 'gallery.title') }),
  ).toBeVisible();
});

test('pages declare hreflang alternates for both languages', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="alternate"][hreflang="uk"]')).toHaveCount(1);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
});
