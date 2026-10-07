import { useEffect } from 'react';

export function ThemeController() {
  useEffect(() => {
    const entries = new Map<Element, IntersectionObserverEntry>();
    const observed = new WeakSet<HTMLElement>();
    const sync = () => {
      const active = [...entries.values()]
        .filter((entry) => entry.isIntersecting && document.body.contains(entry.target))
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const theme = active ? (active.target as HTMLElement).dataset.scrollTheme ?? 'paper' : 'paper';
      if (document.documentElement.dataset.scrollTheme !== theme) document.documentElement.dataset.scrollTheme = theme;
    };
    const observer = new IntersectionObserver((nextEntries) => {
      nextEntries.forEach((entry) => entries.set(entry.target, entry));
      sync();
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] });
    const observeSections = () => {
      document.querySelectorAll<HTMLElement>('[data-scroll-theme]').forEach((section) => {
        if (observed.has(section)) return;
        observed.add(section);
        observer.observe(section);
      });
      sync();
    };
    const mutations = new MutationObserver(observeSections);
    mutations.observe(document.body, { childList: true, subtree: true });
    observeSections();
    return () => {
      mutations.disconnect();
      observer.disconnect();
      delete document.documentElement.dataset.scrollTheme;
    };
  }, []);

  return null;
}
