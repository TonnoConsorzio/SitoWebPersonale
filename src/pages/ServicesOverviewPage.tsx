import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { SEO } from '../components/SEO';
import { useInView } from '../hooks/useInView';
import servicesData from '../data/servicesData.json';
import { Globe, Layout, Settings, Layers, Network, Bot, Server, ArrowRight } from 'lucide-react';

const iconMap: Record<string, any> = {
  'siti-web': Globe,
  'gestionali-web-app': Layout,
  'automazioni': Settings,
  'grafica-identita': Layers,
  'social-media': Network,
  'formazione-ai': Bot,
  'infrastrutture': Server
};

export function ServicesOverviewPage() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const data = servicesData.overview;
  const primaryOrder = ['siti-web', 'automazioni', 'gestionali-web-app'];
  const orderedServices = [...data.grid].sort((a, b) => {
    const aIndex = primaryOrder.indexOf(a.id);
    const bIndex = primaryOrder.indexOf(b.id);
    return (aIndex === -1 ? primaryOrder.length : aIndex) - (bIndex === -1 ? primaryOrder.length : bIndex);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Servizi | Alessio Bellan"
        description="Siti web, gestionali, automazioni, grafica, social media, formazione AI e infrastrutture per il tuo lavoro."
        canonical="/servizi"
      />
      <Navigation />

      <main className="relative pt-28 pb-24 overflow-hidden space-y-16">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-8 py-12">
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display leading-tight mb-6">
              {data.title1} <br />
              <em className="not-italic text-muted-foreground font-display" style={{ fontFamily: "'Instrument Serif', serif" }}>{data.title2}</em>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
              {data.subtitle}
            </p>

            <Link
              to="/stima-progetto" 
              className="liquid-glass rounded-full px-8 py-3.5 text-foreground font-medium hover:scale-[1.03] transition-transform text-sm shadow-xl"
            >
              {data.heroCta}
            </Link>
          </div>
        </section>

        {/* Introduzione Section */}
        <section ref={ref as any} className="px-6 md:px-8 max-w-4xl mx-auto">
          <div className={`liquid-glass rounded-3xl p-8 md:p-10 text-center space-y-4 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {data.introTitle}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {data.introText1} {data.introText2}
            </p>
          </div>
        </section>

        {/* Griglia dei Servizi Interattiva */}
        <section className="px-6 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              I servizi principali
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderedServices.map((item) => {
              const Icon = iconMap[item.id] || Globe;
              const isHovered = hoveredCard === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`liquid-glass p-8 rounded-3xl flex flex-col justify-between min-h-[300px] border transition-all duration-300 group relative overflow-hidden ${
                    isHovered
                      ? 'border-primary/50 scale-[1.01] bg-white/10'
                      : 'border-white/10 hover:border-primary/30'
                  }`}
                >
                  <div>
                    <div className="p-3.5 rounded-2xl bg-white/5 w-fit mb-6 border border-white/10 text-primary group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-2xl font-display text-foreground mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <Link
                      to={item.path}
                      className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors group-hover:translate-x-1 duration-300"
                    >
                      <span>{item.linkText}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Metodo Section */}
        <section className="px-6 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display text-foreground mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Metodo di Lavoro
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.method.map((step, idx) => (
              <div key={idx} className="liquid-glass p-6 rounded-3xl flex flex-col justify-between min-h-[220px] border border-white/10 relative">
                <span className="text-3xl font-display font-bold text-primary/40 mb-3">{step.step}</span>
                <div>
                  <h3 className="text-lg font-display text-foreground mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Finale Section */}
        <section className="px-6 md:px-8 max-w-4xl mx-auto text-center">
          <div className="liquid-glass rounded-3xl p-8 md:p-10 text-center space-y-4 border border-primary/30">
            <h2 className="text-3xl md:text-4xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {data.ctaTitle}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
              {data.ctaText}
            </p>
            <div className="pt-2">
              <Link 
                to="/stima-progetto" 
                className="liquid-glass rounded-full px-8 py-3.5 text-foreground font-medium hover:scale-[1.03] transition-transform text-sm inline-block"
              >
                {data.ctaBtn}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
