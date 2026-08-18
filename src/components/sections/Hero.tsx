import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { ScrollUnderline } from '../ScrollUnderline';

const bookingUrl = 'https://calendar.app.google/GLseASBXvsbYPY5m7';

export function Hero() {
  return (
    <section data-scroll-theme="paper" data-thread-stage="hero" className="scene scene--hero" aria-labelledby="hero-title">
      <div className="scene__container hero-scene__container">
        <div className="hero-scene__content">
          <p className="eyebrow">SITI WEB · AUTOMAZIONI · FORMAZIONE</p>
          <h1 id="hero-title" className="hero-title">
            <span>Idee <ScrollUnderline>fuori di testa.</ScrollUnderline></span>
            <span>Soluzioni con i <ScrollUnderline>piedi per terra.</ScrollUnderline></span>
          </h1>
          <div className="hero-scene__lower">
            <div className="hero-scene__copy">
              <p>Per piccole aziende e associazioni.</p>
              <p>Se un sito non convince, un processo ti rallenta o uno strumento non basta più, partiamo da lì.</p>
            </div>
            <div className="hero-scene__actions">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="experience-button">Prenota 15 minuti <ArrowUpRight size={17} aria-hidden="true" /></a>
              <a href="#progetti" className="experience-button experience-button--secondary">Guarda i progetti <ArrowDownRight size={17} aria-hidden="true" /></a>
              <span className="experience-note">Se basta una soluzione semplice, te lo dico.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scene__wash" aria-hidden="true" />
    </section>
  );
}
