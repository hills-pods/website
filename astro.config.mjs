// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// Static, content-driven site deployed to Vercel (see specs/001-bubble-hotel-website/plan.md).
export default defineConfig({
  // Drives canonical URLs and hreflang alternates in <head>. Must match the URL
  // users actually visit, or SEO/OG/canonical tags point at the wrong host.
  site: 'https://worldpeaks.com.ua',
  // Bilingual: Ukrainian is the default at the root; English is served under /en/.
  i18n: {
    locales: ['uk', 'en'],
    defaultLocale: 'uk',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind(),
    // Inline SVG brand icons at build time from the Simple Icons set
    // (Instagram, Telegram) — no runtime JS, no icon-font request.
    icon({ include: { 'simple-icons': ['instagram', 'telegram'] } }),
  ],
  image: {
    // Allow Astro's built-in Sharp service for responsive image optimization.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
