import { test, expect } from '@playwright/test';

// US3 — "Book Now" is reachable on every page and hands off to the external provider
// in a new tab, with clear external-site labeling (FR-005/006/007).
const paths = ['/', '/accommodations', '/experiences', '/gallery', '/location'];

for (const path of paths) {
  test(`Book Now is reachable and hands off externally on ${path}`, async ({ page }) => {
    await page.goto(path);
    const cta = page.getByRole('link', { name: /book now/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('target', '_blank');
    await expect(cta).toHaveAttribute('rel', /noopener/);
    await expect(cta).toHaveAttribute('href', /^https?:\/\//);
    // Labeled as leaving the site (accessible name mentions a new tab).
    await expect(cta).toHaveAttribute('aria-label', /new tab/i);
  });
}

test('external handoff includes a screen-reader explanation', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByText(/opens an external booking site in a new tab/i).first(),
  ).toBeAttached();
});
