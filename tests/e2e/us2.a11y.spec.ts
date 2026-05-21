import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// US2 — accommodations, experiences, gallery, and a suite detail meet WCAG 2.1 AA (FR-013).
const paths = ['/accommodations', '/accommodations/aurora', '/experiences', '/gallery'];

for (const path of paths) {
  test(`no accessibility violations: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
