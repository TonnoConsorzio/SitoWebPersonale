import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHomeCopy } from '../../hooks/useHomeCopy';

export function About() {
  const copy = useHomeCopy().about;
  return (
    <section id="about" data-scroll-theme="paper" className="scene scene--about" aria-labelledby="about-title">
      <div className="scene__container about-scene__layout">
        <div className="about-scene__media">
          <img src="/media/brand/foto_profilo_firma.jpg" alt={copy.portraitAlt} width="3389" height="3392" loading="lazy" />
        </div>
        <div className="about-scene__copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="about-title">{copy.title}</h2>
          <div>
            {copy.paragraphs.map((paragraph, index) => <p key={paragraph}>{index === 4 ? <strong>{paragraph}</strong> : paragraph}</p>)}
          </div>
          <Link to="/curriculum" className="text-link">{copy.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>

      <div id="abbo" data-scroll-theme="yellow" className="abbo-scene">
        <div className="scene__container">
          <h2>{copy.abboTitle}</h2>
          <p>{copy.abboCopyA} <strong>{copy.abboEmphasis}</strong> {copy.abboCopyB}</p>
          <a href="https://abboaps.org" target="_blank" rel="noopener noreferrer" className="text-link">{copy.abboCta} <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
