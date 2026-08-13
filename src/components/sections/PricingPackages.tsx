import { useInView } from '../../hooks/useInView';
import { Link } from 'react-router-dom';

const offers = [
  {
    name: 'Sito Essenziale',
    price: '890 €',
    description: 'Un sito chiaro per presentare la tua attività e ricevere richieste.',
    included: ['Fino a 5 pagine', 'Versione responsive', 'Modulo di contatto', 'Configurazione tecnica e pubblicazione', 'Ottimizzazione tecnica di base'],
    timing: '7–10 giorni',
    note: 'Perimetro standard e definito. Testi, foto e branding li fornisci tu. E-commerce, CMS, login, gestionali e funzioni avanzate sono esclusi. Include 2 cicli di modifica.',
    cta: 'Verifica il tuo progetto'
  },
  {
    name: 'Automation Sprint',
    price: 'da 490 €',
    description: 'Eliminiamo un’attività manuale dal tuo lavoro.',
    included: ['Analisi del processo', '1 flusso automatico', '2–3 strumenti standard', 'Test del flusso', '14 giorni per correggere eventuali bug'],
    timing: '3–7 giorni',
    note: 'Se automatizzarlo non conviene, te lo dico prima di iniziare.',
    cta: 'Raccontami cosa fai a mano'
  }
];

export function PricingPackages() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="pacchetti" ref={ref as any} className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
      <div className={`text-center mb-16 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Partiamo da qualcosa di concreto.
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Tre modi semplici per iniziare, con perimetro, tempi e aspettative chiari.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {offers.map((offer, idx) => {
          return (
            <div 
              key={offer.name}
              className={`liquid-glass rounded-2xl p-7 md:p-8 flex flex-col justify-between border border-white/10 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3">
                  <h3 className="text-3xl font-display text-foreground">{offer.name}</h3>
                  <span className="text-3xl font-display text-primary">{offer.price}</span>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-[52ch]">{offer.description}</p>
                
                <ul className="space-y-3 mb-7 border-y border-white/10 py-5">
                  {offer.included.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-base text-muted-foreground">
                      <span className="text-primary" aria-hidden="true">✓</span>
                      <span className="text-foreground/90">{feat}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{offer.note}</p>
                <p className="text-sm text-primary font-medium">Tempi indicativi: {offer.timing}</p>
              </div>
              
              <a href="#contatti" className="mt-8 block text-center w-full bg-primary text-primary-foreground rounded-full py-4 font-medium hover:bg-primary/90 transition-colors">
                {offer.cta}
              </a>
            </div>
          );
        })}
      </div>

      <div className={`mt-6 border border-white/10 rounded-2xl p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
        <div>
          <h3 className="text-2xl font-display text-foreground mb-2">Pilot Web White Label</h3>
          <p className="text-base text-muted-foreground leading-relaxed max-w-[60ch]">Per agenzie e studi che cercano uno sviluppatore affidabile dietro le quinte.</p>
        </div>
        <Link to="/agenzie" className="shrink-0 text-primary font-medium hover:text-foreground transition-colors">Scopri il lavoro white label</Link>
      </div>
    </section>
  );
}
