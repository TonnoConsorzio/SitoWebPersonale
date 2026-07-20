import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { LiquidHover } from '../ui/LiquidHover';

export function Hero() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref as any} className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-[hsl(201,100%,13%)]">
        <div className="absolute inset-0 opacity-30">
          <LiquidHover videoSrc="./media/hero/hero.mp4" intensity={40} cursorSize={80} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center flex flex-col items-center">
        <h1 className={`text-5xl sm:text-7xl md:text-8xl font-display leading-tight mb-8 max-w-5xl ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          {t('hero.title_part1')}<em className="not-italic text-muted-foreground font-display" style={{ fontFamily: "'Instrument Serif', serif" }}>{t('hero.title_highlight')}</em><br/>{t('hero.title_part2')}
        </h1>
        
        <p className={`text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-12 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          {t('hero.subtitle')}
        </p>

        <a href="#portfolio" className={`liquid-glass rounded-full px-8 py-4 text-foreground font-medium hover:scale-[1.03] transition-transform ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}>
          {t('hero.cta')}
        </a>
      </div>
    </section>
  );
}
