import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// US4 — location page meets WCAG 2.1 AA (FR-013).
test('location page has no detectable accessibility violations', async ({ page }) => {
  await page.goto('/location');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .analyze();
  expect(results.violations).toEqual([]);
});
