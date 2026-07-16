import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';

function Counter({ end, duration = 2000 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOut cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref as any}>{count}</span>;
}

export function StatsBar() {
  return (
    <section className="relative z-10 -mt-12 max-w-5xl mx-auto px-6">
      <div className="liquid-glass rounded-2xl flex flex-col md:flex-row justify-around items-center py-8 px-4 gap-8 md:gap-0">
        <div className="text-center">
          <div className="text-5xl font-display text-primary mb-2">
            +<Counter end={12} />
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-widest">Progetti consegnati</div>
        </div>
        <div className="hidden md:block w-px h-16 bg-white/10"></div>
        <div className="text-center">
          <div className="text-5xl font-display text-primary mb-2">
            +<Counter end={5} />
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-widest">Anni di esperienza</div>
        </div>
        <div className="hidden md:block w-px h-16 bg-white/10"></div>
        <div className="text-center">
          <div className="text-5xl font-display text-primary mb-2">
            <Counter end={5} />
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-widest">Servizi offerti</div>
        </div>
      </div>
    </section>
  );
}
