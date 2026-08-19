import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollUnderline } from '../ScrollUnderline';
import { useHomeCopy } from '../../hooks/useHomeCopy';

export function Services() {
  const copy = useHomeCopy().services;
  const groups = copy.groups;

  return (
    <section id="servizi" data-scroll-theme="paper" className="scene scene--services" aria-labelledby="servizi-title">
      <div className="scene__container services-scene__layout">
        <div className="services-scene__lead">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="servizi-title">{copy.titleA} <ScrollUnderline>{copy.titleEmphasis}</ScrollUnderline><br />{copy.titleB}</h2>
        </div>
        <div className="services-scene__chapters">
          {groups.map((group, index) => (
            <article key={group.title} className="service-chapter">
              <span className={`service-chapter__control service-chapter__control--${index + 1}`} aria-hidden="true" />
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
