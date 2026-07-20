import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { LiquidHover } from '../ui/LiquidHover';
import aboutData from '../../data/about.json';

export function About() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const about = aboutData;

  return (
    <section id="about" ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className={`${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>{t('about.title')}</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p className="text-foreground leading-relaxed text-base md:text-lg mt-8 font-medium italic">
              {t('about.quote')}
            </p>
            <p className="text-sm text-muted-foreground/70 mt-8 border-t border-white/10 pt-6">
              {t('about.footer')}
            </p>
          </div>
        </div>
        
        <div className={`${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          <div className="aspect-[4/5] liquid-glass rounded-2xl overflow-hidden relative flex items-center justify-center">
            <LiquidHover imageSrc={about.image} intensity={25} />
          </div>
        </div>
      </div>
    </section>
  );
}
