// Pure, unit-testable resolution of the "Book Now" target (FR-006/007/008).
// Centralizing this keeps the CTA behavior consistent and verifiable.
//
// Resolution order:
//   1. Embedded widget configured → route to the in-page /book screen ('internal').
//   2. External booking provider URL → hand off to it in a new tab ('external').
//   3. Neither → fall back to a contact mailto so guests are never stranded ('enquiry').

export interface BookingConfigInput {
  /** True if the site hosts an in-page booking widget (e.g. EasyMS module). */
  hasEmbeddedWidget: boolean;
  bookingUrl: string | null;
  contactEmail: string;
}

export interface BookingTarget {
  /** 'internal' is a canonical site path (caller must localize via localizeHref). */
  href: string;
  kind: 'internal' | 'external' | 'enquiry';
}

/** Where the persistent "Book Now" CTA should send the guest. */
export function resolveBookingTarget(input: BookingConfigInput): BookingTarget {
  if (input.hasEmbeddedWidget) {
    return { href: '/book', kind: 'internal' };
  }
  const url = input.bookingUrl?.trim();
  if (url) {
    return { href: url, kind: 'external' };
  }
  return { href: `mailto:${input.contactEmail}`, kind: 'enquiry' };
}

/**
 * The booking-page fallback target: what the user would get if the embedded
 * widget didn't exist. Always 'external' (when a provider URL is configured)
 * or 'enquiry' (mailto). Used by the /book page's "alternative ways to book"
 * panel — the silent safety net for guests whose browsers block the widget.
 */
export function resolveBookingFallback(
  input: Omit<BookingConfigInput, 'hasEmbeddedWidget'>,
): BookingTarget {
  return resolveBookingTarget({ ...input, hasEmbeddedWidget: false });
}
