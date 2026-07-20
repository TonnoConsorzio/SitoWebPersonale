import { Globe, Layout, Layers, Network, Server, Settings } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import services from '../../data/services.json';

const iconMap: Record<string, any> = {
  globe: Globe,
  layout: Layout,
  layers: Layers,
  network: Network,
  server: Server,
  settings: Settings
};

export function Services() {
  const { t, i18n } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';

  return (
    <section id="servizi" ref={ref as any} className="py-32 px-8 max-w-7xl mx-auto">
      <div className={`mb-16 md:mb-24 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>{t('services.title')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service: any, idx: number) => {
          const Icon = iconMap[service.icon];
          const delay = idx > 1 ? `${0.2 + (idx - 1) * 0.1}s` : '0s';
          const animationClass = idx === 0 ? 'animate-fade-rise-delay' : idx === 1 ? 'animate-fade-rise-delay-2' : 'animate-fade-rise';
          const colSpan = idx === 0 ? 'md:col-span-2' : '';
          const title = service.title?.[currentLang] || service.title?.['it'] || '';
          const description = service.description?.[currentLang] || service.description?.['it'] || '';
          
          return (
            <div key={service.id} className={`${colSpan} liquid-glass rounded-2xl p-10 flex flex-col justify-end min-h-[320px] ${isInView ? animationClass : 'opacity-0'}`} style={{ animationDelay: delay }}>
              {Icon && <Icon className="w-12 h-12 text-foreground mb-8" strokeWidth={1} />}
              <h3 className="text-2xl md:text-3xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>{title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
