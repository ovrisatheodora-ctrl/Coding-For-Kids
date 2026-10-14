const revealAnimations = new WeakMap();

export function scrollToHomeLessons() {
  const section = document.getElementById('lessons');
  if (!section) return false;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  section.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });

  const previousAnimation = revealAnimations.get(section);
  if (previousAnimation) {
    window.cancelAnimationFrame(previousAnimation.frame);
    window.clearTimeout(previousAnimation.timer);
    revealAnimations.delete(section);
  }

  section.classList.remove('is-revealing');
  if (!prefersReducedMotion) {
    const animation = { frame: 0, timer: 0 };
    animation.frame = window.requestAnimationFrame(() => {
      section.classList.add('is-revealing');
      animation.timer = window.setTimeout(() => {
        section.classList.remove('is-revealing');
        revealAnimations.delete(section);
      }, 1100);
    });
    revealAnimations.set(section, animation);
  }

  return true;
}
