import { useInView } from '../hooks/useInView';

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" ref={ref as any} className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
        <div className={`mb-12 md:mb-0 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          <h2 className="font-display text-4xl sm:text-5xl mb-6 text-primary">Ciao, sono Alessio Bellan</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4">
            Mi chiamo Alessio, sono una persona curiosa ed empatica, sempre pronta a socializzare e imparare cose nuove. Ho un talento naturale per il problem solving: quando incontro un ostacolo, adoro cercare strade alternative e soluzioni creative.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Grazie alla mia facilità di adattamento e alle doti relazionali, mi inserisco rapidamente in nuovi contesti e mi entusiasmo nel collaborare per raggiungere risultati concreti.
          </p>
          <p className="text-foreground leading-relaxed text-base md:text-lg mt-8 font-medium italic">
            Lo faccio per passione. Non sono il migliore a fare siti web, ma sono bravo a raccontare storie.*
          </p>
          <p className="text-sm text-muted-foreground/70 mt-8 border-t border-white/10 pt-6">
            * L'attività freelance è un progetto indipendente e separato dall'associazione ABBO APS.
          </p>
        </div>

        <div className={`aspect-[4/5] rounded-2xl liquid-glass overflow-hidden relative ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          <img 
            src="https://lh3.googleusercontent.com/d/13qhllagm_igvG3CHdZV-jXnzIx8MYzGm=w1000-h1000?.png" 
            alt="Alessio Bellan Ritratto" 
            loading="lazy" width="800" height="1000"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
