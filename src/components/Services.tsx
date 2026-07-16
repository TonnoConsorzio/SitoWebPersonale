import { useInView } from '../hooks/useInView';
import { Monitor, Layout, PenTool, Share2, Server } from 'lucide-react';
import servicesData from '../data/services.json';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = {
  Monitor,
  Layout,
  PenTool,
  Share2,
  Server
};

export function Services() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="servizi" className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
      <div ref={ref as any} className="mb-16">
        <h2 className={`font-display text-4xl sm:text-5xl text-primary ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          Cosa posso costruire per te
        </h2>
        <p className={`text-muted-foreground max-w-xl mt-4 text-lg ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          Un servizio guida, e tutto quello che serve intorno per non doverti appoggiare a nessun altro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicesData.map((service: any, idx: number) => {
          const IconComponent = iconMap[service.icon] || Monitor;
          return (
            <div 
              key={idx}
              className={`liquid-glass rounded-2xl p-8 hover:translate-y-[-4px] transition-transform duration-300 flex flex-col ${service.large ? 'md:col-span-2' : 'md:col-span-1'} ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}
              style={{ animationDelay: isInView ? `${0.2 + idx * 0.1}s` : '0s' }}
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 shrink-0">
                <IconComponent className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-display text-xl mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{service.description}</p>
              
              <div className="mt-auto pt-6">
                <Link to={`/servizi/${service.id}`} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 w-fit">
                  Scopri di più <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
