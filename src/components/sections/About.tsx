import { useInView } from '../../hooks/useInView';
import config from '../../data/config.json';

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const about = config.about;

  return (
    <section id="about" ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className={`${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>{about.title}</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            {about.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <p className="text-foreground leading-relaxed text-base md:text-lg mt-8 font-medium italic">
              {about.quote}
            </p>
            <p className="text-sm text-muted-foreground/70 mt-8 border-t border-white/10 pt-6">
              * {about.disclaimer}
            </p>
          </div>
        </div>
        
        <div className={`${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          <div className="aspect-[4/5] liquid-glass rounded-2xl overflow-hidden relative flex items-center justify-center">
            <img 
              src="https://lh3.googleusercontent.com/d/13qhllagm_igvG3CHdZV-jXnzIx8MYzGm=w1000-h1000?.png" 
              alt="Alessio Bellan Ritratto" 
              loading="lazy" width="800" height="1000"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
