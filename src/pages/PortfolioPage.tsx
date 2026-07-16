import { useEffect } from 'react';
import { ArrowLeft, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import portfolio from '../data/portfolio.json';
import { Footer } from '../components/sections/Footer';

export function PortfolioPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <nav className="fixed top-0 inset-x-0 z-50 py-6 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 flex flex-row justify-between items-center">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Torna alla home
          </Link>
          <Link to="/" className="flex items-center gap-2 text-2xl font-display text-foreground">
            <img src="/media/brand/logo.svg" alt="Alessio Bellan Logo" className="h-8 w-auto" />
            Alessio Bellan
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display text-foreground mb-6 animate-fade-rise" style={{ fontFamily: "'Instrument Serif', serif" }}>
            L'Esibizione
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-rise-delay">
            Una galleria museale dei lavori più significativi. Esplora i progetti per scoprire il pensiero dietro ad ogni pixel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {portfolio.map((project, idx) => (
            <Link 
              key={project.id} 
              to={`/portfolio/${project.id}`}
              className={`group relative flex flex-col block rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 animate-fade-rise`} 
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="relative w-full aspect-video overflow-hidden bg-secondary">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-xs uppercase tracking-widest text-primary mb-2 block font-bold">{project.category}</span>
                  <h2 className="text-4xl font-display text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {project.title}
                  </h2>
                  <p className="text-gray-300 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.description}
                  </p>
                </div>
              </div>

            </Link>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
