import { useEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import portfolio from '../data/portfolio.json';
import { Footer } from '../components/sections/Footer';
import { Navigation } from '../components/sections/Navigation';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { useScrollTo } from '../hooks/useScrollTo';
import { business } from '../config/business';

export function ProjectPage() {
  const { id, slug } = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  const handleScrollTo = useScrollTo();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const project: any = portfolio.find((item) => item.slug === slug || String(item.id) === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id, slug]);

  if (!project) return <Navigate to="/progetti" replace />;
  if (location.pathname.startsWith('/portfolio')) return <Navigate to={`/progetti/${project.slug}`} replace />;

  const getLocalized = (value: any) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[currentLang] || value.it || value.en || '';
  };

  const title = getLocalized(project.title);
  const category = getLocalized(project.category);
  const description = getLocalized(project.description);
  const image = project.image.replace(/^\.\//, '/');
  const imageUrl = `${business.siteUrl}${image}`;
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      description,
      url: `${business.siteUrl}/progetti/${project.slug}`,
      image: imageUrl,
      creator: { '@id': business.personId },
      about: category,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: business.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Progetti', item: `${business.siteUrl}/progetti` },
        { '@type': 'ListItem', position: 3, name: title, item: `${business.siteUrl}/progetti/${project.slug}` },
      ],
    },
  ];

  return (
    <div className="case-page">
      <SEO title={`${title} | Alessio Bellan`} description={description} canonical={`/progetti/${project.slug}`} image={imageUrl} imageAlt={project.imageAlt} schemas={schemas} />
      <Navigation />
      <main>
        <section className="case-page__hero">
          <div className="scene__container">
            <nav className="seo-breadcrumbs" aria-label="Percorso"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/progetti">Progetti</Link><span aria-hidden="true">/</span><span>{title}</span></nav>
            <Link to="/progetti" className="case-page__back"><ArrowRight size={16} aria-hidden="true" /> Progetti</Link>
            <p className="case-page__eyebrow">{category}</p><h1>{title}</h1><p className="case-page__lead">{description}</p>
            <div className="case-page__meta">{project.authors?.map((author: string) => <span key={author}>{author}</span>)}{project.link && project.link !== '#' && <a href={project.link} target="_blank" rel="noopener noreferrer">Visita il progetto <ArrowUpRight size={16} aria-hidden="true" /></a>}{project.service && <Link to={`/servizi/${project.service}`}>Servizio collegato</Link>}{project.relatedArticle && <Link to={`/journal/${project.relatedArticle}`}>Leggi il Journal</Link>}</div>
          </div>
        </section>
        <section className="case-page__media"><div className="scene__container"><figure><img src={image} width={project.imageWidth} height={project.imageHeight} alt={project.imageAlt} decoding="async" fetchPriority="high" onError={(event) => { event.currentTarget.src = '/media/brand/foto_profilo_firma.jpg'; }} /></figure></div></section>
        {project.gallery?.length > 0 && <section className="case-page__gallery"><div className="scene__container"><p className="case-page__eyebrow">Dettagli</p><div className="case-page__gallery-grid">{project.gallery.map((galleryImage: string, index: number) => <figure key={galleryImage}><img src={galleryImage.replace(/^\.\//, '/')} width={1654} height={1132} alt={`${title}, dettaglio ${index + 1}`} loading="lazy" decoding="async" /></figure>)}</div></div></section>}
        <section className="case-page__closing"><div className="scene__container"><p className="case-page__eyebrow">Hai un progetto simile?</p><h2>Raccontami cosa vuoi costruire.</h2><a href="#contatti" onClick={(event) => handleScrollTo(event, 'contatti')} className="experience-button">Prenota 15 minuti <ArrowRight size={17} aria-hidden="true" /></a></div></section>
      </main>
      <Footer />
    </div>
  );
}
