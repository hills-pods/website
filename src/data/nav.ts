// Shared primary navigation — single source so Header and MobileNav never drift.
export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/accommodations', label: 'Suites' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/location', label: 'Location' },
];
