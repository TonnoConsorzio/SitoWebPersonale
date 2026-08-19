import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title__primary">{copy.titleA} <ScrollUnderline>{copy.titleAEmphasis}</ScrollUnderline></span>
            <span className="hero-title__secondary">{copy.titleB} {copy.titleBMiddle} <ScrollUnderline>{copy.titleBEmphasis}</ScrollUnderline></span>
          </h1>
          <div className="hero-scene__lower">
            <div className="hero-scene__copy">
              <TypewriterLine phrases={copy.typewriter} staticText={copy.staticTypewriter} />
            </div>
            <div className="hero-scene__actions">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="experience-button">{copy.book} <ArrowUpRight size={17} aria-hidden="true" /></a>
              <a href="#progetti" className="experience-button experience-button--secondary">{copy.projects} <ArrowDownRight size={17} aria-hidden="true" /></a>
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

function TypewriterLine({ phrases, staticText }: { phrases: readonly string[]; staticText: string }) {
  const [text, setText] = useState(phrases[0] ?? '');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setText(staticText);
      return;
    }

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const phrase = phrases[phraseIndex] ?? '';
      if (!deleting) {
        characterIndex += 1;
        setText(phrase.slice(0, characterIndex));
        if (characterIndex === phrase.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1400);
          return;
        }
        timer = window.setTimeout(tick, 65);
        return;
      }

      characterIndex -= 1;
      setText(phrase.slice(0, characterIndex));
      if (characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = window.setTimeout(tick, 260);
        return;
      }
      timer = window.setTimeout(tick, 38);
    };
    tick();
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [phrases, reducedMotion, staticText]);

  return (
    <>
      <span className="hero-typewriter hero-typewriter--visual" aria-hidden="true">Posso fare: <span className="hero-typewriter__dynamic">{text}<i /></span></span>
      <span className="sr-only">Posso fare: {staticText}</span>
    </>
  );
}
