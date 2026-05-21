import { test, expect } from '@playwright/test';

// US4 — location, directions, and a direct contact method are present and reachable (FR-009).
test('location page presents location, directions, and contact', async ({ page }) => {
  await page.goto('/location');
  await expect(page.getByRole('heading', { name: /finding the mountain/i })).toBeVisible();
  await expect(page.getByText(/getting there/i)).toBeVisible();

  // A direct contact method is reachable (email link).
  const email = page.getByRole('link', { name: /@/ }).first();
  await expect(email).toBeVisible();
  await expect(email).toHaveAttribute('href', /^mailto:/);

  // A phone link is present.
  await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
});

test('footer exposes contact details site-wide', async ({ page }) => {
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  await expect(footer.locator('a[href^="mailto:"]').first()).toBeVisible();
  await expect(footer.locator('a[href^="tel:"]').first()).toBeVisible();
});
