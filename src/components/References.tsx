import { useInView } from '../hooks/useInView';
import { Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const references = [
  {
    text: {
      it: "La combinazione di leadership, problem solving e capacità di networking rende Alessio una risorsa preziosa per qualsiasi iniziativa.",
      en: "The combination of leadership, problem solving, and networking skills makes Alessio a valuable asset for any initiative."
    },
    author: "Vincenzo Romano",
    role: {
      it: "Manager",
      en: "Manager"
    }
  },
  {
    text: {
      it: "Lavorare sotto la sua guida ha significato avere obiettivi chiari e un supporto sempre presente. In pochi avrebbero saputo gestire un progetto così ampio e complesso con la stessa efficacia.",
      en: "Working under his leadership meant having clear goals and constant support. Few could have managed such a large and complex project with the same effectiveness."
    },
    author: "Alessio Buso",
    role: {
      it: "Graphic Designer & Visual Creator",
      en: "Graphic Designer & Visual Creator"
    }
  }
];

export function References() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'it') as 'it' | 'en';
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="referenze" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div ref={ref as any} className="mb-16">
        <h2 className={`font-display text-4xl sm:text-5xl text-primary ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          {t('testimonials.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {references.map((refItem, idx) => (
          <div 
            key={idx}
            className={`liquid-glass rounded-2xl p-8 relative ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}
            style={{ animationDelay: isInView ? `${0.2 + idx * 0.1}s` : '0s' }}
          >
            <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
            <p className="text-lg text-foreground leading-relaxed font-medium italic mb-8 relative z-10">
              "{refItem.text[currentLang]}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-display text-xl text-primary">
                {refItem.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-display text-lg">{refItem.author}</h4>
                <p className="text-sm text-muted-foreground">{refItem.role[currentLang]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
