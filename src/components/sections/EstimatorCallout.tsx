import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';
import { ArrowRight } from 'lucide-react';

export function EstimatorCallout() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref as any} className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
      <div className={`liquid-glass p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        
        {/* Content Side */}
        <div className="space-y-4 max-w-[65ch] relative z-10 text-center lg:text-left">
          <h2 className="text-3xl sm:text-5xl font-display text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Quanto può costare?
          </h2>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Rispondi a poche domande per ottenere una prima fascia indicativa per il tuo progetto.
          </p>

          <div className="pt-2 flex justify-center lg:justify-start">
            <Link
              to="/stima-progetto"
              className="liquid-glass rounded-full px-8 py-4 text-foreground font-medium hover:scale-[1.03] transition-transform text-base shadow-xl flex items-center gap-2"
            >
              <span>Ottieni una stima</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Visual Abstract Preview Card Side */}
        <div className="w-full lg:max-w-md liquid-glass p-6 rounded-2xl border border-white/10 space-y-4 relative z-10 font-mono text-base">
          <div className="flex items-center justify-between text-muted-foreground pb-3 border-b border-white/10">
            <span>Passaggio 2 di 4</span>
            <span className="text-primary">Stima orientativa</span>
          </div>

          {/* Segmented bar preview */}
          <div className="flex gap-1.5">
            <div className="h-2 flex-1 bg-primary rounded-full" />
            <div className="h-2 flex-1 bg-primary rounded-full" />
            <div className="h-2 flex-1 bg-white/10 rounded-full" />
            <div className="h-2 flex-1 bg-white/10 rounded-full" />
          </div>

          <div className="p-5 rounded-xl bg-black/40 border border-white/5 space-y-2">
            <span className="text-base text-muted-foreground uppercase">Fascia indicativa:</span>
            <div className="text-2xl md:text-3xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              1.200 € – 1.800 €
            </div>
            <p className="text-base text-muted-foreground font-sans leading-relaxed">
              Calcolata in base alle risposte fornite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
