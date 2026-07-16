import { useInView } from '../hooks/useInView';
import { Award } from 'lucide-react';
import certificationsData from '../data/certifications.json';

export function Certifications() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certificazioni" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div ref={ref as any} className="mb-16">
        <h2 className={`font-display text-4xl sm:text-5xl text-primary ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          Le mie certificazioni
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsData.map((cert: any, idx: number) => (
          <div 
            key={idx}
            className={`liquid-glass rounded-xl overflow-hidden group ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}
            style={{ animationDelay: isInView ? `${0.2 + (idx % 3) * 0.1}s` : '0s' }}
          >
            <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
              <img src={cert.image} alt={cert.title} loading="lazy" width="400" height="300" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg leading-tight mb-2 line-clamp-2">{cert.title}</h3>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <Award className="w-4 h-4" />
                {cert.issuer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
