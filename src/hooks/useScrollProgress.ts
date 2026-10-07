import { useEffect, useRef } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';

function paintProgress(element: HTMLElement, progress: number) {
  element.style.setProperty('--scene-progress', String(progress));
  element.style.setProperty('--scene-wrap-y', `${(0.5 - progress) * 10}vh`);
  element.style.setProperty('--scene-media-y', `${(0.5 - progress) * 6}vh`);
  element.style.setProperty('--scene-media-scale', String(1.035 + progress * 0.025));
}

export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const element = ref.current;
    if (!element) return;
    paintProgress(element, reducedMotion ? 1 : value);
  });

  useEffect(() => {
    if (ref.current) paintProgress(ref.current, reducedMotion ? 1 : scrollYProgress.get());
  }, [reducedMotion, scrollYProgress]);

  return ref;
}
