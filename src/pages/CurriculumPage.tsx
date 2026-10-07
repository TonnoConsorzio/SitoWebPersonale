import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { SEO } from '../components/SEO';
import { useScrollTo } from '../hooks/useScrollTo';
import experiences from '../data/curriculum.json';
import cvData from '../data/cv.json';
import certifications from '../data/certifications.json';

export function CurriculumPage() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const handleScrollTo = useScrollTo();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getLocalized = (value: any) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[currentLang] || value.it || '';
  };

  return (
    <div className="profile-page">
      <SEO
        title="Curriculum ed esperienze | Alessio Bellan"
        description="Percorso professionale, esperienze lavorative, formazione e certificazioni di Alessio Bellan."
        canonical="/curriculum"
      />
      <Navigation />

      <main>
        <section className="profile-page__hero">
          <div className="scene__container">
            <p className="profile-page__eyebrow">Curriculum</p>
            <h1>Un percorso fatto di lavoro reale.</h1>
            <p>Sviluppatore web, coordinatore di progetti digitali e presidente di ABBO APS.</p>
            <a href="#contatti" onClick={(event) => handleScrollTo(event, 'contatti')} className="experience-button">
              Parliamo <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="profile-page__section">
          <div className="scene__container profile-page__section-grid">
            <div className="profile-page__section-intro">
              <p className="profile-page__eyebrow">Esperienze</p>
              <h2>Ruoli diversi, stesso modo di lavorare.</h2>
            </div>
            <ol className="profile-page__rows">
              {experiences.map((item, index) => (
                <li key={`${item.title}-${index}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="profile-page__row-meta"><strong>{item.company}</strong><small>{item.period}</small></div>
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="profile-page__section profile-page__section--paper">
          <div className="scene__container profile-page__details">
            <div>
              <p className="profile-page__eyebrow">Formazione</p>
              <h2>Le basi che continuano a servire.</h2>
              <ol className="profile-page__compact-list">
                {cvData.education.map((item: any, index: number) => (
                  <li key={`${getLocalized(item.title)}-${index}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div><strong>{getLocalized(item.title)}</strong><small>{getLocalized(item.school)} · {getLocalized(item.period)}</small></div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="profile-page__eyebrow">Competenze</p>
              <h2>Quello che porto nei progetti.</h2>
              <ul className="profile-page__skills">
                {cvData.skills.map((skill: any, index: number) => <li key={`${getLocalized(skill)}-${index}`}>{getLocalized(skill)}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="profile-page__section">
          <div className="scene__container profile-page__certifications">
            <div className="profile-page__section-intro">
              <p className="profile-page__eyebrow">Certificazioni</p>
              <h2>Continuare a imparare fa parte del lavoro.</h2>
            </div>
            <ul className="profile-page__rows profile-page__rows--certifications">
              {certifications.map((item: any, index: number) => (
                <li key={`${getLocalized(item.title)}-${index}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{getLocalized(item.title)}</h3><p>{item.issuer}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="profile-page__cta">
          <div className="scene__container">
            <p className="profile-page__eyebrow">Se hai un progetto</p>
            <h2>Raccontami da dove vuoi partire.</h2>
            <a href="#contatti" onClick={(event) => handleScrollTo(event, 'contatti')} className="experience-button experience-button--light">
              Prenota 15 minuti <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
