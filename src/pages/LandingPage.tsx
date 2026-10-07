import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { SEO } from '../components/SEO';
import { ServiceSignatureVisual } from '../components/ServiceSignatureVisual';
import { useScrollTo } from '../hooks/useScrollTo';
import servicesData from '../data/servicesData.json';
import landingPagesData from '../data/landingPages.json';
import geoLandingPagesData from '../data/geoLandingPages.json';

type PageKind = 'showroom' | 'system' | 'workflow' | 'identity' | 'newsroom' | 'lab' | 'map' | 'gallery';

type PageConfig = {
  kind: PageKind;
  statement: string;
  contentTitle: string;
  proofTitle: string;
  crossSell?: { label: string; path: string };
};

const pageConfig: Record<string, PageConfig> = {
  'siti-web': { kind: 'showroom', statement: 'Il sito deve farti capire, ricordare e scegliere.', contentTitle: 'Cosa deve funzionare', proofTitle: 'Un sito si vede nelle decisioni che rende semplici.', crossSell: { label: 'Se manca una direzione visiva, partiamo dall’identità.', path: '/servizi/grafica-identita' } },
  'gestionali-web-app': { kind: 'system', statement: 'Il software serve quando il lavoro non entra più in fogli sparsi.', contentTitle: 'Cosa possiamo costruire', proofTitle: 'Prima capiamo il flusso. Poi decidiamo cosa automatizzare.', crossSell: { label: 'Se il problema è nei passaggi manuali, guarda le automazioni.', path: '/servizi/automazioni' } },
  automazioni: { kind: 'workflow', statement: 'Ogni passaggio ripetuto è un posto in cui il lavoro può incepparsi.', contentTitle: 'Dove intervengo', proofTitle: 'Il flusso deve essere più semplice da seguire.', crossSell: { label: 'Se il flusso cresce, serve un ambiente ordinato.', path: '/servizi/infrastrutture' } },
  'grafica-identita': { kind: 'identity', statement: 'Un’identità visiva tiene insieme quello che dici e come vieni riconosciuto.', contentTitle: 'Il sistema visivo', proofTitle: 'Il logo è l’inizio. Il lavoro vero è usarlo bene.', crossSell: { label: 'Quando il sistema è pronto, portiamolo sul sito.', path: '/servizi/siti-web' } },
  'social-media': { kind: 'newsroom', statement: 'La comunicazione non dovrebbe ricominciare da zero ogni settimana.', contentTitle: 'Come si costruisce costanza', proofTitle: 'Prima dei post viene una linea editoriale sostenibile.', crossSell: { label: 'Se mancano materiali coerenti, partiamo dalla grafica.', path: '/servizi/grafica' } },
  'formazione-ai': { kind: 'lab', statement: 'La formazione serve quando quello che impari entra nel lavoro di domani.', contentTitle: 'Cosa impari davvero', proofTitle: 'Un esercizio utile vale più di una lista di strumenti.', crossSell: { label: 'Dalla formazione a un flusso concreto: guarda le automazioni.', path: '/servizi/automazioni' } },
  infrastrutture: { kind: 'map', statement: 'Un ambiente tecnico ordinato riduce dipendenze e sorprese.', contentTitle: 'Cosa c’è dietro', proofTitle: 'La parte tecnica deve restare comprensibile anche dopo la consegna.', crossSell: { label: 'Se vuoi ridurre il lavoro manuale, partiamo dai flussi.', path: '/servizi/automazioni' } },
  grafica: { kind: 'gallery', statement: 'Un materiale funziona quando ha una direzione, non solo quando è bello.', contentTitle: 'Cosa posso realizzare', proofTitle: 'La qualità sta nel modo in cui ogni elemento tiene insieme gli altri.', crossSell: { label: 'Se serve un sistema completo, guarda l’identità visiva.', path: '/servizi/grafica-identita' } }
};

function resolveServiceKey(id?: string) {
  if (!id) return null;
  if ((servicesData as any)[id]) return id;
  if (id === 'gestionali') return 'gestionali-web-app';
  if (id === 'grafica') return 'grafica';
  if (id === 'social') return 'social-media';
  if (id === 'infra') return 'infrastrutture';
  return id;
}

function listItems(data: any) {
  const source = data.offerings || data.examples || data.tasks || data.paths || data.includes || [];
  return source.map((item: any) => typeof item === 'string' ? { title: item, desc: '' } : { title: item.title, desc: item.desc });
}

function getCtaTitle(data: any) {
  return data.ctaTitle || data.ctaTitle1 || 'Raccontami cosa vuoi sistemare.';
}

function getCtaButton() {
  return 'Prenota 15 minuti';
}

