import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';
import curriculumData from '../data/curriculum.json';

export function CurriculumPreview() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const experiencePreview = curriculumData.slice(0, 3);

  return (
    <section id="curriculum" className="py-24 px-6 md:px-8 max-w-3xl mx-auto border-t border-white/5">
      <div ref={ref as any} className="mb-16">
        <h2 className={`font-display text-4xl sm:text-5xl text-primary mb-4 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          Il mio percorso
        </h2>
        <p className={`text-muted-foreground ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          Le esperienze principali che mi hanno portato fin qui.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {experiencePreview.map((item, idx) => (
          <div 
            key={item.id} 
            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}
            style={{ animationDelay: isInView ? `${0.2 + idx * 0.1}s` : '0s' }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-background text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] liquid-glass p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                <time className="text-xs text-primary/80 font-mono mt-1 sm:mt-0">{item.period}</time>
              </div>
              <div className="text-sm font-medium text-foreground/80 mb-4">{item.company}</div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-12 text-center relative z-20 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
        <Link 
          to="/curriculum"
          className="liquid-glass inline-block rounded-full px-8 py-3 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
        >
          Vedi l'intero percorso
        </Link>
      </div>
    </section>
  );
}
