import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import portfolio from '../../data/portfolio.json';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useHomeCopy } from '../../hooks/useHomeCopy';

type Project = { id: number; label: string; title: string; description: string; previewImages: string[]; category: string; cta: string; open: string };

function ProjectPreview({ project }: { project: Project }) {
  return (
    <Link to={`/portfolio/${project.id}`} className="project-preview" aria-label={project.open}>
      <span className="project-preview__stage">
        {project.previewImages.map((image, index) => (
          <span key={`${image}-${index}`} className={`project-preview__layer project-preview__layer--${index + 1}`}>
            <img src={image} alt="" loading={project.id === 2 && index === 1 ? 'eager' : 'lazy'} decoding="async" />
          </span>
        ))}
      </span>
    </Link>
  );
}

function ProjectScene({ project, index }: { project: Project; index: number }) {
  const ref = useScrollProgress<HTMLElement>();

  return (
    <article ref={ref} className={`project-scene project-scene--${index + 1}`}>
      <div className="project-card">
        <ProjectPreview project={project} />
        <div className="project-card__content">
          <div className="project-card__heading">
            <p className="project-scene__label">{project.label}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <div className="project-card__footer">
            <ul className="project-card__tags" aria-label={project.category}>
              <li>{project.category}</li>
            </ul>
            <Link to={`/portfolio/${project.id}`} className="text-link text-link--light">{project.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PortfolioGrid() {
  const { i18n } = useTranslation();
  const copy = useHomeCopy().projects;
  const locale: 'it' | 'en' = i18n.language.startsWith('en') ? 'en' : 'it';
  const projects: Project[] = copy.items.map((item, index) => {
    const source = portfolio[index + 1];
    const previewImages = [source.image, ...source.gallery].slice(0, 3);
    while (previewImages.length < 3) previewImages.push(source.image);
    return { ...item, id: index + 2, previewImages, category: source.category[locale] };
  });

  return (
    <section id="progetti" data-scroll-theme="dark" className="scene scene--projects" aria-labelledby="progetti-title">
      <div className="scene__container projects-scene__intro">
        <div>
          <p className="section-kicker">{copy.kicker}</p>
          <h2 id="progetti-title">{copy.introA}<br /><span>{copy.introB}</span></h2>
        </div>
      </div>
      <div className="projects-scene__cards">
        {projects.map((project, index) => <ProjectScene key={project.id} project={project} index={index} />)}
      </div>
      <div className="scene__container projects-scene__outro"><Link to="/portfolio" className="text-link text-link--light">{copy.all} <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    </section>
  );
}
