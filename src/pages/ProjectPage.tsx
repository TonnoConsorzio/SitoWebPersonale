import { useEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import portfolio from '../data/portfolio.json';
import { Footer } from '../components/sections/Footer';
import { Navigation } from '../components/sections/Navigation';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { useScrollTo } from '../hooks/useScrollTo';

export function ProjectPage() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const handleScrollTo = useScrollTo();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const project: any = portfolio.find((item) => String(item.id) === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) return <Navigate to="/portfolio" replace />;

  const getLocalized = (value: any) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[currentLang] || value.it || value.en || '';
  };

  const title = getLocalized(project.title);
  const category = getLocalized(project.category);
  const description = getLocalized(project.description);

  return (
    <div className="case-page">
      <SEO title={`${title} | Alessio Bellan`} description={description} canonical={`/portfolio/${id}`} />
      <Navigation />

      <main>
        <section className="case-page__hero"><div className="scene__container"><Link to="/portfolio" className="case-page__back"><ArrowRight size={16} aria-hidden="true" /> Portfolio</Link><p className="case-page__eyebrow">{category}</p><h1>{title}</h1><p className="case-page__lead">{description}</p><div className="case-page__meta">{project.authors?.map((author: string) => <span key={author}>{author}</span>)}{project.link && project.link !== '#' && <a href={project.link} target="_blank" rel="noopener noreferrer">Visita il progetto <ArrowUpRight size={16} aria-hidden="true" /></a>}</div></div></section>
        <section className="case-page__media"><div className="scene__container"><figure><img src={project.image} alt={title} /></figure></div></section>
        {project.gallery?.length > 0 && <section className="case-page__gallery"><div className="scene__container"><p className="case-page__eyebrow">Dettagli</p><div className="case-page__gallery-grid">{project.gallery.map((image: string, index: number) => <figure key={image}><img src={image} alt={`${title}, dettaglio ${index + 1}`} loading="lazy" /></figure>)}</div></div></section>}
        <section className="case-page__closing"><div className="scene__container"><p className="case-page__eyebrow">Hai un progetto simile?</p><h2>Raccontami cosa vuoi costruire.</h2><a href="#contatti" onClick={(event) => handleScrollTo(event, 'contatti')} className="experience-button">Prenota 15 minuti <ArrowRight size={17} aria-hidden="true" /></a></div></section>
      </main>

      <Footer />
    </div>
  );
}
