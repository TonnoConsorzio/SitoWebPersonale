import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import certifications from '../../data/certifications.json';
import { Award } from 'lucide-react';

export function Certifications() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'it' | 'en';
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certifications" ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className={`mb-16 md:mb-24 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground flex items-center gap-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
          <Award className="w-10 h-10 text-primary" strokeWidth={1.5} />
          {t('certifications.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, idx) => (
          <div 
            key={idx}
            className={`liquid-glass rounded-2xl p-6 flex flex-col group overflow-hidden ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
            style={{ animationDelay: `${0.1 * (idx % 3)}s` }}
          >
            <div className="aspect-video mb-6 overflow-hidden rounded-xl bg-white/5 relative">
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col flex-grow justify-end">
              <h3 className="text-lg md:text-xl font-medium text-foreground leading-tight mb-3">
                {cert.title[currentLang]}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-wider font-semibold">
                {cert.issuer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
