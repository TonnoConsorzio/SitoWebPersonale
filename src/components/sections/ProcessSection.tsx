import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollUnderline } from '../ScrollUnderline';
import { useHomeCopy } from '../../hooks/useHomeCopy';
import { ArrowUpRight } from 'lucide-react';

export function ProcessSection() {
  const copy = useHomeCopy().process;
  const steps = copy.steps;
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const progressPathRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);
  const [nodeY, setNodeY] = useState(() => steps.map((_, index) => 80 + index * 280));

  useLayoutEffect(() => {
    const list = stepsRef.current;
    if (!list) return;
    const syncNodes = () => {
      const height = Math.max(list.clientHeight, 1);
      const next = stepRefs.current.slice(0, steps.length).map((step) => ((step?.offsetTop ?? 0) + 10) / height * 1000);
      setNodeY((current) => next.every((value, index) => Math.abs(value - (current[index] ?? -1)) < .5) ? current : next);
    };
    syncNodes();
    const observer = new ResizeObserver(syncNodes);
    observer.observe(list);
    window.addEventListener('resize', syncNodes);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncNodes);
    };
  }, [steps]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const paintProgress = (progress: number) => {
      const path = progressPathRef.current;
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length} ${length}`;
        path.style.strokeDashoffset = String(length * (1 - progress));
      }
      section.style.setProperty('--process-progress', progress.toFixed(3));
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) {
      paintProgress(1);
      setActive(steps.length - 1);
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
  }, [steps.length]);

  return (
    <section ref={sectionRef} id="processo" data-scroll-theme="dark" className="scene scene--process" aria-labelledby="processo-title">
      <div className="scene__container process-scene__layout">
        <div className="process-scene__intro">
          <h2 id="processo-title"><span className="process-heading__line"><ScrollUnderline>{copy.titleEmphasisA}</ScrollUnderline><br className="process-heading__desktop-break" /> {copy.titleMiddle}</span><span className="process-heading__line">{copy.titleB} <ProcessEmphasis value={copy.titleEmphasisB} /></span></h2>
        </div>
        <ol ref={stepsRef} className="process-scene__steps">
          <svg className="process-scene__path" viewBox="0 0 56 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className="process-scene__path--base" d="M28 8V992" />
            <path ref={progressPathRef} className="process-scene__path--progress" d="M28 8V992" />
            {steps.map((step, index) => (
              <circle key={step[0]} className={`process-node ${active > index ? 'is-complete' : ''} ${active === index ? 'is-active' : ''}`.trim()} cx="28" cy={nodeY[index] ?? 80 + index * 280} r={active === index ? 7 : 5} />
            ))}
          </svg>
          {steps.map(([number, title, description], index) => (
            <li ref={(element) => { stepRefs.current[index] = element; }} key={number} className={`process-step ${active === index ? 'is-active' : ''} ${active > index ? 'is-complete' : ''}`}>
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

function ProcessEmphasis({ value }: { value: string }) {
  if (value.startsWith('parte')) return <><ScrollUnderline>parte del</ScrollUnderline> <ScrollUnderline>servizio.</ScrollUnderline></>;
  return <><ScrollUnderline>part of the</ScrollUnderline> <ScrollUnderline>service.</ScrollUnderline></>;
}
