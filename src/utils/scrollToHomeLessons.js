const revealTimers = new WeakMap();

export function scrollToHomeLessons() {
  const section = document.getElementById('lessons');
  if (!section) return false;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  const previousTimer = revealTimers.get(section);
  if (previousTimer) {
    window.clearTimeout(previousTimer);
    revealTimers.delete(section);
  }

  section.classList.remove('is-revealing');
  if (!prefersReducedMotion) {
    void section.offsetWidth;
    section.classList.add('is-revealing');
    const timer = window.setTimeout(() => {
      section.classList.remove('is-revealing');
      revealTimers.delete(section);
    }, 1100);
    revealTimers.set(section, timer);
  }

  section.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });

  return true;
}
