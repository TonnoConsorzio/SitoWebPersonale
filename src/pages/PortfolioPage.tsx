import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import portfolio from '../data/portfolio.json';
import { Footer } from '../components/sections/Footer';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';

export function PortfolioPage() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getLocalized = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[currentLang] || val['it'] || val['en'] || '';
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <SEO 
        title="Portfolio e Progetti | Alessio Bellan"
        description="Esplora la galleria dei lavori realizzati per professionisti, associazioni e piccole realtà."
        canonical="/portfolio"
      />
      <nav className="fixed top-0 inset-x-0 z-50 py-6 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-row justify-between items-center">
          <Link to="/" className="text-base font-medium text-muted-foreground hover:text-foreground flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Torna alla home
          </Link>
          <Link to="/" className="flex items-center gap-2 text-2xl font-display text-foreground">
            <img src="./media/brand/logo.svg" alt="Alessio Bellan Logo" className="h-8 w-auto" width="32" height="32" />
            <span>Alessio Bellan</span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Portfolio e Progetti
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Una selezione di progetti realizzati per professionisti, associazioni ed attività locali.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {portfolio.map((project: any, idx: number) => {
            const title = getLocalized(project.title);
            const category = getLocalized(project.category);
            const description = getLocalized(project.description);

            return (
              <Link 
                key={project.id} 
                to={`/portfolio/${project.id}`}
                className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 animate-fade-rise" 
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                <div className="relative w-full aspect-video overflow-hidden bg-secondary">
                  <img 
                    src={project.image} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                    <span className="text-base uppercase tracking-widest text-primary mb-2 font-bold font-mono">{category}</span>
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      {title}
                    </h2>
                    <p className="text-base text-gray-300 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
