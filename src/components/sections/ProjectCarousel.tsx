import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
import { useHomeCopy } from '../../hooks/useHomeCopy';
import { useScrollProgress } from '../../hooks/useScrollProgress';

type PortfolioItem = (typeof portfolio)[number];

export function ProjectMediaBezel({ project, title, href }: { project: PortfolioItem; title: string; href: string }) {
  const image = project.image.replace(/^\.\//, '/');

  return (
    <Link to={href} className="project-media-bezel" aria-label={`Apri il progetto ${title}`}>
      <span className="project-media-bezel__screen">
        <span className="project-media-bezel__depth" aria-hidden="true"><img src={image} alt="" /></span>
        <img className="project-media-bezel__image" src={image} alt={title} loading="eager" decoding="async" />
      </span>
    </Link>
  );
}

export function ProjectCarousel() {
  const { i18n } = useTranslation();
  const copy = useHomeCopy().projects;
  const locale: 'it' | 'en' = i18n.language.startsWith('en') ? 'en' : 'it';
  const sectionRef = useScrollProgress<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const changeTimer = useRef<number | undefined>(undefined);
  const projects = portfolio;
  const project = projects[activeIndex];
  const title = project.title[locale];
  const href = `/portfolio/${project.id}`;

  const change = (direction: number) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
    setIsChanging(true);
    window.clearTimeout(changeTimer.current);
    changeTimer.current = window.setTimeout(() => setIsChanging(false), 650);
  };

  useEffect(() => () => window.clearTimeout(changeTimer.current), []);

  return (
    <section ref={sectionRef} id="progetti" data-scroll-theme="dark" className="scene scene--projects" aria-labelledby="progetti-title">
      <div className="scene__container projects-scene__intro">
        <h2 id="progetti-title">{copy.introA}<br /><span>{copy.introB}</span></h2>
      </div>

      <div className={`scene__container project-carousel ${isChanging ? 'is-changing' : ''}`} data-project-carousel>
        <div className="project-carousel__media">
          <ProjectMediaBezel key={project.id} project={project} title={title} href={href} />
        </div>
        <div className="project-carousel__content" aria-live="polite">
          <div key={project.id} className="project-carousel__copy">
            <p className="project-carousel__category">{project.category[locale]}</p>
            <h3>{title}</h3>
            <p>{project.description[locale]}</p>
            <Link to={href} className="text-link text-link--light">{copy.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="project-carousel__controls" aria-label="Controlli progetti">
            <button type="button" onClick={() => change(-1)} aria-label="Progetto precedente"><ArrowLeft size={20} aria-hidden="true" /></button>
            <span aria-live="off">{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => change(1)} aria-label="Progetto successivo"><ArrowRight size={20} aria-hidden="true" /></button>
          </div>
        </div>
      </div>

      <div className="scene__container projects-scene__outro"><Link to="/portfolio" className="text-link text-link--light">{copy.all} <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    </section>
  );
}
