import { test, expect } from '@playwright/test';

// US2 — experiences and gallery render; gallery images are lazy-loaded (FR-003, FR-004, FR-012).
test('experiences page renders signature experiences', async ({ page }) => {
  await page.goto('/experiences');
  await expect(page.getByRole('heading', { name: /rituals of a mountain stay/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /guided stargazing/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /mountain table/i })).toBeVisible();
});

test('gallery renders images that lazy-load', async ({ page }) => {
  await page.goto('/gallery');
  await expect(page.getByRole('heading', { name: /a glimpse of the stay/i })).toBeVisible();
  const images = page.locator('img');
  await expect(images.first()).toBeVisible();
  // At least one gallery image defers loading (graceful on slow connections).
  expect(await page.locator('img[loading="lazy"]').count()).toBeGreaterThan(0);
});
