import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import portfolio from '../data/portfolio.json';
import { Footer } from '../components/sections/Footer';
import { Navigation } from '../components/sections/Navigation';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';

export function PortfolioPage() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const getLocalized = (value: any) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[currentLang] || value.it || value.en || '';
  };

  return (
    <div className="case-index-page">
      <SEO title="Progetti | Alessio Bellan" description="Progetti web, gestionali e identità visive realizzati da Alessio Bellan per associazioni e realtà indipendenti." canonical="/progetti" />
      <Navigation />
      <main>
        <section className="case-index-page__hero"><div className="scene__container"><p className="case-index-page__eyebrow">Progetti</p><h1>Quello che sto costruendo.</h1><p>Progetti reali, con problemi e vincoli reali. Ogni lavoro racconta una parte del modo in cui collaboro.</p></div></section>
        <section className="case-index-page__list"><div className="scene__container">
          {portfolio.map((project: any, index: number) => {
            const title = getLocalized(project.title);
            const category = getLocalized(project.category);
            const description = getLocalized(project.description);
            return <Link key={project.id} to={`/progetti/${project.slug}`} className="case-index-page__project">
              <div className="case-index-page__project-media"><img src={project.image.replace(/^\.\//, '/')} width={project.imageWidth} height={project.imageHeight} alt={project.imageAlt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /></div>
              <div className="case-index-page__project-copy"><span>{String(index + 1).padStart(2, '0')} · {category}</span><h2>{title}</h2><p>{description}</p><strong>Apri il progetto <ArrowUpRight size={17} aria-hidden="true" /></strong></div>
            </Link>;
          })}
        </div></section>
        <nav className="seo-breadcrumbs scene__container" aria-label="Percorso"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>Progetti</span></nav>
      </main>
      <Footer />
    </div>
  );
}
