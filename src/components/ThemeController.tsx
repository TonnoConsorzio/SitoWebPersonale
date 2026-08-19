import { useEffect } from 'react';

export function ThemeController() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-theme]'))
        .filter((section) => section !== document.documentElement);
      if (!sections.length) {
        if (document.documentElement.dataset.scrollTheme !== 'paper') document.documentElement.dataset.scrollTheme = 'paper';
        return;
      }
      const pivot = Math.min(window.innerHeight * 0.35, 360);
      const active = sections
        .filter((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= pivot && bounds.bottom > pivot;
        })
        .at(-1) ?? sections.find((section) => section.getBoundingClientRect().bottom > 0) ?? sections[0];
      const theme = active.dataset.scrollTheme ?? 'paper';
      if (document.documentElement.dataset.scrollTheme !== theme) document.documentElement.dataset.scrollTheme = theme;
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      delete document.documentElement.dataset.scrollTheme;
    };
  }, []);

  return null;
}
