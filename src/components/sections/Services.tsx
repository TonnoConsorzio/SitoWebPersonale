import { Globe, Layout, Settings, Layers, Network, Bot, Server, ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = {
  web: Globe,
  app: Layout,
  ai: Bot,
  automation: Settings,
  brand: Layers,
  social: Network,
  infra: Server
};

export function Services() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  // 3 Primary Featured Services
  const primaryServices = [
    {
      id: 'web',
      icon: 'web',
      path: '/servizi/siti-web',
      title: 'Siti web',
      desc: 'Siti veloci, chiari e su misura per raccontare la tua storia e raccogliere contatti.',
      cta: 'Scopri i siti web'
    },
    {
      id: 'app',
      icon: 'app',
      path: '/servizi/gestionali-web-app',
      title: 'Gestionali e web app',
      desc: 'Software essenziali per organizzare dati, iscrizioni e processi di lavoro.',
      cta: 'Scopri i gestionali'
    },
    {
      id: 'ai',
      icon: 'ai',
      path: '/servizi/formazione-ai',
      title: 'Formazione e AI',
      desc: 'Corsi ed esercitazioni pratiche per usare l’intelligenza artificiale nel lavoro.',
      cta: 'Scopri la formazione'
    }
  ];

  // 4 Secondary Services (cards with 16px minimum text)
  const secondaryServices = [
    {
      id: 'automation',
      icon: 'automation',
      path: '/servizi/automazioni',
      title: 'Automazioni',
      desc: 'Flussi che eliminano operazioni manuali e riducono gli errori.'
    },
    {
      id: 'brand',
      icon: 'brand',
      path: '/servizi/grafica-identita',
      title: 'Grafica e identità',
      desc: 'Logo, colori e sistemi visivi per farti riconoscere subito.'
    },
    {
      id: 'social',
      icon: 'social',
      path: '/servizi/social-media',
      title: 'Social media',
      desc: 'Piano editoriale e contenuti brevi per comunicare con costanza.'
    },
    {
      id: 'infra',
      icon: 'infra',
      path: '/servizi/infrastrutture',
      title: 'Infrastrutture',
      desc: 'Server cloud, Docker e domini per far girare i tuoi progetti.'
    }
  ];

  return (
    <section id="servizi" ref={ref as any} className="py-24 md:py-32 px-6 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className={`text-center max-w-[65ch] mx-auto space-y-4 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Servizi principali
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Strumenti digitali progettati sul tuo modo di lavorare, costruiti senza codice superfluo.
        </p>
      </div>

      {/* 3 Main Featured Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {primaryServices.map((service, idx) => {
          const Icon = iconMap[service.icon] || Globe;

          return (
            <div 
              key={service.id} 
              className={`liquid-glass rounded-3xl p-8 flex flex-col justify-between min-h-[320px] group border border-white/10 hover:border-primary/40 transition-all ${isInView ? 'animate-fade-rise' : 'opacity-0'}`} 
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div>
                <div className="p-3.5 rounded-2xl bg-white/5 w-fit mb-6 border border-white/10 text-primary group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-display text-foreground mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 mt-auto">
                <Link 
                  to={service.path} 
                  className="inline-flex items-center text-base font-medium text-foreground hover:text-primary transition-colors group-hover:translate-x-1 duration-300"
                >
                  <span>{service.cta}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Secondary Cards with 16px text */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {secondaryServices.map((service, idx) => {
          const Icon = iconMap[service.icon] || Settings;

          return (
            <Link
              key={service.id}
              to={service.path}
              className={`liquid-glass p-6 rounded-3xl border border-white/10 hover:border-primary/30 transition-all group flex flex-col justify-between space-y-3 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * (idx + 3)}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/5 text-primary border border-white/10 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h4 className="font-display font-medium text-foreground text-lg group-hover:text-primary transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {service.title}
                </h4>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
              <div className="text-base text-primary font-medium flex items-center gap-1 pt-2">
                <span>Scopri</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Large Bottom Button to View All Services */}
      <div className="text-center pt-4">
        <Link 
          to="/servizi" 
          className="inline-flex items-center gap-3 liquid-glass border border-white/10 hover:border-primary/40 rounded-full px-10 py-4 text-foreground font-medium hover:scale-[1.03] transition-transform text-base shadow-xl"
        >
          <span>Visualizza tutti i servizi</span>
          <ArrowRight className="w-5 h-5 text-primary" />
        </Link>
      </div>
    </section>
  );
}
