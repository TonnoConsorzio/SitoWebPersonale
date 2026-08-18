import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollUnderline } from '../ScrollUnderline';

const steps = [
  ['01', 'Mi racconti il problema', 'Quindici minuti. Niente presentazioni infinite.'],
  ['02', 'Ti dico cosa farei', 'Cosa costruire, cosa evitare, quanto può costare e quanto tempo serve.'],
  ['03', 'Lo costruiamo', 'Vedi come procede. Quando una decisione riguarda te, la prendiamo insieme.'],
  ['04', 'Te lo consegno davvero', 'Accessi, codice, dati e indicazioni per usarlo.']
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) {
      section.style.setProperty('--process-progress', '1');
      setActive(3);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        section.style.setProperty('--process-progress', self.progress.toFixed(3));
        const next = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        setActive((current) => current === next ? current : next);
      }
    });
    ScrollTrigger.refresh();
    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} id="processo" data-scroll-theme="dark" data-thread-stage="process" className="scene scene--process" aria-labelledby="processo-title">
      <div className="scene__container process-scene__layout">
        <div className="process-scene__intro">
          <h2 id="processo-title"><ScrollUnderline>Non sparisco</ScrollUnderline> per tre settimane.<br />È <ScrollUnderline>parte del servizio.</ScrollUnderline></h2>
        </div>
        <ol className="process-scene__steps">
          <svg className="process-scene__path" viewBox="0 0 100 800" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path pathLength="1" d="M14 70C52 102 52 159 14 210S52 318 14 390S52 534 14 604S52 712 14 760" />
          </svg>
          {steps.map(([number, title, description], index) => (
            <li key={number} className={`process-step ${active === index ? 'is-active' : ''} ${active > index ? 'is-complete' : ''}`}>
              <span className="process-step__number">{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
          <li className="process-scene__footer"><p>Niente ostaggi digitali.</p></li>
        </ol>
      </div>
    </section>
  );
}
