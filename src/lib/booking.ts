// Pure, unit-testable resolution of the "Book Now" target (FR-006/007/008).
// Centralizing this keeps the CTA behavior consistent and verifiable.

export interface BookingConfigInput {
  bookingUrl: string | null;
  contactEmail: string;
}

export interface BookingTarget {
  href: string;
  /** true → external booking provider (open in new tab, label as external). */
  external: boolean;
}

/**
 * Returns the destination for a "Book Now" action.
 * - If a non-empty booking URL is configured → hand off to the external provider.
 * - Otherwise → fall back to the contact method so guests are never stranded (FR-008).
 */
export function resolveBookingTarget(input: BookingConfigInput): BookingTarget {
  const url = input.bookingUrl?.trim();
  if (url) {
    return { href: url, external: true };
  }
  return { href: `mailto:${input.contactEmail}`, external: false };
}
