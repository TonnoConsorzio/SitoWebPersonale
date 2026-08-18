import { useEffect } from 'react';

export function ThemeController() {
  useEffect(() => {
    const update = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-theme]'))
        .filter((section) => section !== document.documentElement);
      if (!sections.length) return;
      const pivot = Math.min(window.innerHeight * 0.35, 360);
      const active = sections
        .filter((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= pivot && bounds.bottom > pivot;
        })
        .at(-1) ?? sections.find((section) => section.getBoundingClientRect().bottom > 0) ?? sections[0];
      document.documentElement.dataset.scrollTheme = active.dataset.scrollTheme ?? 'paper';
      document.documentElement.dataset.threadStage = active.dataset.threadStage ?? 'none';
    };
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    const interval = window.setInterval(update, 120);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.clearInterval(interval);
      delete document.documentElement.dataset.scrollTheme;
        delete document.documentElement.dataset.threadStage;
        delete document.documentElement.dataset.threadSubstage;
    };
  }, []);

  return null;
}
