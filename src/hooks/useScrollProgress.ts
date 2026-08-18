import { useEffect, useRef } from 'react';

export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const paint = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - bounds.top) / (bounds.height + window.innerHeight * 0.35)));
      const normalized = reducedMotion.matches ? 1 : progress;
      element.style.setProperty('--scene-progress', String(normalized));
      element.style.setProperty('--scene-wrap-y', `${(0.5 - normalized) * 10}vh`);
      element.style.setProperty('--scene-media-y', `${(0.5 - normalized) * 6}vh`);
      element.style.setProperty('--scene-media-scale', String(0.88 + normalized * 0.12));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return ref;
}
