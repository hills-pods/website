import { ui, defaultLang, type Lang, type UIKey } from './ui';

/** Derive the active language from a URL: `/en/...` is English, everything else is Ukrainian. */
export function getLangFromUrl(url: URL): Lang {
  const segments = url.pathname.split('/').filter(Boolean);
  return segments[0] === 'en' ? 'en' : 'uk';
}

/** Returns a translator bound to a language, falling back to the default language's string. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Build a localized href from a canonical path (the Ukrainian/default path, e.g. `/gallery`).
 * Ukrainian (default) has no prefix; English is served under `/en`.
 */
export function localizeHref(canonicalPath: string, lang: Lang): string {
  const path = canonicalPath === '' ? '/' : canonicalPath;
  if (lang === 'en') {
    return path === '/' ? '/en/' : `/en${path}`;
  }
  return path;
}

/** Strip any `/en` prefix from a pathname to get the canonical (default-language) path. */
export function toCanonicalPath(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3); // remove '/en'
  return pathname || '/';
}

/** Given the current pathname, return the equivalent page's URL in the target language. */
export function getAlternateUrl(pathname: string, targetLang: Lang): string {
  return localizeHref(toCanonicalPath(pathname), targetLang);
}

/**
 * Content entry slugs include the language folder (e.g. `en/aurora`). The base slug
 * (`aurora`) is the shared key used in routes and to map equivalents across languages.
 */
export function baseSlug(entrySlug: string): string {
  return entrySlug.split('/').pop() ?? entrySlug;
}
