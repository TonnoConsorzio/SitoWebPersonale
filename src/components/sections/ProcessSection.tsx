import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollUnderline } from '../ScrollUnderline';
import { useHomeCopy } from '../../hooks/useHomeCopy';
import { ArrowUpRight } from 'lucide-react';

export function ProcessSection() {
  const copy = useHomeCopy().process;
  const steps = copy.steps;
  const sectionRef = useRef<HTMLElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const paintProgress = (progress: number) => {
      const path = progressPathRef.current;
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length * (1 - progress));
      }
      section.style.setProperty('--process-progress', progress.toFixed(3));
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) {
      paintProgress(1);
      setActive(3);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    paintProgress(0);
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        paintProgress(self.progress);
        const next = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        setActive((current) => current === next ? current : next);
      }
    });
    ScrollTrigger.refresh();
    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} id="processo" data-scroll-theme="dark" className="scene scene--process" aria-labelledby="processo-title">
      <div className="scene__container process-scene__layout">
        <div className="process-scene__intro">
          <h2 id="processo-title"><span className="process-heading__line"><ScrollUnderline>{copy.titleEmphasisA}</ScrollUnderline> {copy.titleMiddle}</span><span className="process-heading__line">{copy.titleB} <ScrollUnderline>{copy.titleEmphasisB}</ScrollUnderline></span></h2>
        </div>
        <ol className="process-scene__steps">
          <svg className="process-scene__path" viewBox="0 0 56 800" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className="process-scene__path--base" pathLength="1" d="M28 40V760" />
            <path ref={progressPathRef} className="process-scene__path--progress" d="M28 40V760" />
          </svg>
          {steps.map(([number, title, description], index) => (
            <li key={number} className={`process-step ${active === index ? 'is-active' : ''} ${active > index ? 'is-complete' : ''}`}>
              <span className="process-step__number">{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
          <li className="process-scene__footer"><p>{copy.footer}</p><a href="#contatti" className="text-link text-link--light">{copy.book} <ArrowUpRight size={16} aria-hidden="true" /></a></li>
        </ol>
      </div>
    </section>
  );
}
