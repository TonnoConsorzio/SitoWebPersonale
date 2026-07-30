import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import certifications from '../../data/certifications.json';
import { Award, ArrowRight } from 'lucide-react';

export function Certifications() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const firstFourCerts = certifications.slice(0, 4);
  const remainingCerts = certifications.slice(4);

  return (
    <section id="certifications" ref={ref as any} className="py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground flex items-center gap-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            <Award className="w-10 h-10 text-primary shrink-0" strokeWidth={1.5} />
            Certificazioni ({certifications.length})
          </h2>
        </div>
        <Link 
          to="/curriculum" 
          className="text-base font-medium text-primary hover:underline flex items-center transition-colors shrink-0"
        >
          <span>Vedi il curriculum completo →</span>
        </Link>
      </div>

      {/* Top 4 Certifications with Image Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {firstFourCerts.map((cert: any, idx: number) => {
          const title = cert.title?.[currentLang] || cert.title?.['it'] || '';

          return (
            <div 
              key={idx}
              className={`liquid-glass rounded-2xl p-6 flex flex-col justify-between group overflow-hidden border border-white/10 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="aspect-video mb-4 overflow-hidden rounded-xl bg-white/5 relative">
                <img 
                  src={cert.image} 
                  alt={typeof title === 'string' ? title : ''} 
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-medium text-foreground leading-snug">
                  {title}
                </h3>
                <p className="text-base text-primary/90 font-mono font-semibold uppercase">
                  {cert.issuer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Remaining Certifications as Clean 16px Text-Only Grid */}
      {remainingCerts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {remainingCerts.map((cert: any, idx: number) => {
            const title = cert.title?.[currentLang] || cert.title?.['it'] || '';

            return (
              <div 
                key={idx}
                className="liquid-glass p-5 rounded-2xl border border-white/10 space-y-1 hover:border-primary/30 transition-colors"
              >
                <h4 className="text-base font-medium text-foreground leading-snug">
                  {title}
                </h4>
                <p className="text-base text-primary/80 font-mono">
                  {cert.issuer}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
