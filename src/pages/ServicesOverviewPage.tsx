import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { SEO } from '../components/SEO';
import { useScrollTo } from '../hooks/useScrollTo';
import servicesData from '../data/servicesData.json';

const problems = [
  { id: 'choose', label: 'Voglio farmi scegliere meglio', services: ['siti-web', 'grafica-identita', 'grafica'] },
  { id: 'time', label: 'Sto perdendo tempo', services: ['automazioni', 'gestionali-web-app'] },
  { id: 'tools', label: 'Voglio usare meglio gli strumenti', services: ['formazione-ai', 'infrastrutture'] },
  { id: 'voice', label: 'Non riesco a mantenere la comunicazione', services: ['social-media', 'grafica'] }
];

export function ServicesOverviewPage() {
  const [activeProblem, setActiveProblem] = useState(problems[0].id);
  const handleScrollTo = useScrollTo();
  const data = servicesData.overview;
  const serviceRows = [...data.grid, { id: 'grafica', title: 'Grafica', desc: 'Materiali visuali per presentare meglio quello che fai.', linkText: 'Scopri la grafica', path: '/servizi/grafica', shortPhrase: 'Materiali chiari, con una direzione.' }];
  const active = problems.find((problem) => problem.id === activeProblem) || problems[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="service-index-page">
      <SEO title="Servizi | Alessio Bellan" description="Siti web, gestionali, automazioni, grafica, social media, formazione e infrastrutture per il tuo lavoro." canonical="/servizi" />
      <Navigation />

      <main>
        <section className="service-index-page__hero">
          <div className="scene__container">
            <p className="service-index-page__eyebrow">Servizi</p>
            <h1>Da quale problema partiamo?</h1>
            <p>Non devi arrivare con il nome del servizio. Raccontami cosa oggi ti fa perdere tempo, chiarezza o occasioni.</p>
            <a href="#contatti" onClick={(event) => handleScrollTo(event, 'contatti')} className="experience-button">Prenota 15 minuti <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="service-index-page__finder">
          <div className="scene__container service-index-page__finder-grid">
            <div className="service-index-page__finder-intro"><p className="service-index-page__eyebrow">Orientamento</p><h2>Partiamo dal lavoro reale.</h2><p>Scegli la situazione più vicina a quella che stai vivendo. È un punto di partenza, non un quiz.</p></div>
            <div className="service-index-page__finder-panel">
              <div className="service-index-page__problem-list" role="tablist" aria-label="Problemi da risolvere">
                {problems.map((problem) => <button key={problem.id} type="button" role="tab" aria-selected={activeProblem === problem.id} className={activeProblem === problem.id ? 'is-active' : ''} onClick={() => setActiveProblem(problem.id)}>{problem.label}<ArrowRight size={17} aria-hidden="true" /></button>)}
              </div>
              <div className="service-index-page__finder-result" role="tabpanel"><span>Da qui possiamo parlare di</span><div>{active.services.map((id) => { const item = serviceRows.find((service) => service.id === id); return item ? <Link key={id} to={item.path}>{item.title}<ArrowRight size={15} aria-hidden="true" /></Link> : null; })}</div></div>
            </div>
          </div>
        </section>

        <section className="service-index-page__services">
          <div className="scene__container">
            <div className="service-index-page__section-head"><p className="service-index-page__eyebrow">Tutti i servizi</p><h2>Strumenti diversi, problemi concreti.</h2></div>
            <ol className="service-index-page__service-list">
              {serviceRows.map((item, index) => <li key={item.id}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.shortPhrase || item.desc}</p></div><Link to={item.path} aria-label={`Scopri ${item.title}`}>Scopri <ArrowRight size={17} aria-hidden="true" /></Link></li>)}
            </ol>
          </div>
        </section>

        <section className="service-index-page__method">
          <div className="scene__container service-index-page__method-grid"><div><p className="service-index-page__eyebrow">Metodo</p><h2>Prima il contesto. Poi lo strumento.</h2></div><ol>{data.method.map((step) => <li key={step.step}><span>{step.step}</span><div><h3>{step.title}</h3><p>{step.desc}</p></div></li>)}</ol></div>
        </section>

        <section className="service-index-page__cta"><div className="scene__container"><p className="service-index-page__eyebrow">Non sai quale ti serve?</p><h2>Partiamo da quello che oggi non funziona.</h2><a href="#contatti" onClick={(event) => handleScrollTo(event, 'contatti')} className="experience-button experience-button--light">Prenota 15 minuti <ArrowRight size={17} aria-hidden="true" /></a></div></section>
      </main>

      <Footer />
    </div>
  );
}
