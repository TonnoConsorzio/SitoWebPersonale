import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { ScrollUnderline } from '../ScrollUnderline';
import { useHomeCopy } from '../../hooks/useHomeCopy';

export function Services() {
  const copy = useHomeCopy().services;
  const groups = copy.groups;
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const { scrollY } = useScroll();

  const updateActiveService = () => {
    const focusLine = window.innerHeight * .46;
    let nextIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    chapterRefs.current.forEach((chapter, index) => {
      if (!chapter) return;
      const bounds = chapter.getBoundingClientRect();
      const distance = Math.abs(bounds.top + bounds.height / 2 - focusLine);
      if (distance < closestDistance) {
        closestDistance = distance;
        nextIndex = index;
      }
    });

    setActiveServiceIndex((current) => current === nextIndex ? current : nextIndex);
  };

  useMotionValueEvent(scrollY, 'change', updateActiveService);

  useEffect(() => {
    updateActiveService();
  }, [groups.length]);

  return (
    <section id="servizi" data-scroll-theme="paper" className="scene scene--services" aria-labelledby="servizi-title">
      <div className="scene__container services-scene__layout">
        <div className="services-scene__lead">
          <h2 id="servizi-title">{copy.titleA} <ScrollUnderline>{copy.titleEmphasis}</ScrollUnderline><br />{copy.titleB}</h2>
        </div>
          <div className="services-scene__chapters">
            {groups.map((group, index) => (
            <article ref={(element) => { chapterRefs.current[index] = element; }} key={group.title} className={`service-chapter ${activeServiceIndex === index ? 'is-active' : ''}`} data-service-index={index} aria-current={activeServiceIndex === index ? 'step' : undefined}>
              <span className="service-chapter__control" aria-hidden="true" />
              <div>
                <h3>{'emphasis' in group ? <ServiceTitle title={group.title} emphasis={group.emphasis} active={activeServiceIndex === index} /> : group.title}</h3>
                <p className="service-chapter__services">{group.services}</p>
                <p className="service-chapter__description">{group.description}</p>
                <Link to={group.path} className="text-link">{group.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceTitle({ title, emphasis, active }: { title: string; emphasis: string; active: boolean }) {
  const [before, after] = title.split(emphasis);
  return <>{before}<ScrollUnderline active={active}>{emphasis}</ScrollUnderline>{after}</>;
}
