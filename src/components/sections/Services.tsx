import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ScrollUnderline } from '../ScrollUnderline';
import { useHomeCopy } from '../../hooks/useHomeCopy';

export function Services() {
  const copy = useHomeCopy().services;
  const groups = copy.groups;
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -bounds.top / scrollRange));
      const nextIndex = Math.min(groups.length - 1, Math.floor(progress * groups.length));
      setActiveServiceIndex((current) => current === nextIndex ? current : nextIndex);
      section.style.setProperty('--service-progress', progress.toFixed(3));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  return (
    <section ref={sectionRef} id="servizi" data-scroll-theme="paper" className="scene scene--services" aria-labelledby="servizi-title">
      <div className="scene__container services-scene__layout">
        <div className="services-scene__lead">
          <h2 id="servizi-title">{copy.titleA} <ScrollUnderline>{copy.titleEmphasis}</ScrollUnderline><br />{copy.titleB}</h2>
        </div>
        <div className="services-scene__chapters">
          {groups.map((group, index) => (
            <article key={group.title} className={`service-chapter ${activeServiceIndex === index ? 'is-active' : ''}`} data-service-index={index} aria-current={activeServiceIndex === index ? 'step' : undefined}>
              <span className="service-chapter__control" aria-hidden="true" />
              <div>
                <h3>{'emphasis' in group ? <ServiceTitle title={group.title} emphasis={group.emphasis} /> : group.title}</h3>
                <p className="service-chapter__services">{group.services}</p>
                <p className="service-chapter__description">{group.description}</p>
                <Link to={group.path} className="text-link">{group.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
          <div className="services-scene__footer"><Link to="/servizi" className="text-link">{copy.all} <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </div>
      </div>
    </section>
  );
}

function ServiceTitle({ title, emphasis }: { title: string; emphasis: string }) {
  const [before, after] = title.split(emphasis);
  return <>{before}<ScrollUnderline>{emphasis}</ScrollUnderline>{after}</>;
}
