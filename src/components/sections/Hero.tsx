import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { ScrollUnderline } from '../ScrollUnderline';
import { RetroComputerScene } from '../scenes/RetroComputerScene';
import { useHomeCopy } from '../../hooks/useHomeCopy';

const bookingUrl = 'https://calendar.app.google/GLseASBXvsbYPY5m7';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copy = useHomeCopy().hero;

  return (
    <section ref={sectionRef} data-scroll-theme="paper" className="scene scene--hero" aria-labelledby="hero-title">
      <div className="scene__container hero-scene__container">
        <div className="hero-scene__content">
          <p className="eyebrow hero-scene__eyebrow">{copy.eyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title__primary">{copy.titleA} <ScrollUnderline>{copy.titleAEmphasis}</ScrollUnderline></span>
            <span className="hero-title__secondary">{copy.titleB} {copy.titleBMiddle} <ScrollUnderline>{copy.titleBEmphasis}</ScrollUnderline></span>
          </h1>
          <div className="hero-scene__lower">
            <div className="hero-scene__copy">
              <p>{copy.copyA}</p>
              <p>{copy.copyB}</p>
            </div>
            <div className="hero-scene__actions">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="experience-button">{copy.book} <ArrowUpRight size={17} aria-hidden="true" /></a>
              <a href="#progetti" className="experience-button experience-button--secondary">{copy.projects} <ArrowDownRight size={17} aria-hidden="true" /></a>
              <p className="hero-scene__note">{copy.note}</p>
            </div>
          </div>
        </div>
        <div className="hero-scene__stage" aria-label={copy.sceneLabel}>
          <RetroComputerScene sectionRef={sectionRef} />
        </div>
      </div>
    </section>
  );
}
