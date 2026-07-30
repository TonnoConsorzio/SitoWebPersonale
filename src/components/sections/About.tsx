import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { LiquidHover } from '../ui/LiquidHover';
import aboutData from '../../data/about.json';
import { Heart } from 'lucide-react';

export function About() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const about = aboutData;

  const paragraphs: string[] = Array.isArray(about.paragraphs) ? about.paragraphs : [];

  return (
    <section id="about" ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className={`${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {t('about.title')}
          </h2>
          {t('about.subtitle') && (
            <p className="text-xl font-medium text-primary mb-8">
              {t('about.subtitle')}
            </p>
          )}

          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            <div className="pt-4">
              <a 
                href="#formazione" 
                className="inline-block liquid-glass rounded-full px-6 py-3 text-foreground font-medium hover:scale-[1.03] transition-transform text-sm"
              >
                {t('about.cta')}
              </a>
            </div>

            <div className="mt-8 liquid-glass p-6 rounded-2xl border border-white/10 relative">
              <div className="flex items-center gap-3 mb-2 text-foreground font-display text-xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
                <Heart className="w-5 h-5 text-primary shrink-0" />
                <span>{t('about.box_title')}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('about.box_text')}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`sticky top-28 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          <div className="aspect-[4/5] liquid-glass rounded-2xl overflow-hidden relative flex items-center justify-center">
            <LiquidHover imageSrc={about.image} intensity={25} />
          </div>
        </div>
      </div>
    </section>
  );
}
