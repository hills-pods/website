// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Static, content-driven site deployed to Vercel (see specs/001-bubble-hotel-website/plan.md).
export default defineConfig({
  site: 'https://bubble-hotel.example',
  // Bilingual: Ukrainian is the default at the root; English is served under /en/.
  i18n: {
    locales: ['uk', 'en'],
    defaultLocale: 'uk',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [tailwind()],
  image: {
    // Allow Astro's built-in Sharp service for responsive image optimization.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