export function LandingPage() {
  const { id } = useParams<{ id: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const handleScrollTo = useScrollTo();
  const serviceKey = useMemo(() => resolveServiceKey(id), [id]);
  const data = serviceKey && serviceKey !== 'grafica' ? (servicesData as any)[serviceKey] : null;
  const legacyData = !data ? ((landingPagesData as any)[id as string] || (geoLandingPagesData as any)[id as string]) : null;
  const config = pageConfig[serviceKey || id || ''] || pageConfig['siti-web'];
  const items = listItems(data || {});
  const proof = data?.principles || data?.benefits || data?.approach || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenFaq(null);
  }, [id]);

  if (!data && !legacyData) return <Navigate to="/servizi" replace />;

  const title1 = data?.title1 || legacyData?.h1 || 'Servizio digitale';
  const title2 = data?.title2 || '';
  const subtitle = data?.subtitle || legacyData?.intro || '';
  const statementText = data?.positioningText1 || data?.introText || data?.problemText || subtitle;
  const faq = data?.faq || [];
  const faqSchema = faq.length > 0 ? [{
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item: any) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } }))
  }] : undefined;

  return (
    <div className={`service-page service-page--${config.kind}`}>
      <SEO title={`${data?.badge || legacyData?.titleTag || 'Servizio'} | Alessio Bellan`} description={subtitle || legacyData?.metaDescription || ''} canonical={`/servizi/${id}`} schemas={faqSchema} />
      <Navigation />

      <main>
        <section className="service-page__hero">
          <div className="scene__container service-page__hero-grid">
            <div className="service-page__hero-copy">
              <p className="service-page__eyebrow">{data?.badge || 'Servizio'}</p>
              <h1><span>{title1}</span><em>{title2}</em></h1>
              <p className="service-page__hero-lead">{subtitle}</p>
              <div className="service-page__actions">
                <a href="#contatti" onClick={(event) => handleScrollTo(event, 'contatti')} className="experience-button">Prenota 15 minuti <ArrowRight size={17} aria-hidden="true" /></a>
                <Link to="/portfolio" className="text-link">Guarda i progetti <ArrowRight size={17} aria-hidden="true" /></Link>
              </div>
            </div>
            <ServiceSignatureVisual kind={config.kind} data={data || {}} />
          </div>
        </section>

        <section className="service-page__statement">
          <div className="scene__container service-page__statement-grid">
            <h2>{config.statement}</h2>
            <div><p>{statementText}</p><span className="service-page__rule-label">Il punto di partenza</span></div>
          </div>
        </section>

        {items.length > 0 && (
          <section className="service-page__index">
            <div className="scene__container service-page__index-grid">
              <div className="service-page__section-intro"><p className="service-page__eyebrow">In pratica</p><h2>{config.contentTitle}</h2></div>
              <ol className="service-page__index-list">
                {items.map((item: { title: string; desc: string }, index: number) => (
                  <li key={`${item.title}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3>{item.desc && <p>{item.desc}</p>}</div></li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {proof.length > 0 && (
          <section className="service-page__proof">
            <div className="scene__container service-page__proof-grid">
              <div className="service-page__section-intro"><p className="service-page__eyebrow">Metodo</p><h2>{config.proofTitle}</h2></div>
              <ol className="service-page__proof-list">
                {proof.map((item: any, index: number) => {
                  const title = typeof item === 'string' ? item : item.title;
                  const description = typeof item === 'string' ? '' : item.desc;
                  return <li key={`${title}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3>{description && <p>{description}</p>}</div></li>;
                })}
              </ol>
            </div>
          </section>
        )}

        {Array.isArray(data?.process) && (
          <section className="service-page__process">
            <div className="scene__container service-page__process-grid">
              <div className="service-page__section-intro"><p className="service-page__eyebrow">Come si parte</p><h2>Un percorso chiaro.</h2></div>
              <ol className="service-page__process-list">
                {data.process.map((item: any) => <li key={item.step}><span>{item.step}</span><div><h3>{item.title}</h3><p>{item.desc}</p></div></li>)}
              </ol>
            </div>
          </section>
        )}

        {config.crossSell && <section className="service-page__cross-sell"><div className="scene__container"><Link to={config.crossSell.path}>{config.crossSell.label}<ArrowRight size={17} aria-hidden="true" /></Link></div></section>}

        {faq.length > 0 && (
          <section className="service-page__faq">
            <div className="scene__container service-page__faq-grid">
              <div className="service-page__section-intro"><p className="service-page__eyebrow">Prima di iniziare</p><h2>Domande concrete.</h2></div>
              <div className="service-page__faq-list">
                {faq.map((item: any, index: number) => (
                  <div key={item.question} className={openFaq === index ? 'is-open' : ''}>
                    <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{item.question}</span><ChevronDown size={19} aria-hidden="true" /></button>
                    <div className="service-page__faq-answer"><p>{item.answer}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="contatti" className="service-page__final-cta">
          <div className="scene__container"><p className="service-page__eyebrow">Passo successivo</p><h2>{getCtaTitle(data || {})}</h2><p>Raccontami il problema. In 15 minuti capiamo se posso aiutarti e da dove partire.</p><a href="#contatti" onClick={(event) => handleScrollTo(event, 'contatti')} className="experience-button experience-button--light">{getCtaButton()} <ArrowRight size={17} aria-hidden="true" /></a></div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
