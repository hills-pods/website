// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// Static, content-driven site deployed to Vercel (see specs/001-bubble-hotel-website/plan.md).
export default defineConfig({
  // Drives canonical URLs and hreflang alternates in <head>. Set this to the
  // production URL — first deploys land on `<project>.vercel.app`; swap for
  // the custom domain once it's pointed at the project (Vercel → Settings →
  // Domains). SEO depends on this matching the URL users actually visit.
  // TODO(deploy): replace with the live Vercel URL or custom domain.
  site: 'https://hills-pods.vercel.app',
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
