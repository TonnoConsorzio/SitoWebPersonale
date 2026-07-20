import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function FAQ() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({
    question: t(`faq.q${i}`),
    answer: t(`faq.a${i}`)
  }));

  return (
    <section id="faq" ref={ref as any} className="py-24 px-8 max-w-4xl mx-auto">
      <div className={`mb-16 text-center ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>{t('faq.title')}</h2>
      </div>

      <div className={`liquid-glass rounded-3xl p-6 md:p-8 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-white/5 last:border-0">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
            >
              <h3 className="text-2xl font-display text-foreground pr-8" style={{ fontFamily: "'Instrument Serif', serif" }}>{faq.question}</h3>
              <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
