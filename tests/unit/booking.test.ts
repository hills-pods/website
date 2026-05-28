import { describe, it, expect } from 'vitest';
import { resolveBookingTarget, resolveBookingFallback } from '../../src/lib/booking';

// US3 — all three branches:
//   FR-006a embedded widget (internal /book), FR-006b external handoff,
//   FR-008  contact-email fallback.
describe('resolveBookingTarget', () => {
  it('routes to the in-page /book screen when an embedded widget is configured', () => {
    const target = resolveBookingTarget({
      hasEmbeddedWidget: true,
      bookingUrl: 'https://book.example',
      contactEmail: 'stay@bubble.example',
    });
    expect(target).toEqual({ href: '/book', kind: 'internal' });
  });

  it('hands off to the external provider when no widget but a booking URL is set', () => {
    const target = resolveBookingTarget({
      hasEmbeddedWidget: false,
      bookingUrl: 'https://book.example',
      contactEmail: 'stay@bubble.example',
    });
    expect(target).toEqual({ href: 'https://book.example', kind: 'external' });
  });

  it('falls back to the contact email when neither widget nor URL is configured', () => {
    const target = resolveBookingTarget({
      hasEmbeddedWidget: false,
      bookingUrl: null,
      contactEmail: 'stay@bubble.example',
    });
    expect(target).toEqual({ href: 'mailto:stay@bubble.example', kind: 'enquiry' });
  });

  it('treats an empty or whitespace URL as unconfigured and falls back', () => {
    const target = resolveBookingTarget({
      hasEmbeddedWidget: false,
      bookingUrl: '   ',
      contactEmail: 'stay@bubble.example',
    });
    expect(target).toEqual({ href: 'mailto:stay@bubble.example', kind: 'enquiry' });
  });

  it('prefers the embedded widget over an external URL when both are set', () => {
    // Widget takes precedence — bookingUrl becomes the on-page fallback instead.
    const target = resolveBookingTarget({
      hasEmbeddedWidget: true,
      bookingUrl: 'https://book.example',
      contactEmail: 'stay@bubble.example',
    });
    expect(target.kind).toBe('internal');
  });
});

// The /book page renders a "what to do if the widget breaks" panel using this.
// It must always return either an external provider or a mailto — never internal.
describe('resolveBookingFallback', () => {
  it('returns the external provider when a booking URL is configured', () => {
    const fallback = resolveBookingFallback({
      bookingUrl: 'https://book.example',
      contactEmail: 'stay@bubble.example',
    });
    expect(fallback).toEqual({ href: 'https://book.example', kind: 'external' });
  });

  it('returns the contact mailto when no booking URL is configured', () => {
    const fallback = resolveBookingFallback({
      bookingUrl: null,
      contactEmail: 'stay@bubble.example',
    });
    expect(fallback).toEqual({ href: 'mailto:stay@bubble.example', kind: 'enquiry' });
  });

  it('never returns an internal target (would defeat the fallback)', () => {
    const fallback = resolveBookingFallback({
      bookingUrl: 'https://book.example',
      contactEmail: 'stay@bubble.example',
    });
    expect(fallback.kind).not.toBe('internal');
  });
});
