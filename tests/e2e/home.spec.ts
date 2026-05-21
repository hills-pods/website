import { test, expect } from '@playwright/test';

// US1 — a first-time visitor is captivated above the fold, on every device (FR-001, FR-010).
test.describe('Home page', () => {
  test('communicates the experience above the fold', async ({ page }) => {
    await page.goto('/');

    // Eyebrow + headline convey what and where without interaction.
    await expect(page.getByText('A luxury bubble hotel in the mountains')).toBeVisible();
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/mountain|stars/i);
  });

  test('exposes a reachable Book Now call-to-action', async ({ page }) => {
    await page.goto('/');
    // At least one Book Now CTA is present and reachable (FR-005).
    const cta = page.getByRole('link', { name: /book now/i });
    await expect(cta.first()).toBeVisible();
  });

  test('renders the narrative sections (suites and experiences)', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /sleep under the sky/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /memorable as the nights/i })).toBeVisible();
    // Featured suites link through to detail pages.
    await expect(page.getByRole('link', { name: /the aurora/i })).toBeVisible();
  });
});
