import { Check } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import packagesData from '../../data/pricingPackages.json';

export function PricingPackages() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const packages = packagesData;

  return (
    <section id="pacchetti" ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className={`text-center mb-16 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {t('pricing_packages.title')}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
          {t('pricing_packages.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg: any, idx: number) => {
          const name = pkg.name?.[currentLang] || pkg.name?.['it'] || '';
          const description = pkg.description?.[currentLang] || pkg.description?.['it'] || '';
          const featuresList = pkg.features?.[currentLang] || pkg.features?.['it'] || [];
          const ctaBtnText = pkg.cta?.[currentLang] || pkg.cta?.['it'] || t('pricing_packages.cta');
          const savingsText = pkg.savings?.[currentLang] || pkg.savings?.['it'] || '';

          return (
            <div 
              key={idx} 
              className={`liquid-glass rounded-3xl p-8 flex flex-col justify-between ${pkg.featured ? 'border border-primary/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-white/10' : ''} ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div>
                {pkg.featured && (
                  <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-max mb-6">
                    {t('pricing_packages.recommended')}
                  </div>
                )}
                <h3 className="text-2xl font-medium text-foreground mb-2">{name}</h3>
                <div className="mb-6 flex flex-wrap items-baseline gap-2">
                  <span className="text-4xl font-display text-primary">{pkg.price}</span>
                  {pkg.originalPrice && (
                    <span className="text-lg text-muted-foreground/60 line-through font-display">{pkg.originalPrice}</span>
                  )}
                  {savingsText && (
                    <span className="w-full text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full w-fit mt-1">
                      {savingsText}
                    </span>
                  )}
                </div>
                {description && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 border-b border-white/10 pb-6">
                    {description}
                  </p>
                )}
                
                <ul className="space-y-4 mb-8">
                  {featuresList.map((feat: string, fidx: number) => (
                    <li key={fidx} className="flex items-start gap-3 text-muted-foreground text-sm">
                      <Check className="w-5 h-5 text-primary shrink-0" strokeWidth={1.5} />
                      <span className="text-foreground/90">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <a href="#contatti" className={`block text-center w-full rounded-full py-4 font-medium transition-transform hover:scale-[1.02] ${
                pkg.featured 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'liquid-glass text-foreground hover:bg-white/10'
              }`}>
                {ctaBtnText}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
