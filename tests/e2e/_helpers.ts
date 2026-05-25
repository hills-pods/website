import { ui, type Lang } from '../../src/i18n/ui';

export interface LocaleCase {
  lang: Lang;
  /** URL prefix: '' for Ukrainian (default, at root), '/en' for English. */
  base: string;
}

export const locales: LocaleCase[] = [
  { lang: 'uk', base: '' },
  { lang: 'en', base: '/en' },
];

/** Translate a key for a language (uses the same dictionary the site renders from). */
export function t(lang: Lang, key: keyof (typeof ui)['en']): string {
  return ui[lang][key];
}

/** Build a full URL for a canonical path (e.g. '/accommodations') in a given locale. */
export function url(base: string, canonical: string): string {
  if (canonical === '/') return base === '' ? '/' : `${base}/`;
  return `${base}${canonical}`;
}
