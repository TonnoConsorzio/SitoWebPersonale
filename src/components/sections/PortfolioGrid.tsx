import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const projects = [
  {
    id: 2,
    label: 'Digital Heroes',
    title: 'Meno dipendenza da Eventbrite. Più controllo.',
    description: 'Una piattaforma per gestire eventi, iscrizioni e biglietti con un sistema proprietario.',
    image: portfolio[1].image,
    cta: 'Guarda Digital Heroes'
  },
  {
    id: 3,
    label: 'ABBO APS',
    title: 'Un gestionale pensato per l’associazione. Non adattato a forza.',
    description: 'È in sviluppo per riunire la gestione interna e sostituire strumenti generici, tra cui un servizio da 79 € al mese.',
    image: portfolio[2].image,
    cta: 'Guarda il progetto'
  }
];

type Project = (typeof projects)[number];

function ProjectScene({ project }: { project: Project }) {
  const ref = useScrollProgress<HTMLAnchorElement>();

  return (
    <article className="project-scene">
      <div className="project-scene__sticky">
        <div className="project-scene__grid">
          <div className="project-scene__copy">
            <p className="project-scene__label eyebrow">{project.label}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Link to={`/portfolio/${project.id}`} className="text-link text-link--light">{project.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <Link ref={ref} to={`/portfolio/${project.id}`} className="project-scene__visual-wrap" aria-label={`Apri il progetto ${project.label}`}>
            <span className="project-scene__visual-depth" aria-hidden="true" />
            <img src={project.image} alt={`Anteprima del progetto ${project.label}`} loading={project.id === 2 ? 'eager' : 'lazy'} width="1200" height="900" className="project-scene__visual" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PortfolioGrid() {
  return (
    <section id="progetti" data-scroll-theme="dark" data-thread-stage="projects" className="scene scene--projects" aria-labelledby="progetti-title">
      <div className="scene__container projects-scene__intro">
        <p className="eyebrow">Progetti reali</p>
        <h2 id="progetti-title">Non ti racconto cosa potrei fare.<br /><span>Ti faccio vedere cosa sto facendo.</span></h2>
        <Link to="/portfolio" className="text-link text-link--light">Vedi tutti i progetti <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
      {projects.map((project) => <ProjectScene key={project.id} project={project} />)}
    </section>
  );
}
