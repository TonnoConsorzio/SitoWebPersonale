import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import config from '../../data/config.json';

export function Testimonials() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'it') as 'it' | 'en';
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const testimonials = config.testimonials;

  return (
    <section ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className={`mb-16 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {t('testimonials.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((test, idx) => {
          const quoteText = typeof test.quote === 'string' ? test.quote : (test.quote[currentLang] || test.quote['it']);
          const roleText = typeof test.role === 'string' ? test.role : (test.role[currentLang] || test.role['it']);

          return (
            <div 
              key={idx}
              className={`liquid-glass rounded-2xl p-8 flex flex-col justify-between ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <p className="text-lg text-foreground italic leading-relaxed mb-8">
                "{quoteText}"
              </p>
              <div>
                <div className="font-medium text-foreground">{test.name}</div>
                <div className="text-sm text-muted-foreground">{roleText}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
