// Single source of truth for site-wide values (data-model.md).
// A typed config means a misconfiguration fails the build, not production (Principle I).

export interface SiteConfig {
  brandName: string;
  tagline: string;
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
  location: {
    description: string;
    directions: string;
    mapUrl?: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
  };
}

export const site: SiteConfig = {
  brandName: 'Bubble',
  tagline: 'Sleep beneath the stars, wrapped in mountain quiet.',
  // Placeholder until the real provider is supplied (see TODO above).
  bookingUrl: 'https://reservations.bubblehotel.example',
  contact: {
    email: 'stay@bubblehotel.example',
    phone: '+1 (555) 014-2200',
  },
  location: {
    description:
      'Tucked into a high alpine meadow above the treeline, a winding hour from the valley town.',
    directions:
      'From the valley, follow the mountain road to the trailhead car park; a private transfer carries you the final ascent.',
    mapUrl: 'https://maps.example/?q=bubble-hotel',
  },
  seo: {
    defaultTitle: 'Bubble — A Luxury Bubble Hotel in the Mountains',
    defaultDescription:
      'Transparent bubble suites under alpine skies. A rare, luxurious escape in the mountains.',
    ogImage: '/og-default.jpg',
  },
};
