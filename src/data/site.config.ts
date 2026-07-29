// Single source of truth for non-localized site-wide values (data-model.md).
// Localized text (tagline, descriptions, SEO copy) lives in src/i18n/ui.ts.
// A typed config means a misconfiguration fails the build, not production (Principle I).

export interface SiteConfig {
  // Brand name is localized (uk: «Вершини Світу», en: "World Peaks") and lives
  // in src/i18n/ui.ts under the 'brand.name' key — read it via useTranslations.
  /**
   * Embedded booking widget. When set, "Book Now" routes to the in-page /book
   * page that hosts the widget. When `null`, the resolver falls through to
   * `bookingUrl` (external) or the contact email (enquiry) — guests are never
   * stranded (FR-008).
   */
  easyMs: { moduleKey: string } | null;
  /**
   * External booking provider URL. Used as the silent fallback on /book when
   * the embedded widget fails to load, and as the primary target when no
   * embedded widget is configured.
   *
   * Set to `null` to use the contact-email fallback instead.
   */
  bookingUrl: string | null;
  contact: {
    email: string;
    phone: string;
    /**
     * Social handles linked from the footer. Each is a full URL — keeps the
     * footer template agnostic about handle vs. username vs. full URL. Set to
     * an empty string to hide the icon (rendered conditionally).
     */
    social: {
      instagram: string;
      telegram: string;
    };
  };
  /**
   * Legal-entity requisites, published in full on /legal and (name only) in the
   * footer to satisfy WayForPay's merchant-disclosure requirement. These are
   * placeholders — replace every [ЗАПОВНИТИ] before connecting the processor.
   */
  legal: {
    /** Full legal name — «ФОП Прізвище Ім'я По батькові» or «ТОВ "…"». */
    entityName: string;
    /** Tax ID — ІПН (ФОП) or ЄДРПОУ (ТОВ). */
    taxId: string;
    /** Registered (legal) address. */
    addressLegal: string;
    /** Actual operating address. */
    addressActual: string;
    /** Optional IBAN / bank line for the offer; empty string hides the row. */
    bank?: string;
  };
  /**
   * Latitude / longitude of the property. Used as the fallback when `mapUrl`
   * or `mapEmbedUrl` are unset — derives an OpenStreetMap link/embed from
   * these coordinates. Also handy if you want to wire up distance/weather
   * widgets later.
   */
  coordinates: { lat: number; lon: number };
  /**
   * Optional override for the outbound "Open in maps" link. When unset, the
   * link derives from `coordinates` and opens OpenStreetMap. Set this if you
   * want users to land in a specific Google Maps / Apple Maps place page.
   */
  mapUrl?: string;
  /**
   * Optional override for the embedded map widget on the Location page. When
   * unset, the embed derives from `coordinates` and uses OpenStreetMap. To
   * use Google Maps, paste the `src` from the iframe you get from
   * https://www.google.com/maps → Share → Embed a map.
   */
  mapEmbedUrl?: string;
  /** Default social-share preview image (language-neutral asset). */
  ogImage: string;
}

export const site: SiteConfig = {
  // Embedded reservation widget — when set, /book hosts it and "Book Now"
  // routes there instead of an external provider. The bookingUrl below stays
  // as a silent fallback shown on /book when the widget fails to load.
  easyMs: { moduleKey: 'c8df41e1-35b4-4563-a300-b2e9e0512107' },
  // Placeholder external provider — used as the on-page fallback only.
  bookingUrl: 'https://reservations.worldpeaks.example',
  contact: {
    email: 'stay@worldpeaks.example',
    phone: '+38 073 277 55 73',
    // TODO(social): replace placeholders with real handles. Setting either to
    // an empty string hides that icon (Footer renders conditionally).
    social: {
      instagram: 'https://instagram.com/vershyny_svitu',
      telegram: 'https://t.me/your-handle',
    },
  },
  legal: {
    entityName: "[ЗАПОВНИТИ: повне найменування — ФОП … або ТОВ «…»]",
    taxId: '[ЗАПОВНИТИ: ІПН (ФОП) або ЄДРПОУ (ТОВ)]',
    addressLegal: '[ЗАПОВНИТИ: юридична адреса]',
    addressActual: '[ЗАПОВНИТИ: фактична адреса]',
    bank: '',
  },
  coordinates: { lat: 48.596151, lon: 23.407029 },
  mapUrl: 'https://www.google.com/maps/search/Mandra+Hills/@48.596151,23.407029,15z',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3519.893959191376!2d23.40702858974402!3d48.596151491974965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4739e94c638bb5f3%3A0x218c6ed291e8eb08!2sMandra%20Hills!5e1!3m2!1sen!2ses!4v1779884811903!5m2!1sen!2ses',
  ogImage: '/og-default.jpg',
};
