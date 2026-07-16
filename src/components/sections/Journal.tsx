import { useInView } from '../../hooks/useInView';
import { Linkedin, Instagram, ArrowRight } from 'lucide-react';
import config from '../../data/config.json';

const articles = [
  {
    title: "Perché un sito web non è una brochure digitale",
    excerpt: "L'errore più comune che le PMI fanno quando decidono di investire nella loro presenza online.",
  },
  {
    title: "Come scegliere lo stack tecnologico giusto",
    excerpt: "React, Vue, o WordPress? Una guida pratica per non perdersi nella giungla dei framework.",
  },
  {
    title: "Il valore invisibile dell'accessibilità",
    excerpt: "Costruire interfacce usabili da tutti non è solo un obbligo morale, ma un vantaggio competitivo.",
  }
];

export function Journal() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="journal" ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className={`mb-16 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Journal</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {articles.map((article, idx) => (
          <div 
            key={idx}
            className={`liquid-glass rounded-2xl p-8 flex flex-col justify-between group cursor-pointer ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
            style={{ animationDelay: `${0.1 * idx}s` }}
          >
            <div>
              <h3 className="text-2xl font-display text-foreground mb-4 group-hover:text-primary transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>{article.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">{article.excerpt}</p>
            </div>
            <div className="flex items-center text-sm font-medium text-foreground">
              Leggi <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      <div className={`flex flex-col items-center justify-center text-center ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}>
        
        <p className="text-lg text-foreground mb-6">Seguimi per aggiornamenti</p>
        <div className="flex gap-4">
          <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-4 text-foreground hover:scale-[1.05] hover:bg-white/10 transition-all">
            <Linkedin className="w-6 h-6" strokeWidth={1.5} />
          </a>
          <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-4 text-foreground hover:scale-[1.05] hover:bg-white/10 transition-all">
            <Instagram className="w-6 h-6" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
