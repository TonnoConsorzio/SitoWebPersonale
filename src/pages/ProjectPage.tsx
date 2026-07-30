import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Plus, User, ExternalLink, X } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import { Footer } from '../components/sections/Footer';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';

export function ProjectPage() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project: any = portfolio.find(p => String(p.id) === id);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const getLocalized = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[currentLang] || val['it'] || val['en'] || '';
  };

  const title = getLocalized(project.title);
  const category = getLocalized(project.category);
  const description = getLocalized(project.description);
  const problem = getLocalized(project.problem);
  const solution = getLocalized(project.solution);
  const result = getLocalized(project.result);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <SEO 
        title={`${title || 'Progetto'} | Alessio Bellan`}
        description={description}
        canonical={`/portfolio/${id}`}
      />

      <nav className="fixed top-0 inset-x-0 z-50 py-6 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-row justify-between items-center">
          <Link to="/portfolio" className="text-base font-medium text-muted-foreground hover:text-foreground flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Torna al portfolio
          </Link>
          <Link to="/" className="flex items-center gap-2 text-2xl font-display text-foreground">
            <img src="./media/brand/logo.svg" alt="Alessio Bellan Logo" className="h-8 w-auto" width="32" height="32" />
            <span>Alessio Bellan</span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="animate-fade-rise">
          <div className="flex flex-col justify-center items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <span className="text-base uppercase tracking-widest text-primary font-mono font-bold">{category}</span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {title}
            </h1>
            <div className="flex items-center gap-4 justify-center flex-wrap pt-2">
              {project.authors?.map((author: string) => (
                <span key={author} className="flex items-center gap-2 text-base text-muted-foreground bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <User className="w-4 h-4" /> {author}
                </span>
              ))}
              {project.link && project.link !== "#" && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-base text-primary-foreground bg-primary px-5 py-2 rounded-full hover:scale-105 transition-transform font-medium"
                >
                  <ExternalLink className="w-4 h-4" /> Visita il sito
                </a>
              )}
            </div>
          </div>

          {/* Main Artwork */}
          <div className="relative w-full aspect-[4/3] md:aspect-video max-w-5xl mx-auto bg-secondary overflow-hidden shadow-2xl rounded-3xl border border-white/10 group mb-12">
            <img 
              src={project.image} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
            />
            
            {/* Hotspots */}
            {project.hotspots?.map((spot: any, i: number) => (
              <div 
                key={i} 
                className="absolute group/spot z-20" 
                style={{ top: `${spot.y}%`, left: `${spot.x}%`, transform: 'translate(-50%, -50%)' }}
              >
                <button className="w-10 h-10 bg-background/90 backdrop-blur-md rounded-full border border-white/20 shadow-2xl flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all cursor-pointer">
                  <Plus className="w-5 h-5" />
                </button>
                
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-64 md:w-80 p-6 bg-background/95 backdrop-blur-xl rounded-2xl opacity-0 invisible group-hover/spot:opacity-100 group-hover/spot:visible transition-all duration-300 pointer-events-none shadow-2xl border border-white/20 translate-y-4 group-hover/spot:translate-y-0 z-50">
                  <h4 className="font-display text-2xl text-primary mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>{spot.title}</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">{spot.description}</p>
                </div>
              </div>
            ))}
          </div>

          {description && (
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          )}

          {/* Problem, Solution, Result Grid */}
          {(problem || solution || result) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {problem && (
                <div className="liquid-glass p-8 rounded-3xl border border-white/10 space-y-3">
                  <h3 className="text-2xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Il problema</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{problem}</p>
                </div>
              )}
              {solution && (
                <div className="liquid-glass p-8 rounded-3xl border border-white/10 space-y-3">
                  <h3 className="text-2xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>La soluzione</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{solution}</p>
                </div>
              )}
              {result && (
                <div className="liquid-glass p-8 rounded-3xl border border-primary/30 space-y-3">
                  <h3 className="text-2xl font-display text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>Il risultato</h3>
                  <p className="text-base text-foreground leading-relaxed font-medium">{result}</p>
                </div>
              )}
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="max-w-5xl mx-auto mt-16">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((imgUrl: string, idx: number) => (
                  <div 
                    key={idx}
                    className="liquid-glass rounded-2xl overflow-hidden aspect-square cursor-pointer group border border-white/10"
                    onClick={() => setLightboxImage(imgUrl)}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Gallery image ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lightbox */}
          {lightboxImage && (
            <div 
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
              onClick={() => setLightboxImage(null)}
            >
              <button 
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
              >
                <X className="w-6 h-6" />
              </button>
              <img 
                src={lightboxImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
