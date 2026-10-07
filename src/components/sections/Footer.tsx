import { Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import config from '../../data/config.json';
import { useHomeCopy } from '../../hooks/useHomeCopy';
import { BrandMark } from '../BrandMark';

export function Footer() {
  const copy = useHomeCopy().footer;
  return (
    <footer className="experience-footer">
      <div className="scene__container">
        <div className="experience-footer__grid">
          <div className="experience-footer__identity">
            <Link to="/" className="experience-footer__brand" aria-label="Alessio Bellan, home"><BrandMark size={34} /><span>Alessio Bellan</span></Link>
            <p className="experience-footer__tagline">{copy.tagline}</p>
            <p className="experience-footer__donation">{copy.donation}</p>
          </div>
          <div className="experience-footer__column">
            <h2 className="experience-footer__heading">{copy.explore}</h2>
            <nav className="experience-footer__nav" aria-label="Esplora il sito">
              <a href="/#servizi">{copy.services}</a>
              <a href="/#progetti">{copy.projects}</a>
              <Link to="/curriculum">{copy.about}</Link>
            </nav>
          </div>
          <div className="experience-footer__column experience-footer__contact">
            <h2 className="experience-footer__heading">{copy.talk}</h2>
            <a href="mailto:email@alessiobellan.it" className="experience-footer__email"><span>email@alessiobellan.it</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            <div className="experience-footer__social" aria-label="Social">
              <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="experience-footer__social-link"><Linkedin size={18} /></a>
              <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="experience-footer__social-link"><Instagram size={18} /></a>
            </div>
          </div>
        </div>
        <div className="experience-footer__bottom"><p>© 2026 Alessio Bellan · P. IVA 14824790969</p><p>{copy.built}</p></div>
      </div>
    </footer>
  );
}
