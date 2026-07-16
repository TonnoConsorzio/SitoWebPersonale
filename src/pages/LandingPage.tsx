import { useEffect, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useInView } from '../hooks/useInView';
import { ArrowRight, CheckCircle2, ChevronRight, HelpCircle, Layout, Layers, Globe, Settings, Database, Network, Star } from 'lucide-react';
import landingPagesData from '../data/landingPages.json';
import geoLandingPagesData from '../data/geoLandingPages.json';
import { SEO } from '../components/SEO';

export function LandingPage() {
  const { id } = useParams<{ id: string }>();
  const pageData = (landingPagesData as any)[id as string] || (geoLandingPagesData as any)[id as string];
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const serviceId = pageData ? (pageData.id || id) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const schemas = useMemo(() => {
    if (!pageData) return [];
    
    const canonicalUrl = `https://alessiobellan.it/servizi/${id}`;
    const generatedSchemas = [];

    const bizData = {
      "@context": "https://schema.org",
      "@type": pageData.provinceName ? "LocalBusiness" : "Service",
      "name": "Alessio Bellan",
      "description": pageData.metaDescription || "Sviluppo software e siti web",
      "url": canonicalUrl,
      ...(pageData.provinceName ? {
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": pageData.provinceName
          }
        ]
      } : {
        "provider": {
          "@type": "LocalBusiness",
          "name": "Alessio Bellan"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Monza e Brianza" },
          { "@type": "AdministrativeArea", "name": "Milano" },
          { "@type": "AdministrativeArea", "name": "Lecco" },
          { "@type": "AdministrativeArea", "name": "Bergamo" }
        ]
      })
    };
    generatedSchemas.push(bizData);

    if (pageData.faq) {
      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": pageData.faq.map((f: any) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      };
      generatedSchemas.push(faqData);
    }
    
    // Breadcrumbs
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://alessiobellan.it"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Servizi",
          "item": "https://alessiobellan.it/#servizi"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageData.titleTag,
          "item": canonicalUrl
        }
      ]
    };
    generatedSchemas.push(breadcrumbData);

    return generatedSchemas;
  }, [id, pageData]);

  if (!pageData) {
    return <Navigate to="/" replace />;
  }

  // --- Layout configurations based on ID to avoid duplicate structure ---

  // Hero Section
  const renderHero = () => {
    if (serviceId === 'gestionali') {
      return (
        <div className="flex flex-col text-center items-center max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary leading-tight mb-8">
            {pageData.h1}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
            {pageData.intro}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
            <Link to={`/prezzi?service=${serviceId}`} className="bg-primary text-primary-foreground rounded-full px-8 py-4 text-center text-sm font-medium hover:scale-[1.03] transition-transform">
              Vedi i prezzi
            </Link>
            <a href="https://wa.me/393755532010" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full px-8 py-4 text-center text-sm font-medium text-foreground hover:bg-white/10 transition-colors">
              Contattami
            </a>
          </div>
          
          <div className="mt-16 w-full h-64 md:h-96 liquid-glass rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/5 p-8">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
            
            {/* Immagine hero astratta che suggerisce "flusso/processo che si adatta" */}
            <svg viewBox="0 0 800 400" className="w-full h-full max-w-2xl opacity-80" fill="none" stroke="currentColor">
              <path d="M 100,200 C 250,50 350,350 400,200 C 450,50 550,350 700,200" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
              <path d="M 100,150 C 250,150 350,250 400,200 C 450,150 550,150 700,250" stroke="url(#gradient-2)" strokeWidth="2" strokeDasharray="8 8" className="opacity-50" />
              <path d="M 100,250 C 250,350 350,50 400,200 C 450,350 550,50 700,150" stroke="url(#gradient)" strokeWidth="2" strokeDasharray="4 8" className="opacity-30" />
              
              <circle cx="400" cy="200" r="16" className="fill-background stroke-primary" strokeWidth="4" />
              <circle cx="400" cy="200" r="6" className="fill-emerald-400" />
              
              <circle cx="250" cy="140" r="8" className="fill-primary/50" />
              <circle cx="550" cy="260" r="8" className="fill-primary/50" />
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(var(--primary), 0.2)" />
                  <stop offset="50%" stopColor="rgba(var(--primary), 1)" />
                  <stop offset="100%" stopColor="rgba(var(--primary), 0.2)" />
                </linearGradient>
                <linearGradient id="gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(52, 211, 153, 0.2)" />
                  <stop offset="50%" stopColor="rgba(52, 211, 153, 0.8)" />
                  <stop offset="100%" stopColor="rgba(52, 211, 153, 0.2)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      );
    } else if (serviceId === 'grafica') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-last lg:order-first relative aspect-square rounded-3xl overflow-hidden liquid-glass flex items-center justify-center">
             <div className="text-muted-foreground/30 font-display text-2xl text-center px-4">[Immagine concettuale:<br/>Identità visiva]</div>
          </div>
          <div className="space-y-8 order-first lg:order-last">
            <h1 className="font-display text-5xl md:text-6xl text-primary leading-tight">
              {pageData.h1}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {pageData.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to={`/prezzi?service=${serviceId}`} className="bg-primary text-primary-foreground rounded-full px-8 py-4 text-center text-sm font-medium hover:scale-[1.03] transition-transform">
                Vedi i prezzi
              </Link>
            </div>
          </div>
        </div>
      );
    } else if (serviceId === 'social-media' || serviceId === 'social') {
      return (
        <div className="relative liquid-glass rounded-3xl p-8 md:p-16 lg:p-24 overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
              {pageData.h1}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {pageData.intro}
            </p>
            <div className="pt-8">
              <Link to={`/prezzi?service=${serviceId}`} className="inline-block bg-primary text-primary-foreground rounded-full px-10 py-5 text-base font-medium hover:scale-[1.03] transition-transform">
                Scopri le soluzioni mensili
              </Link>
            </div>
          </div>
        </div>
      );
    } else if (serviceId === 'siti-web') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
              {pageData.h1}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {pageData.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to={`/prezzi?service=${serviceId}`} className="bg-primary text-primary-foreground rounded-full px-8 py-4 text-center text-sm font-medium hover:scale-[1.03] transition-transform shadow-lg shadow-primary/20">
                Vedi i prezzi
              </Link>
              <a href="https://wa.me/393755532010" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full px-8 py-4 text-center text-sm font-medium text-foreground hover:bg-white/10 transition-colors">
                Contattami
              </a>
            </div>
          </div>
          {/* Immagine hero astratta (schermi/interfacce sfocate in stile glassmorphism) */}
          <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-background/50 border border-white/5 flex items-center justify-center p-8">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 mix-blend-overlay"></div>
             
             {/* Abstract Glassmorphism UI Composition */}
             <div className="relative w-full h-full max-w-sm max-h-[80%]">
               <div className="absolute top-0 right-10 w-48 h-32 bg-primary/20 rounded-2xl blur-2xl"></div>
               <div className="absolute bottom-10 left-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl"></div>
               
               <div className="absolute inset-x-0 top-10 h-16 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden flex items-center px-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  </div>
               </div>
               
               <div className="absolute top-32 left-0 w-3/4 h-32 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl flex flex-col justify-between p-4 z-10">
                 <div className="w-1/2 h-3 rounded bg-white/20"></div>
                 <div className="space-y-2">
                   <div className="w-full h-2 rounded bg-white/10"></div>
                   <div className="w-5/6 h-2 rounded bg-white/10"></div>
                 </div>
               </div>

               <div className="absolute top-40 right-0 w-1/2 h-48 rounded-xl border border-white/10 bg-primary/5 backdrop-blur-md shadow-xl flex items-center justify-center z-0 translate-x-4">
                 <div className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                 </div>
               </div>
             </div>

          </div>
        </div>
      );
    } else {
      // Default (infrastrutture)
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
              {pageData.h1}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {pageData.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to={`/prezzi?service=${serviceId}`} className="bg-primary text-primary-foreground rounded-full px-8 py-4 text-center text-sm font-medium hover:scale-[1.03] transition-transform shadow-lg shadow-primary/20">
                Vedi i prezzi
              </Link>
              <a href="https://wa.me/393755532010" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full px-8 py-4 text-center text-sm font-medium text-foreground hover:bg-white/10 transition-colors">
                Contattami
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden liquid-glass flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 mix-blend-overlay"></div>
             <div className="text-muted-foreground/30 font-display text-2xl text-center px-4">[Immagine concettuale]</div>
          </div>
        </div>
      );
    }
  };

  // Content Sections
  const renderSections = () => {
    if (serviceId === 'gestionali') {
      return (
        <div className="max-w-6xl mx-auto space-y-24">
          {pageData.sections.map((section: any, idx: number) => {
            // Icone per fasce (Micro-tool/Base/Avanzato)
            if (idx === 0) {
              return (
                <div key={idx} className="space-y-8">
                  <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-12">
                    {section.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="liquid-glass p-8 rounded-2xl flex flex-col items-start border-l-4 border-l-primary/30">
                      <Settings className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                      <p className="text-muted-foreground leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: "<strong>Micro-tool</strong> (500-900€)<br/><br/>Una funzione precisa — es. gestione prenotazioni o inventario semplice." }} />
                    </div>
                    <div className="liquid-glass p-8 rounded-2xl flex flex-col items-start border-l-4 border-l-primary/60 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2"><Star className="w-4 h-4 text-emerald-400" /></div>
                      <Database className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                      <p className="text-muted-foreground leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: "<strong>Gestionale base</strong> (1.200-2.000€)<br/><br/>CRUD completo, login, dashboard, un tipo di utente." }} />
                    </div>
                    <div className="liquid-glass p-8 rounded-2xl flex flex-col items-start border-l-4 border-l-primary">
                      <Network className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                      <p className="text-muted-foreground leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: "<strong>Gestionale avanzato</strong> (da 2.500€)<br/><br/>Più ruoli, integrazioni esterne, notifiche, reportistica." }} />
                    </div>
                  </div>
                </div>
              );
            }
            
            // Illustrazione "un software che si adatta a te"
            if (idx === 1) {
              return (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-12">
                  <div className="order-last md:order-first relative liquid-glass rounded-3xl overflow-hidden flex items-center justify-center p-12 h-80">
                    {/* SVG Illustration: Blocks assembling into a custom shape */}
                    <svg viewBox="0 0 200 200" className="w-full h-full opacity-80" fill="none" stroke="currentColor">
                      <rect x="40" y="40" width="40" height="40" rx="8" className="stroke-primary fill-primary/10" strokeWidth="2" />
                      <rect x="90" y="40" width="70" height="40" rx="8" className="stroke-primary fill-primary/10" strokeWidth="2" />
                      <rect x="40" y="90" width="70" height="70" rx="8" className="stroke-emerald-400 fill-emerald-400/10" strokeWidth="2" />
                      <rect x="120" y="90" width="40" height="70" rx="8" className="stroke-primary fill-primary/10" strokeWidth="2" />
                      
                      <path d="M 60,60 L 70,60 M 110,60 L 140,60 M 60,110 L 90,110 M 60,140 L 90,140 M 130,110 L 140,110 M 130,140 L 140,140" strokeWidth="2" className="stroke-white/30 strokeLinecap-round" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h2 className="font-display text-3xl md:text-4xl text-foreground">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                  </div>
                </div>
              );
            }
            
            return (
              <div key={idx} className="liquid-glass p-8 md:p-12 rounded-3xl space-y-4">
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
              </div>
            );
          })}
        </div>
      );
    } else if (serviceId === 'grafica') {
      return (
        <div className="max-w-5xl mx-auto">
          {pageData.sections.map((section: any, idx: number) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-white/5 last:border-0">
              <h2 className="font-display text-3xl text-foreground md:col-span-1">
                {section.title}
              </h2>
              <div className="md:col-span-2">
                <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
              </div>
            </div>
          ))}
        </div>
      );
    } else if (serviceId === 'infrastrutture') {
      return (
        <div className="max-w-3xl mx-auto space-y-16">
          {pageData.sections.map((section: any, idx: number) => (
            <div key={idx} className="border-l-4 border-primary/50 pl-8 space-y-4 py-2">
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                {section.title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
            </div>
          ))}
        </div>
      );
    } else if (serviceId === 'siti-web') {
      return (
        <div className="max-w-4xl mx-auto space-y-24">
          {pageData.sections.map((section: any, idx: number) => {
            // Icone per fasce di prezzo nella prima sezione
            if (idx === 0) {
              return (
                <div key={idx} className="space-y-8">
                  <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-12">
                    {section.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="liquid-glass p-6 rounded-2xl flex flex-col items-center text-center">
                      <Layout className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                      <p className="text-muted-foreground leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: "<strong>Essenziale</strong> (350-450€)<br/><br/>Una pagina, ideale per chi ha bisogno di esistere online in fretta. Hosting e setup inclusi." }} />
                    </div>
                    <div className="liquid-glass p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                      <Layers className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                      <p className="text-muted-foreground leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: "<strong>Standard</strong> (700-950€)<br/><br/>3-5 pagine, CMS gestibile in autonomia, SEO base — la scelta più comune. Hosting e setup inclusi." }} />
                    </div>
                    <div className="liquid-glass p-6 rounded-2xl flex flex-col items-center text-center">
                      <Globe className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                      <p className="text-muted-foreground leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: "<strong>Su misura</strong> (da 1.500€)<br/><br/>Design originale, multilingua, integrazioni (booking/e-commerce). Hosting e setup inclusi." }} />
                    </div>
                  </div>
                </div>
              );
            }
            // Illustrazione astratta per la seconda sezione
            if (idx === 1) {
              return (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
                   <div className="space-y-4">
                     <h2 className="font-display text-3xl md:text-4xl text-foreground">
                       {section.title}
                     </h2>
                     <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                   </div>
                   <div className="h-64 liquid-glass rounded-3xl relative overflow-hidden flex items-center justify-center p-8">
                     <svg viewBox="0 0 200 200" className="w-full h-full text-primary/40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M 20,100 C 60,20 140,180 180,100" strokeWidth="3" className="text-primary opacity-60" />
                       <circle cx="20" cy="100" r="6" className="fill-background text-primary" strokeWidth="4" />
                       <circle cx="100" cy="100" r="10" className="fill-primary text-primary" />
                       <circle cx="180" cy="100" r="6" className="fill-background text-primary" strokeWidth="4" />
                       <path d="M 60,100 L 100,60 L 140,100 L 100,140 Z" strokeWidth="1" className="text-white/20" />
                     </svg>
                   </div>
                </div>
              );
            }
            return (
              <div key={idx} className="space-y-4">
                <h2 className="font-display text-3xl md:text-4xl text-foreground">
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
              </div>
            );
          })}
        </div>
      );
    } else {
      // Default (social)
      return (
        <div className="max-w-4xl mx-auto space-y-16">
          {pageData.sections.map((section: any, idx: number) => (
            <div key={idx} className="space-y-4">
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                {section.title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
            </div>
          ))}
        </div>
      );
    }
  };

  const renderDifferentiation = () => {
    if (!pageData.differentiation) return null;
    return (
      <div className="max-w-4xl mx-auto my-16 bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10">
           <Globe className="w-24 h-24 text-primary" />
         </div>
         <h3 className="font-display text-2xl text-primary mb-4 relative z-10">Lavorare a {pageData.provinceName}</h3>
         <p className="text-lg text-foreground/90 leading-relaxed relative z-10">
           {pageData.differentiation}
         </p>
      </div>
    );
  };

  const renderCrossLinks = () => {
    const provinces = [
      { slug: 'monza-brianza', name: 'Monza e Brianza' },
      { slug: 'milano', name: 'Milano' },
      { slug: 'lecco', name: 'Lecco' },
      { slug: 'bergamo', name: 'Bergamo' }
    ];

    return (
      <div className="mt-24 space-y-8 max-w-4xl mx-auto">
        <div className="liquid-glass p-8 md:p-12 rounded-3xl text-center">
          <h3 className="text-2xl font-display text-foreground mb-6">Guarda i miei lavori</h3>
          <p className="text-muted-foreground mb-8">
            Vuoi vedere come lavoro nella pratica? Dai un'occhiata ai progetti realizzati.
          </p>
          <Link to="/portfolio" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
            Vai al Portfolio <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="liquid-glass p-8 md:p-12 rounded-3xl text-center">
           <h3 className="text-2xl font-display text-foreground mb-6">Cerchi questo servizio in un'altra zona?</h3>
           <div className="flex flex-wrap justify-center gap-4">
             {pageData.provinceName && (
               <Link to={`/servizi/${serviceId}`} className="text-muted-foreground hover:text-primary transition-colors underline decoration-white/20">
                 Tutti i servizi (Italia)
               </Link>
             )}
             {provinces.map(p => {
               if (p.name === pageData.provinceName) return null;
               return (
                 <Link key={p.slug} to={`/servizi/${serviceId}-${p.slug}`} className="text-muted-foreground hover:text-primary transition-colors underline decoration-white/20">
                   {serviceId === 'siti-web' ? 'Siti Web' : 
                    serviceId === 'gestionali' ? 'Gestionali' : 
                    serviceId === 'grafica' ? 'Grafica' : 
                    serviceId === 'infrastrutture' ? 'Infrastrutture' : 'Social Media'} a {p.name}
                 </Link>
               );
             })}
           </div>
        </div>
      </div>
    );
  };

  // FAQs
  const renderFaq = () => {
    if (!pageData.faq) return null;
    
    if (serviceId === 'grafica') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="md:col-span-2 mb-4 text-center">
             <h2 className="font-display text-4xl text-primary">Domande frequenti</h2>
          </div>
          {pageData.faq.map((faq: any, idx: number) => (
            <div key={idx} className="liquid-glass p-8 rounded-2xl">
              <h3 className="text-lg font-medium text-foreground mb-3">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      );
    } else if (serviceId === 'infrastrutture') {
       return (
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-4xl mb-8 text-primary">FAQ</h2>
          {pageData.faq.map((faq: any, idx: number) => (
            <div key={idx} className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-medium text-foreground mb-2 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-primary" /> {faq.question}
              </h3>
              <p className="text-muted-foreground leading-relaxed ml-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="liquid-glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="font-display text-3xl mb-10 text-primary">Domande frequenti</h2>
          <div className="space-y-8">
            {pageData.faq.map((faq: any, idx: number) => (
              <div key={idx} className="border-b border-white/5 pb-8 last:border-0 last:pb-0">
                <h3 className="text-lg font-medium text-foreground mb-3 flex items-start gap-3">
                  {serviceId === 'social-media' || serviceId === 'social' ? <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" /> : <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />}
                  {faq.question}
                </h3>
                <p className="text-muted-foreground pl-8 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <SEO 
        title={pageData.titleTag} 
        description={pageData.metaDescription || ""} 
        canonical={`/servizi/${id}`} 
        schemas={schemas}
      />
      <Navigation />
      <main className="pt-32 pb-24">
        
        <section className={`px-6 md:px-8 max-w-7xl mx-auto mb-24 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          {renderHero()}
        </section>

        <section ref={ref as any} className="px-6 md:px-8 mx-auto mb-24">
          {renderDifferentiation()}
          {renderSections()}
          {renderCrossLinks()}
        </section>

        <section className="px-6 md:px-8 mx-auto mb-24">
          {renderFaq()}
        </section>

        <section className="px-6 md:px-8 max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-8 text-foreground">Pronto a iniziare?</h2>
          <a 
            href="https://wa.me/393755532010"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-10 py-5 text-base font-medium hover:scale-[1.03] transition-transform shadow-lg shadow-primary/20"
          >
            {pageData.cta || "Inizia ora"}
            <ArrowRight className="w-5 h-5" />
          </a>
        </section>

      </main>
      <Footer />
    </>
  );
}

