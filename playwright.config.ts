import { defineConfig, devices } from '@playwright/test';

// E2E + responsive checks. The site is static, so Playwright builds and previews it.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  // Test the real production output across mobile, tablet, and desktop (FR-010).
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    // Tablet viewport on the Chromium engine (single-engine CI keeps it fast).
    {
      name: 'tablet',
      use: { browserName: 'chromium', viewport: { width: 834, height: 1112 } },
    },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
