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
  /** Optional external map link (language-neutral). */
  mapUrl?: string;
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
  mapUrl: 'https://maps.example/?q=bubble-hotel',
  ogImage: '/og-default.jpg',
};
