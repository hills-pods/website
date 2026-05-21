import { describe, it, expect } from 'vitest';
import { resolveBookingTarget } from '../../src/lib/booking';

// US3 — both booking branches (FR-006 external handoff, FR-008 contact fallback).
describe('resolveBookingTarget', () => {
  it('hands off to the external provider when a booking URL is configured', () => {
    const target = resolveBookingTarget({
      bookingUrl: 'https://book.example',
      contactEmail: 'stay@bubble.example',
    });
    expect(target).toEqual({ href: 'https://book.example', external: true });
  });

  it('falls back to the contact email when the booking URL is null', () => {
    const target = resolveBookingTarget({
      bookingUrl: null,
      contactEmail: 'stay@bubble.example',
    });
    expect(target).toEqual({ href: 'mailto:stay@bubble.example', external: false });
  });

  it('treats an empty or whitespace URL as unconfigured and falls back', () => {
    const target = resolveBookingTarget({
      bookingUrl: '   ',
      contactEmail: 'stay@bubble.example',
    });
    expect(target.external).toBe(false);
    expect(target.href).toBe('mailto:stay@bubble.example');
  });
});
