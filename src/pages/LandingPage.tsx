import { useEffect, useMemo, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { useInView } from '../hooks/useInView';
import { CheckCircle2, ChevronDown, Award } from 'lucide-react';
import servicesData from '../data/servicesData.json';
import landingPagesData from '../data/landingPages.json';
import geoLandingPagesData from '../data/geoLandingPages.json';
import certifications from '../data/certifications.json';
import { SEO } from '../components/SEO';

// Custom Visual Components for graphic directions
import { BrowserWireframeVisual } from '../components/sections/serviceVisuals/BrowserWireframeVisual';
import { AppDashboardVisual } from '../components/sections/serviceVisuals/AppDashboardVisual';
import { AutomationFlowVisual } from '../components/sections/serviceVisuals/AutomationFlowVisual';
import { KineticTypographyVisual } from '../components/sections/serviceVisuals/KineticTypographyVisual';
import { SocialFeedVisual } from '../components/sections/serviceVisuals/SocialFeedVisual';
import { AIBoardVisual } from '../components/sections/serviceVisuals/AIBoardVisual';
import { TerminalInfraVisual } from '../components/sections/serviceVisuals/TerminalInfraVisual';

// Map service IDs to visual components
const visualMap: Record<string, any> = {
  'siti-web': BrowserWireframeVisual,
  'gestionali-web-app': AppDashboardVisual,
  'gestionali': AppDashboardVisual,
  'automazioni': AutomationFlowVisual,
  'grafica-identita': KineticTypographyVisual,
  'grafica': KineticTypographyVisual,
  'social-media': SocialFeedVisual,
  'social': SocialFeedVisual,
  'formazione-ai': AIBoardVisual,
  'infrastrutture': TerminalInfraVisual,
  'infra': TerminalInfraVisual
};

export function LandingPage() {
  const { id } = useParams<{ id: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Resolve service data from servicesData.json or legacy landingPagesData
  const serviceKey = useMemo(() => {
    if (!id) return null;
    if ((servicesData as any)[id]) return id;
    if (id === 'gestionali') return 'gestionali-web-app';
    if (id === 'grafica') return 'grafica-identita';
    if (id === 'social') return 'social-media';
    if (id === 'infra') return 'infrastrutture';
    return id;
  }, [id]);

  const serviceDetailData = serviceKey ? (servicesData as any)[serviceKey] : null;
  const legacyData = !serviceDetailData ? ((landingPagesData as any)[id as string] || (geoLandingPagesData as any)[id as string]) : null;

  // Filter related certifications for this specific service
  const relatedCerts = useMemo(() => {
    const sId = serviceKey || id || '';
    if (sId === 'formazione-ai') {
      return certifications.filter(c => c.issuer === 'Anthropic' || c.title.it.includes('Modern AI'));
    }
    if (sId === 'grafica-identita' || sId === 'social-media') {
      return certifications.filter(c => c.issuer === 'Edulia');
    }
    if (sId === 'infrastrutture') {
      return certifications.filter(c => c.issuer === 'Cisco' || c.issuer === 'Microsoft');
    }
    if (sId === 'automazioni') {
      return certifications.filter(c => c.issuer === 'Anthropic' || c.title.it.includes('IoT') || c.title.it.includes('Data Science'));
    }
    return certifications.slice(0, 3);
  }, [serviceKey, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!serviceDetailData && !legacyData) {
    return <Navigate to="/servizi" replace />;
  }

  const VisualComponent = visualMap[serviceKey || id || ''] || BrowserWireframeVisual;

  return (
    <>
      <SEO 
        title={`${serviceDetailData?.badge || 'Servizio'} | Alessio Bellan`} 
        description={serviceDetailData?.subtitle || legacyData?.metaDescription || ""} 
        canonical={`/servizi/${id}`}
      />
      <Navigation />

      <main className="pt-28 pb-24 space-y-16">
        {/* HERO SECTION */}
        <section className="px-6 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display leading-tight">
              {serviceDetailData?.title1 || legacyData?.h1} <br />
              <em className="not-italic text-muted-foreground font-display" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {serviceDetailData?.title2}
              </em>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {serviceDetailData?.subtitle || legacyData?.intro}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href="#contatti"
                className="liquid-glass rounded-full px-8 py-3.5 text-foreground font-medium hover:scale-[1.03] transition-transform text-base shadow-xl"
              >
                {serviceDetailData?.ctaPrimary || 'Parliamo del tuo progetto'}
              </a>
              {serviceDetailData?.ctaSecondary && (
                <Link
                  to="/stima-progetto"
                  className="bg-white/5 border border-white/10 rounded-full px-8 py-3.5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all text-base font-medium"
                >
                  {serviceDetailData.ctaSecondary}
                </Link>
              )}
            </div>
          </div>

          {/* Interactive Graphic Direction Visual */}
          <div className="max-w-5xl mx-auto">
            <VisualComponent />
          </div>
        </section>

        {/* POSIZIONAMENTO / INTRODUZIONE / PROBLEMA SECTION */}
        {(serviceDetailData?.positioningTitle || serviceDetailData?.introTitle || serviceDetailData?.problemTitle) && (
          <section ref={ref as any} className={`px-6 md:px-8 max-w-4xl mx-auto ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
            <div className="liquid-glass rounded-3xl p-8 md:p-10 space-y-4 text-center">
              <h2 className="text-3xl md:text-4xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {serviceDetailData.positioningTitle || serviceDetailData.introTitle || serviceDetailData.problemTitle}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                {serviceDetailData.positioningText1 || serviceDetailData.introText || serviceDetailData.problemText}
              </p>
            </div>
          </section>
        )}

        {/* OFFERINGS / COSA REALIZZO / ESEMPI SECTION */}
        {(serviceDetailData?.offerings || serviceDetailData?.examples || serviceDetailData?.tasks || serviceDetailData?.paths) && (
          <section className="px-6 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {serviceDetailData.id === 'siti-web' ? 'Cosa realizzo' :
                 serviceDetailData.id === 'gestionali-web-app' ? 'Cosa possiamo costruire' :
                 serviceDetailData.id === 'automazioni' ? 'Esempi di automazioni' :
                 serviceDetailData.id === 'grafica-identita' ? 'Cosa posso realizzare' :
                 serviceDetailData.id === 'formazione-ai' ? 'Percorsi possibili' :
                 serviceDetailData.id === 'infrastrutture' ? 'Di cosa posso occuparmi' : 'Caratteristiche principali'}
              </h2>
            </div>

            {/* If array of objects */}
            {Array.isArray(serviceDetailData.offerings) && typeof serviceDetailData.offerings[0] === 'object' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceDetailData.offerings.map((item: any, i: number) => (
                  <div key={i} className="liquid-glass p-6 md:p-8 rounded-3xl border border-white/10 space-y-3">
                    <h3 className="text-xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>{item.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* If array of strings */}
            {Array.isArray(serviceDetailData.offerings) && typeof serviceDetailData.offerings[0] === 'string' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceDetailData.offerings.map((item: string, i: number) => (
                  <div key={i} className="liquid-glass p-5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-base font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Automazioni Examples */}
            {Array.isArray(serviceDetailData.examples) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceDetailData.examples.map((ex: any, i: number) => (
                  <div key={i} className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-2">
                    <span className="text-base font-mono text-primary font-bold">{ex.title}</span>
                    <p className="text-base text-muted-foreground leading-relaxed">{ex.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Formazione AI Paths */}
            {Array.isArray(serviceDetailData.paths) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceDetailData.paths.map((p: any, i: number) => (
                  <div key={i} className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-2">
                    <h3 className="text-xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>{p.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Infrastrutture Tasks */}
            {Array.isArray(serviceDetailData.tasks) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceDetailData.tasks.map((task: string, i: number) => (
                  <div key={i} className="liquid-glass p-5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-base font-medium text-foreground">{task}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* COSA PUÒ INCLUDERE */}
        {Array.isArray(serviceDetailData?.includes) && (
          <section className="px-6 md:px-8 max-w-4xl mx-auto">
            <div className="liquid-glass p-6 md:p-10 rounded-3xl space-y-4">
              <h2 className="text-2xl md:text-3xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Cosa include
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceDetailData.includes.map((inc: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-base text-foreground/90">{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PRINCIPI / BENEFICI / APPROCCIO SECTION */}
        {(serviceDetailData?.principles || serviceDetailData?.benefits || serviceDetailData?.approach) && (
          <section className="px-6 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {serviceDetailData.principles ? 'Principi' : serviceDetailData.benefits ? 'Benefici' : 'Approccio'}
              </h2>
            </div>

            {Array.isArray(serviceDetailData.principles) && typeof serviceDetailData.principles[0] === 'object' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {serviceDetailData.principles.map((p: any, i: number) => (
                  <div key={i} className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-2">
                    <h3 className="text-xl font-display text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>{p.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {Array.isArray(serviceDetailData.benefits) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {serviceDetailData.benefits.map((b: any, i: number) => (
                  <div key={i} className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-2">
                    <h3 className="text-xl font-display text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>{b.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {Array.isArray(serviceDetailData.approach) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {serviceDetailData.approach.map((a: any, i: number) => (
                  <div key={i} className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-2">
                    <h3 className="text-lg font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>{a.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* CERTIFICAZIONI ASSOCIATE ALL'AREA DI COMPETENZA */}
        {relatedCerts.length > 0 && (
          <section className="px-6 md:px-8 max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-display text-foreground flex items-center justify-center gap-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
                <Award className="w-8 h-8 text-primary" strokeWidth={1.5} />
                Certificazioni in quest'area
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCerts.map((cert: any, i: number) => (
                <div key={i} className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-3 group hover:border-primary/40 transition-all">
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-white/5 relative">
                    <img 
                      src={cert.image} 
                      alt={cert.title.it} 
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-base font-medium text-foreground leading-snug">{cert.title.it}</h3>
                  <span className="text-base font-mono text-primary uppercase font-semibold">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROCESSO / METODO */}
        {Array.isArray(serviceDetailData?.process) && (
          <section className="px-6 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Processo
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceDetailData.process.map((p: any, i: number) => (
                <div key={i} className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-3">
                  <span className="text-2xl font-display font-bold text-primary/50">{p.step}</span>
                  <h3 className="text-lg font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>{p.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ SECTION */}
        {Array.isArray(serviceDetailData?.faq) && (
          <section className="px-6 md:px-8 max-w-4xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Domande Frequenti
              </h2>
            </div>
            <div className="liquid-glass p-6 rounded-3xl space-y-3">
              {serviceDetailData.faq.map((faq: any, i: number) => (
                <div key={i} className="border-b border-white/10 last:border-0 pb-3 last:pb-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left py-3 flex justify-between items-center text-foreground font-display text-lg"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
                    <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FINAL CTA SECTION */}
        {serviceDetailData?.ctaTitle && (
          <section id="contatti" className="px-6 md:px-8 max-w-4xl mx-auto text-center space-y-6">
            <div className="liquid-glass p-8 md:p-10 rounded-3xl border border-primary/30 space-y-4">
              <h2 className="text-3xl md:text-4xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {serviceDetailData.ctaTitle}
              </h2>
              <div className="pt-2">
                <Link
                  to="/stima-progetto"
                  className="liquid-glass rounded-full px-8 py-3.5 text-foreground font-medium hover:scale-[1.03] transition-transform text-base inline-block"
                >
                  {serviceDetailData.ctaBtn}
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
