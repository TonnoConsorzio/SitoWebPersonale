import { useInView } from '../../hooks/useInView';
import config from '../../data/config.json';

export function Testimonials() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const testimonials = config.testimonials;

  return (
    <section ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className={`mb-16 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Dicono di me</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((test, idx) => (
          <div 
            key={idx}
            className={`liquid-glass rounded-2xl p-8 flex flex-col justify-between ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
            style={{ animationDelay: `${0.1 * idx}s` }}
          >
            <p className="text-lg text-foreground italic leading-relaxed mb-8">
              "{test.quote}"
            </p>
            <div>
              <div className="font-medium text-foreground">{test.name}</div>
              <div className="text-sm text-muted-foreground">{test.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
