import { test, expect } from '@playwright/test';

// US2 — guests browse suites and open a detail page (FR-002).
test.describe('Accommodations', () => {
  test('lists suites and navigates to a detail page', async ({ page }) => {
    await page.goto('/accommodations');
    await expect(page.getByRole('heading', { name: /choose your bubble/i })).toBeVisible();

    await page.getByRole('link', { name: /the aurora/i }).click();
    await expect(page).toHaveURL(/\/accommodations\/aurora/);
    await expect(page.getByRole('heading', { level: 1, name: /the aurora/i })).toBeVisible();
    await expect(page.getByText('Features')).toBeVisible();
    await expect(page.getByText('Included')).toBeVisible();
  });

  test('shows an unavailable state for sold-out suites', async ({ page }) => {
    await page.goto('/accommodations');
    // The Summit is marked unavailable in content.
    await expect(page.getByText(/currently unavailable/i).first()).toBeVisible();
  });
});
