import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import portfolio from '../../data/portfolio.json';

export function PortfolioGrid() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const projects = portfolio;
  const previewProjects = projects.slice(0, 3); // show only up to 3 on home

  return (
    <section id="portfolio" ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className={`mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <div>
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Alcuni progetti</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Una selezione di lavori per capire come approccio le diverse sfide.
          </p>
        </div>
        <Link to="/portfolio" className="text-sm font-medium text-foreground hover:text-primary flex items-center transition-colors">
          Vedi il portfolio completo <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {previewProjects.map((project, idx) => (
          <Link 
            key={project.id}
            to="/portfolio"
            className={`rounded-2xl overflow-hidden cursor-pointer group relative flex flex-col ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
            style={{ animationDelay: `${0.1 * idx}s` }}
          >
            <div className="aspect-[4/3] bg-secondary relative overflow-hidden flex items-center justify-center group">
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <div className="text-[10px] uppercase tracking-widest text-primary font-bold">{project.category}</div>
              </div>
              <h3 className="text-2xl font-display text-white mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {project.title}
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.description}
              </p>
            </div>

          </Link>
        ))}
      </div>
    </section>
  );
}
