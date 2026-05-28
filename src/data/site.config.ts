// Single source of truth for non-localized site-wide values (data-model.md).
// Localized text (tagline, descriptions, SEO copy) lives in src/i18n/ui.ts.
// A typed config means a misconfiguration fails the build, not production (Principle I).

export interface SiteConfig {
  brandName: string;
  /**
   * External booking provider URL. When set, "Book Now" hands off to it (FR-006).
   * When `null`, "Book Now" falls back to the contact method (FR-008).
   *
   * TODO(booking-provider): replace the placeholder below with the hotel's real
   * booking provider URL before launch, or set to `null` to use the contact fallback.
   */
  bookingUrl: string | null;
  contact: {
    email: string;
    phone: string;
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
  brandName: 'Bubble',
  // Placeholder until the real provider is supplied (see TODO above).
  bookingUrl: 'https://reservations.bubblehotel.example',
  contact: {
    email: 'stay@bubblehotel.example',
    phone: '+1 (555) 014-2200',
  },
  coordinates: { lat: 48.596151, lon: 23.407029 },
  mapUrl: 'https://www.google.com/maps/search/Mandra+Hills/@48.596151,23.407029,15z',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3519.893959191376!2d23.40702858974402!3d48.596151491974965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4739e94c638bb5f3%3A0x218c6ed291e8eb08!2sMandra%20Hills!5e1!3m2!1sen!2ses!4v1779884811903!5m2!1sen!2ses',
  ogImage: '/og-default.jpg',
};
