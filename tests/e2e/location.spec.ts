import { test, expect } from '@playwright/test';
import { locales, t, url } from './_helpers';

// US4 — location, directions, and direct contact methods are present, in each
// language (FR-009). Contact = phone link + social icons (Instagram + Telegram).
// The email-as-CTA pattern is now reserved for the booking-fallback / mailto:
// resolver path; the /location and footer surfaces lead with phone + socials.
for (const { lang, base } of locales) {
  test(`location page presents location and contact (${lang})`, async ({ page }) => {
    await page.goto(url(base, '/location'));
    await expect(page.getByRole('heading', { level: 1, name: t(lang, 'loc.title') })).toBeVisible();
    await expect(page.getByText(t(lang, 'loc.gettingThere'))).toBeVisible();

    // Phone link is still in the contact column.
    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
    // Social icon row is present and labeled. The aria-label localizes,
    // so we match the list by its translated label.
    const socialList = page.getByRole('list', { name: t(lang, 'social.label') }).first();
    await expect(socialList).toBeVisible();
    await expect(
      socialList.getByRole('link', { name: t(lang, 'social.instagram') }),
    ).toBeVisible();
    await expect(
      socialList.getByRole('link', { name: t(lang, 'social.telegram') }),
    ).toBeVisible();
  });
}

test('footer exposes contact details site-wide', async ({ page }) => {
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  // Footer leads with phone + the same socials as the location page.
  await expect(footer.locator('a[href^="tel:"]').first()).toBeVisible();
  const footerSocials = footer.getByRole('list', { name: t('uk', 'social.label') }).first();
  await expect(footerSocials).toBeVisible();
});
