import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollUnderline } from '../ScrollUnderline';

const groups = [
  { title: 'Farti scegliere', services: 'Siti web · Identità', description: 'Per far capire in fretta chi sei, cosa fai e perché dovrebbero contattarti.', path: '/servizi/siti-web', cta: 'Siti e identità' },
  { title: 'Farti risparmiare tempo', emphasis: 'risparmiare tempo', services: 'Automazioni · Gestionali · Web app', description: 'Per togliere di mezzo passaggi manuali, doppioni e strumenti che non si parlano.', path: '/servizi/automazioni', cta: 'Automazioni e software' },
  { title: 'Darti autonomia', emphasis: 'autonomia', services: 'Formazione · Infrastruttura', description: 'Per capire meglio gli strumenti che usi e dipendere meno dagli altri.', path: '/servizi/formazione-ai', cta: 'Formazione e infrastruttura' }
];

export function Services() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const leaveTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const next = Math.min(groups.length - 1, Math.floor(self.progress * groups.length));
        if (next === activeRef.current) return;
        setLeaving(activeRef.current);
        activeRef.current = next;
        setActive(next);
        window.clearTimeout(leaveTimer.current);
        leaveTimer.current = window.setTimeout(() => setLeaving(null), 620);
      }
    });
    ScrollTrigger.refresh();
    return () => {
      trigger.kill();
      window.clearTimeout(leaveTimer.current);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.threadSubstage = String(active);
    return () => { delete document.documentElement.dataset.threadSubstage; };
  }, [active]);

  return (
    <section ref={sectionRef} id="servizi" data-scroll-theme="paper" data-thread-stage="services" className="scene scene--services" aria-labelledby="servizi-title">
      <div className="scene__container services-scene__layout">
        <div className="services-scene__lead">
          <h2 id="servizi-title">Dimmi cosa <ScrollUnderline>non funziona.</ScrollUnderline><br />Il servizio lo scegliamo dopo.</h2>
        </div>
        <div className="services-scene__chapters">
          {groups.map((group, index) => (
            <article key={group.title} className={`service-chapter ${active === index ? 'is-active' : ''} ${leaving === index ? 'is-leaving' : ''}`}>
              <div>
                <h3>{group.emphasis ? <ServiceTitle title={group.title} emphasis={group.emphasis} /> : group.title}</h3>
                <p className="service-chapter__services">{group.services}</p>
                <p className="service-chapter__description">{group.description}</p>
                <Link to={group.path} className="text-link">{group.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
          <div className={`services-scene__footer ${active === groups.length - 1 ? 'is-visible' : ''}`}><Link to="/servizi" className="text-link">Vedi tutti i servizi <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </div>
      </div>
    </section>
  );
}

function ServiceTitle({ title, emphasis }: { title: string; emphasis: string }) {
  const [before, after] = title.split(emphasis);
  return <>{before}<ScrollUnderline>{emphasis}</ScrollUnderline>{after}</>;
}
