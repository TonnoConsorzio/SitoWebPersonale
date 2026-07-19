import { Check } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

export function PricingPackages() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const packages = [
    {
      name: "Presenza Digitale",
      price: "790€",
      originalPrice: "880€",
      savings: "Risparmio 90€",
      features: [
        "Sito Essenziale",
        "Logo"
      ]
    },
    {
      name: "Crescita",
      price: "2.030€",
      originalPrice: "2.255€",
      savings: "Risparmio 225€",
      featured: true,
      features: [
        "Sito Standard",
        "Brand Kit",
        "Setup Server"
      ]
    },
    {
      name: "Full Experience",
      price: "4.450€",
      originalPrice: "4.950€",
      savings: "Risparmio 500€",
      features: [
        "Sito Su Misura",
        "Identità Completa",
        "Gestionale Base"
      ]
    }
  ];

  return (
    <section id="prezzi" ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className={`text-center mb-16 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Pacchetti & Piani</h2>
        <p className="text-muted-foreground text-lg">Le configurazioni più richieste e ottimali per partire.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, idx) => (
          <div 
            key={idx} 
            className={`liquid-glass rounded-3xl p-8 flex flex-col ${pkg.featured ? 'border border-primary/30 shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-white/10' : ''} ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
            style={{ animationDelay: `${0.1 * idx}s` }}
          >
            {pkg.featured && (
              <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-max mb-6">
                Consigliato
              </div>
            )}
            <h3 className={`text-xl font-medium text-foreground ${!pkg.featured ? 'mb-4' : 'mb-4'}`}>{pkg.name}</h3>
            <div className="mb-8">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-display text-primary">{pkg.price}</span>
                <span className="text-sm text-muted-foreground line-through mb-1.5">{pkg.originalPrice}</span>
              </div>
              <div className="text-sm font-medium text-emerald-400">{pkg.savings}</div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {pkg.features.map((feat, fidx) => (
                <li key={fidx} className="flex items-start gap-3 text-muted-foreground text-sm">
                  <Check className="w-5 h-5 text-foreground shrink-0" strokeWidth={1.5} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            
            <a href="#contatti" className={`block text-center w-full rounded-full py-4 font-medium transition-colors ${
              pkg.featured 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'bg-white/5 text-foreground hover:bg-white/10'
            }`}>
              Richiedi info
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
