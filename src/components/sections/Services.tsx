import { Globe, Layout, Layers, Network, Server } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

export function Services() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="servizi" ref={ref as any} className="py-32 px-8 max-w-7xl mx-auto">
      <div className={`mb-16 md:mb-24 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Cosa posso costruire per te</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-2 liquid-glass rounded-2xl p-10 flex flex-col justify-end min-h-[320px] ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          <Globe className="w-12 h-12 text-foreground mb-8" strokeWidth={1} />
          <h3 className="text-3xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Siti Web</h3>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
            Design e sviluppo di siti che raccontano chi sei, non solo cosa vendi.
          </p>
        </div>

        <div className={`liquid-glass rounded-2xl p-10 flex flex-col justify-end min-h-[320px] ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}>
          <Layout className="w-12 h-12 text-foreground mb-8" strokeWidth={1} />
          <h3 className="text-2xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Gestionali & App</h3>
          <p className="text-muted-foreground leading-relaxed">
            Strumenti su misura per ottimizzare il tuo flusso di lavoro.
          </p>
        </div>

        <div className={`liquid-glass rounded-2xl p-10 flex flex-col justify-end min-h-[320px] ${isInView ? 'animate-fade-rise' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <Layers className="w-12 h-12 text-foreground mb-8" strokeWidth={1} />
          <h3 className="text-2xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Grafica & Identità</h3>
          <p className="text-muted-foreground leading-relaxed">
            Identità visiva coerente, creata da un esperto con background già formato (senza costi aggiuntivi).
          </p>
        </div>

        <div className={`liquid-glass rounded-2xl p-10 flex flex-col justify-end min-h-[320px] ${isInView ? 'animate-fade-rise' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <Network className="w-12 h-12 text-foreground mb-8" strokeWidth={1} />
          <h3 className="text-2xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Social Media</h3>
          <p className="text-muted-foreground leading-relaxed">
            Gestione strategica per costruire una community e raccontare il tuo valore.
          </p>
        </div>

        <div className={`liquid-glass rounded-2xl p-10 flex flex-col justify-end min-h-[320px] ${isInView ? 'animate-fade-rise' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <Server className="w-12 h-12 text-foreground mb-8" strokeWidth={1} />
          <h3 className="text-2xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Infrastrutture</h3>
          <p className="text-muted-foreground leading-relaxed">
            Setup server e architetture Docker per garantire stabilità e performance.
          </p>
        </div>
      </div>
    </section>
  );
}
