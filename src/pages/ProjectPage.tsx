import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Plus, User, ExternalLink, X } from 'lucide-react';
import portfolio from '../data/portfolio.json';
import { Footer } from '../components/sections/Footer';

export function ProjectPage() {
  const { id } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project: any = portfolio.find(p => String(p.id) === id);

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <nav className="fixed top-0 inset-x-0 z-50 py-6 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 flex flex-row justify-between items-center">
          <Link to="/portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Torna al portfolio
          </Link>
          <Link to="/" className="flex items-center gap-2 text-2xl font-display text-foreground">
            <img src="./media/brand/logo.svg" alt="Alessio Bellan Logo" className="h-8 w-auto" />
            Alessio Bellan
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        <div className="animate-fade-rise">
          <div className="flex flex-col justify-center items-center gap-6 mb-16 text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-primary">{project.category}</span>
            <h1 className="text-5xl md:text-7xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {project.title}
            </h1>
            <div className="flex items-center gap-4 justify-center flex-wrap">
              {project.authors?.map(author => (
                <span key={author} className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  <User className="w-4 h-4" /> {author}
                </span>
              ))}
              {project.link && project.link !== "#" && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-sm text-primary-foreground bg-primary px-4 py-2 rounded-full hover:scale-105 transition-transform"
                >
                  <ExternalLink className="w-4 h-4" /> Visita il sito
                </a>
              )}
            </div>
          </div>

          {/* The "Museum" Artwork */}
          <div className="relative w-full aspect-[4/3] md:aspect-video max-w-5xl mx-auto bg-secondary animate-wavy overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10 group mb-20">
            <img 
              src={project.image} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
            />
            
            {/* Hotspots */}
            {project.hotspots?.map((spot, i) => (
              <div 
                key={i} 
                className="absolute group/spot z-20" 
                style={{ top: `${spot.y}%`, left: `${spot.x}%`, transform: 'translate(-50%, -50%)' }}
              >
                <button className="w-10 h-10 bg-background/90 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all cursor-pointer">
                  <Plus className="w-5 h-5" />
                </button>
                
                {/* Tooltip - with higher contrast */}
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-64 md:w-80 p-6 bg-background/95 backdrop-blur-xl rounded-2xl opacity-0 invisible group-hover/spot:opacity-100 group-hover/spot:visible transition-all duration-300 pointer-events-none shadow-2xl border border-white/20 translate-y-4 group-hover/spot:translate-y-0 z-50">
                  <h4 className="font-display text-2xl text-primary mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>{spot.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{spot.description}</p>
                </div>
              </div>
            ))}
          </div>

          
          
          {project.gallery && project.gallery.length > 0 && (
            <div className="max-w-5xl mx-auto mb-20">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((imgUrl: string, idx: number) => (
                  <div 
                    key={idx}
                    className="liquid-glass rounded-xl overflow-hidden aspect-square object-cover cursor-pointer group"
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

          {lightboxImage && (
            <div 
              className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
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
{project.description && (
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {(project.problem || project.solution || project.result) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {project.problem && (
              <div className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-2xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Il problema</h3>
                <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-2xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>La soluzione</h3>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            )}
            {project.result && (
              <div className="bg-white/5 p-8 rounded-3xl border border-primary/20 md:bg-primary/5 hover:bg-primary/10 transition-colors">
                <h3 className="text-2xl font-display text-primary mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Il risultato</h3>
                <p className="text-foreground leading-relaxed font-medium">{project.result}</p>
              </div>
            )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
