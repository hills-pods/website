import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// US1 — the home page must meet WCAG 2.1 AA (FR-013, SC-007).
test('home page has no detectable accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .analyze();
  expect(results.violations).toEqual([]);
});
