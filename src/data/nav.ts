import type { UIKey } from '@/i18n/ui';

// Shared primary navigation — canonical (default-language) paths + translation keys.
// Header, MobileNav, and Footer localize labels via the dictionary and hrefs via localizeHref.
export interface NavLink {
  href: string;
  key: UIKey;
}

export const navLinks: NavLink[] = [
  { href: '/', key: 'nav.home' },
  { href: '/accommodations', key: 'nav.suites' },
  { href: '/experiences', key: 'nav.experiences' },
  { href: '/gallery', key: 'nav.gallery' },
  { href: '/location', key: 'nav.location' },
];
