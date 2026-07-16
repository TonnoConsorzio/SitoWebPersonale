import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { ArrowLeft, Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Article, getArticleBySlug } from '../utils/markdown';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return;
      const data = await getArticleBySlug(slug);
      if (data) {
        setArticle(data);
      } else {
        // If not found, navigate back or show 404 (for simplicity we just navigate to home)
        navigate('/', { replace: true });
      }
      setLoading(false);
    }
    fetchArticle();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!article) return null; // handled by navigate

  return (
    <>
      <SEO 
        title={`${article.metadata.title} | Alessio Bellan Journal`}
        description={article.metadata.excerpt}
      />
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-24 px-8 max-w-4xl mx-auto">
        <Link to="/#journal" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Torna al Journal
        </Link>
        
        <article className="animate-fade-rise">
          <header className="mb-12 border-b border-white/10 pb-12">
            <h1 className="text-4xl md:text-6xl font-display text-foreground mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {article.metadata.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={article.metadata.date}>
                  {new Date(article.metadata.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
              </div>
              
              {article.metadata.tags && article.metadata.tags.length > 0 && (
                <div className="flex gap-2">
                  {article.metadata.tags.map((tag: string, i: number) => (
                    <span key={i} className="bg-white/5 px-3 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>
          
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
