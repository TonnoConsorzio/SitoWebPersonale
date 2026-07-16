import { useInView } from '../hooks/useInView';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Essenziale",
    price: "€800",
    description: "Sito vetrina one-page, perfetto per iniziare.",
    features: ["Design su misura", "Ottimizzazione Mobile & SEO", "Form di contatto", "Hosting 1° anno incluso"],
    highlight: false
  },
  {
    name: "Professionale",
    price: "€1.500",
    description: "Sito completo con identità visiva di base.",
    features: ["Fino a 5 pagine", "Integrazione CMS", "Brand kit essenziale", "Performance premium"],
    highlight: true
  },
  {
    name: "Su misura",
    price: "Preventivo",
    description: "Gestionali, app custom e sistemi complessi.",
    features: ["Sviluppo full-stack", "Integrazione API esterne", "Architettura cloud dedicata", "Supporto continuativo"],
    highlight: false
  }
];

export function Pricing() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="prezzi" className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
      <div ref={ref as any} className="mb-16 text-center">
        <h2 className={`font-display text-4xl sm:text-5xl ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          Pacchetti
        </h2>
        <p className={`text-muted-foreground max-w-xl mx-auto mt-4 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          Prezzi chiari, pensati per iniziare senza sorprese.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {plans.map((plan, idx) => (
          <div 
            key={idx}
            className={`liquid-glass rounded-2xl p-8 flex flex-col h-full ${plan.highlight ? 'border border-white/20 md:scale-105 z-10' : ''} ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}
            style={{ animationDelay: isInView ? `${0.2 + idx * 0.1}s` : '0s' }}
          >
            {plan.highlight && (
              <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold mb-4 block">
                Consigliato
              </span>
            )}
            <h3 className="font-display text-2xl mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold mb-4">{plan.price}</div>
            <p className="text-muted-foreground text-sm mb-8 flex-grow">{plan.description}</p>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feat, fidx) => (
                <li key={fidx} className="flex items-start text-sm text-muted-foreground">
                  <Check className="w-4 h-4 mr-3 mt-0.5 text-white/70" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button className={`liquid-glass rounded-full w-full py-3 text-sm text-foreground hover:scale-[1.02] transition-transform cursor-pointer ${plan.highlight ? 'bg-white/10' : ''}`}>
              Richiedi
            </button>
          </div>
        ))}
      </div>

      <div className={`mt-16 text-center text-sm text-muted-foreground/80 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
        Una parte di ogni progetto sostiene ABBO APS, l'associazione di terzo settore che presiedo.
      </div>
    </section>
  );
}
