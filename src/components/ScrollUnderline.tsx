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
      <svg className="scroll-underline__line" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M1 6.4C17 4.2 30 7.2 48 5.8S77 4.8 99 5.9" pathLength="1" />
      </svg>
    </span>
  );
}
