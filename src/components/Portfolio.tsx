import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { ArrowRight } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export function Portfolio() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const highlightedProjects = portfolioData.filter((p: any) => p.highlight);

  return (
    <section id="progetti" className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
      <div ref={ref as any} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h2 className={`font-display text-4xl sm:text-5xl text-primary ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          Progetti in evidenza
        </h2>
        <Link 
          to="/portfolio"
          className={`flex items-center gap-2 text-foreground hover:text-primary transition-colors ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}
        >
          <span>Vedi tutti i progetti</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlightedProjects.map((project: any, idx: number) => (
          <div 
            key={idx}
            className={`liquid-glass rounded-2xl overflow-hidden group cursor-pointer ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}
            style={{ animationDelay: isInView ? `${0.2 + idx * 0.1}s` : '0s' }}
          >
            <div className="aspect-[16/10] bg-secondary relative overflow-hidden flex items-center justify-center text-muted-foreground">
              {project.image ? (
                <img src={project.image} alt={project.name} loading="lazy" width="800" height="500" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
              ) : (
                <span className="z-10">[Screenshot {project.name}]</span>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-2xl">{project.name}</h3>
                <span className="liquid-glass border border-white/10 rounded-full text-xs px-3 py-1 text-primary hidden sm:block">
                  {project.role}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mt-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
