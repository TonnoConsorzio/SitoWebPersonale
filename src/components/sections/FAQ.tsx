import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export function FAQ() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // 5 core commercial FAQs for maximum clarity
  const faqIndices = [1, 2, 3, 4, 5];

  const faqs = faqIndices.map(i => ({
    question: t(`faq.q${i}`),
    answer: t(`faq.a${i}`)
  }));
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <section id="faq" ref={ref as any} className="py-24 px-6 md:px-8 max-w-4xl mx-auto">
      <div className={`mb-12 text-center ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Domande frequenti
        </h2>
      </div>

      <div className={`liquid-glass rounded-3xl p-6 md:p-8 border border-white/10 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-white/10 last:border-0">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full min-h-[64px] py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-expanded={openIdx === idx}
            >
              <h3 className="text-lg md:text-xl font-display text-foreground pr-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {faq.question}
              </h3>
              <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-[300px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line max-w-[65ch]">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
      </section>
    </>
  );
}
