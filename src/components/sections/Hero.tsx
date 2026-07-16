import { useInView } from '../../hooks/useInView';

export function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref as any} className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-[hsl(201,100%,13%)]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="./hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="./media/hero/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center flex flex-col items-center">
        <h1 className={`text-5xl sm:text-7xl md:text-8xl font-display leading-tight mb-8 max-w-5xl ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          Ogni sito <em className="not-italic text-muted-foreground font-display" style={{ fontFamily: "'Instrument Serif', serif" }}>racconta una storia.</em><br/>Costruiamo la tua.
        </h1>
        
        <p className={`text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-12 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          Progetto e sviluppo siti web, gestionali e identità digitali per chi ha qualcosa da dire. Ogni progetto nasce da un'idea, non da un template.
        </p>

        <a href="#portfolio" className={`liquid-glass rounded-full px-8 py-4 text-foreground font-medium hover:scale-[1.03] transition-transform ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}>
          Scopri i progetti
        </a>
      </div>
    </section>
  );
}
