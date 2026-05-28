// Progressive enhancement for any [data-carousel] block on the page. Wires prev/next
// buttons to scroll the snap track by ~one viewport, and toggles their disabled state
// at either end. Module-imported by SuiteCarousel and ReviewCarousel — the JS module
// system dedupes the import, so the body runs once even when both components render.

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
  if (!track || !prev || !next) return;

  const step = () => track.clientWidth * 0.8;
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= max;
  };

  prev.hidden = false;
  next.hidden = false;
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});
