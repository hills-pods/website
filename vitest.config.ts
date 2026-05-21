/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.{test,spec}.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Scope to pure, unit-testable logic. Astro components are covered by e2e tests,
      // and config/content files are declarative (and import Astro virtual modules that
      // do not resolve in Vitest's node environment).
      include: ['src/lib/**/*.ts'],
      // Constitution Quality Gate: coverage must not decrease.
      // CI fails the build if any metric drops below these thresholds.
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
