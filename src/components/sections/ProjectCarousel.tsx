import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
import { useHomeCopy } from '../../hooks/useHomeCopy';
import { useScrollProgress } from '../../hooks/useScrollProgress';

type Locale = 'it' | 'en';
type PortfolioItem = (typeof portfolio)[number];

const getImagePath = (image: string) => image.replace(/^\.\//, '/');
const projectHref = (project: PortfolioItem) => `/portfolio/${project.id}`;
const relativeIndex = (index: number, activeIndex: number) => index - activeIndex;

export function ProjectCarousel() {
  const { i18n } = useTranslation();
  const copy = useHomeCopy().projects;
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : 'it';
  const sectionRef = useScrollProgress<HTMLElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [copyIndex, setCopyIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const changeTimer = useRef<number | undefined>(undefined);
  const copyTimer = useRef<number | undefined>(undefined);
  const projects = portfolio;

  const changeTo = (index: number) => {
    const nextIndex = Math.min(projects.length - 1, Math.max(0, index));
    if (nextIndex === activeIndex) return;
    setActiveIndex(nextIndex);
    setIsChanging(true);
    window.clearTimeout(changeTimer.current);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopyIndex(nextIndex), 120);
    changeTimer.current = window.setTimeout(() => setIsChanging(false), 760);
    window.requestAnimationFrame(() => stageRef.current?.focus());
  };

  const change = (direction: number) => changeTo(activeIndex + direction);

  const select = (index: number) => {
    if (index === activeIndex) return;
    changeTo(index);
  };

  useEffect(() => () => {
    window.clearTimeout(changeTimer.current);
    window.clearTimeout(copyTimer.current);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    change(event.key === 'ArrowRight' ? 1 : -1);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0]?.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) >= 42) change(distance < 0 ? 1 : -1);
  };

  return (
    <section ref={sectionRef} id="progetti" data-scroll-theme="dark" className="scene scene--projects" aria-labelledby="progetti-title">
      <div className="scene__container projects-scene__intro">
        <h2 id="progetti-title">{copy.introA}<br /><span>{copy.introB}</span></h2>
      </div>

      <div
        ref={stageRef}
        className={`scene__container project-stage ${isChanging ? 'is-changing' : ''}`.trim()}
        data-project-carousel
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Project showcase"
      >
        <div className="project-stage__slides">
          {projects.map((project, index) => {
            const distance = relativeIndex(index, activeIndex);
            const title = project.title[locale];
            const image = getImagePath(project.image);
            const href = projectHref(project);

            return (
              <article key={project.id} className={`project-stage__slide ${distance === 0 ? 'is-active' : ''}`.trim()} data-relative-index={distance} aria-hidden={Math.abs(distance) > 2 ? true : undefined}>
                {distance === 0 ? (
                  <Link to={href} className="project-stage__active-media" aria-label={`Apri il progetto ${title}`}>
                    <img src={image} alt={title} loading="eager" decoding="async" />
                  </Link>
                ) : (
                  <button type="button" className="project-stage__preview" onClick={() => select(index)} tabIndex={Math.abs(distance) <= 2 ? 0 : -1} aria-label={`Seleziona il progetto ${title}`}>
                    <img src={image} alt="" loading={distance <= 2 ? 'eager' : 'lazy'} decoding="async" />
                  </button>
                )}

              </article>
            );
          })}
        </div>

        <div className="project-stage__content" aria-live="polite">
          <div key={copyIndex} className="project-stage__copy">
            <h3>{projects[copyIndex].title[locale]}</h3>
            <p className="project-stage__description">{projects[copyIndex].description[locale]}</p>
            <Link to={projectHref(projects[copyIndex])} className="text-link text-link--light">{copy.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>

        <div className="project-stage__controls" aria-label="Controlli progetti">
          <button type="button" onClick={() => change(-1)} disabled={activeIndex === 0} aria-label="Progetto precedente"><ArrowLeft size={20} aria-hidden="true" /></button>
          <span aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => change(1)} disabled={activeIndex === projects.length - 1} aria-label="Progetto successivo"><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>

      <div className="scene__container projects-scene__outro"><Link to="/portfolio" className="text-link text-link--light">{copy.all} <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    </section>
  );
}
