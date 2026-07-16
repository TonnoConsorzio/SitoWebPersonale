import { useInView } from '../../hooks/useInView';

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="contatti" ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className={`mb-16 text-center ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Lavoriamo insieme</h2>
        <p className="text-muted-foreground text-lg">Raccontami il tuo progetto o prenota direttamente una chiamata.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`liquid-glass rounded-3xl p-8 md:p-12 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">Nome</label>
              <input type="text" id="name" className="w-full bg-input/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors" placeholder="Il tuo nome" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">Email</label>
              <input type="email" id="email" className="w-full bg-input/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors" placeholder="la.tua@email.it" />
            </div>
            <div>
              <label htmlFor="service" className="block text-sm text-muted-foreground mb-2">Servizio di interesse</label>
              <select id="service" className="w-full bg-input/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors appearance-none">
                <option value="">Seleziona un servizio...</option>
                <option value="web">Sito Web</option>
                <option value="app">Gestionale / App</option>
                <option value="brand">Grafica & Brand</option>
                <option value="social">Social Media</option>
                <option value="infra">Infrastrutture</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">Messaggio</label>
              <textarea id="message" rows={4} className="w-full bg-input/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder="Raccontami il tuo progetto..."></textarea>
            </div>
            <button type="button" className="w-full liquid-glass rounded-full py-4 text-foreground font-medium hover:scale-[1.02] transition-transform">
              Invia richiesta
            </button>
          </form>
        </div>

        <div className={`liquid-glass rounded-3xl p-8 md:p-12 flex flex-col h-full min-h-[500px] ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}>
          <h3 className="text-2xl font-display text-foreground mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>Prenota una chiamata conoscitiva</h3>
          <div className="flex-1 rounded-xl overflow-hidden bg-background/50 border border-white/10 relative flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
            <p className="text-muted-foreground mb-8">
              Scegli il momento migliore per te direttamente dal mio calendario. Ne parleremo davanti a un caffè virtuale.
            </p>
            <a 
              href="https://calendar.app.google/GLseASBXvsbYPY5m7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-8 py-4 text-foreground font-medium hover:scale-[1.03] transition-transform inline-block"
            >
              Prenota su Google Calendar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
