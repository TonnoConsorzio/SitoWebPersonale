import { useInView } from '../../hooks/useInView';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import portfolio from '../../data/portfolio.json';

export function PortfolioGrid() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const previewProjects = portfolio.slice(0, 3);

  return (
    <section id="portfolio" ref={ref as any} className="py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {t('portfolio_grid.title')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
            {t('portfolio_grid.subtitle')}
          </p>
        </div>
        <Link to="/portfolio" className="text-base font-medium text-foreground hover:text-primary flex items-center transition-colors shrink-0">
          <span>{t('portfolio_grid.view_all')}</span>
          <ArrowRight className="w-5 h-5 ml-2 text-primary" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {previewProjects.map((project: any, idx: number) => {
          const category = project.category?.[currentLang] || project.category?.['it'] || '';
          const title = project.title?.[currentLang] || project.title?.['it'] || '';
          const description = project.description?.[currentLang] || project.description?.['it'] || '';
          const ctaBtn = project.cta?.[currentLang] || project.cta?.['it'] || t('portfolio_grid.cta');

          return (
            <div 
              key={project.id}
              className={`liquid-glass rounded-3xl overflow-hidden group relative flex flex-col justify-between border border-white/10 hover:border-primary/40 transition-all ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="aspect-[4/3] bg-secondary relative overflow-hidden flex items-center justify-center">
                <img src={project.image} alt={typeof title === 'string' ? title : ''} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <div className="text-base uppercase tracking-widest text-primary font-bold font-mono mb-2">{category}</div>
                  <h3 className="text-2xl font-display text-white mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-auto">
                  <Link 
                    to={`/portfolio/${project.id}`}
                    className="inline-flex items-center text-base font-medium text-foreground hover:text-primary transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>{ctaBtn}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
