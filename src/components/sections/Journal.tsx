import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Article, getAllArticles } from '../../utils/markdown';

export function Journal() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getAllArticles().then(setArticles);
  }, []);

  return (
    <section id="journal" className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28" aria-labelledby="journal-title">
      <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end"><p className="mono-label text-foreground/60">Pensieri utili</p><h2 id="journal-title" className="display-font text-5xl leading-[0.95] tracking-tight md:text-7xl">Journal.</h2></div>
      <div className="mt-12 border-t-2 border-foreground">
        {articles.slice(0, 3).map((article) => <Link key={article.slug} to={`/journal/${article.slug}`} className="group flex min-h-24 flex-col justify-between gap-4 border-b border-foreground/25 py-5 transition-colors hover:bg-primary/30 md:flex-row md:items-center"><div><p className="mono-label text-foreground/55">Articolo</p><h3 className="mt-2 text-xl font-bold">{article.metadata.title}</h3></div><span className="inline-flex min-h-11 items-center gap-2 text-sm font-bold">Leggi <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" /></span></Link>)}
      </div>
    </section>
  );
}
