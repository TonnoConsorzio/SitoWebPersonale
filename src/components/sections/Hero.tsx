import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { LiquidHover } from '../ui/LiquidHover';

export function Hero() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="home" ref={ref as any} className="relative min-h-[min(820px,100svh)] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-[hsl(201,100%,13%)]">
        <div className="absolute inset-0 opacity-30">
          <LiquidHover videoSrc="/media/hero/hero.mp4" intensity={40} cursorSize={80} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center flex flex-col items-center">
        <div className={`inline-block mb-6 px-4 py-1.5 rounded-full liquid-glass text-xs md:text-sm font-medium text-primary tracking-wide ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          {t('hero.badge')}
        </div>

        <h1 className={`text-4xl sm:text-6xl md:text-7xl font-display leading-tight mb-8 max-w-4xl ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          {t('hero.title_part1')}<em className="not-italic text-muted-foreground font-display" style={{ fontFamily: "'Instrument Serif', serif" }}>{t('hero.title_highlight')}</em>
        </h1>
        
        <p className={`text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[65ch] mb-10 whitespace-pre-line ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          {t('hero.subtitle')}
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 items-center justify-center ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}>
          <a href="#contatti" className="liquid-glass rounded-full px-8 py-4 text-foreground font-medium hover:scale-[1.03] transition-transform">
            {t('hero.cta_primary')}
          </a>
          <a href="#portfolio" className="bg-white/5 border border-white/10 rounded-full px-8 py-4 text-muted-foreground font-medium hover:text-foreground hover:bg-white/10 transition-all">
            {t('hero.cta_secondary')}
          </a>
        </div>
        <p className={`mt-7 text-sm text-muted-foreground/80 ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}>
          {t('hero.microline')}
        </p>
      </div>
    </section>
  );
}
