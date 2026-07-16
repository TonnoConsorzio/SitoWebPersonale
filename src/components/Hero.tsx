import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

export function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] min-h-screen overflow-hidden bg-background">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/hero-poster.jpg"
      >
        <source src="./media/hero/hero-placeholder.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto">
        <h1 className={`text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal font-display ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          Ogni sito <span className="text-primary font-display">racconta una storia.</span> Costruiamo la tua.
        </h1>
        
        <p className={`text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          Progetto e sviluppo siti web, gestionali e identità digitali per chi ha qualcosa da dire. Ogni progetto nasce da un'idea, non da un template.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 mt-12 ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}>
          <Link 
            to="/portfolio"
            className="liquid-glass rounded-full px-10 py-4 text-base text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
          >
            Scopri i progetti
          </Link>
          <Link 
            to="/prezzi"
            className="bg-primary text-primary-foreground rounded-full px-10 py-4 text-base font-medium hover:scale-[1.03] transition-transform cursor-pointer shadow-lg shadow-primary/20"
          >
            Vedi i prezzi
          </Link>
        </div>
      </div>
    </section>
  );
}
