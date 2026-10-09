import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { SEO } from '../components/SEO';
import { Article, getAllArticles } from '../utils/markdown';

export function JournalPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    void getAllArticles().then(setArticles);
  }, []);

  return (
    <div className="profile-page">
      <SEO title="Journal" description="Appunti di progetto, scelte tecniche e lavoro sul campo di Alessio Bellan." canonical="/journal" />
      <Navigation />
      <main>
        <section className="profile-page__hero">
          <div className="scene__container"><p className="profile-page__eyebrow">Journal</p><h1>Il lavoro, raccontato mentre prende forma.</h1><p>Scelte, problemi e dettagli dietro i progetti digitali.</p></div>
        </section>
        <section className="profile-page__section">
          <div className="scene__container profile-page__section-grid">
            <div className="profile-page__section-intro"><p className="profile-page__eyebrow">Articoli</p><h2>Note dal lavoro reale.</h2></div>
            <ol className="profile-page__rows">
              {articles.map((article, index) => <li key={article.slug}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{new Date(article.metadata.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</small><h3><Link to={`/journal/${article.slug}`}>{article.metadata.title}</Link></h3><p>{article.metadata.excerpt}</p><Link to={`/journal/${article.slug}`} className="text-link">Leggi l'articolo <ArrowRight size={17} aria-hidden="true" /></Link></div></li>)}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
