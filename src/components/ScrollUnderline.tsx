import { type ReactNode, useEffect, useRef, useState } from 'react';

type ScrollUnderlineProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollUnderline({ children, className = '' }: ScrollUnderlineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { rootMargin: '0px 0px -18% 0px', threshold: 0.5 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
      <span ref={ref} className={`scroll-underline ${visible ? 'is-visible' : ''} ${className}`.trim()}>
        <span className="scroll-underline__text">{children}</span>
        <span className="scroll-underline__line" aria-hidden="true" />
      </span>
  );
}
