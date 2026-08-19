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
          <div>
            <Link to="/" className="inline-flex items-center gap-3 text-2xl font-bold"><BrandMark /> Alessio Bellan</Link>
            <p className="mt-6 max-w-[38ch] text-[color:rgba(242,238,229,.65)]">{copy.tagline}</p>
            <p className="mt-5 max-w-[42ch] text-sm text-[color:rgba(242,238,229,.5)]">{copy.donation}</p>
          </div>
          <div><h2 className="mono-label mb-4 text-[color:var(--experience-yellow)]">{copy.explore}</h2><nav className="flex flex-col items-start gap-2 text-sm"><a href="/#servizi" className="min-h-11 inline-flex items-center">{copy.services}</a><a href="/#progetti" className="min-h-11 inline-flex items-center">{copy.projects}</a><Link to="/prezzi" className="min-h-11 inline-flex items-center">{copy.pricing}</Link><Link to="/curriculum" className="min-h-11 inline-flex items-center">{copy.about}</Link></nav></div>
          <div><h2 className="mono-label mb-4 text-[color:var(--experience-yellow)]">{copy.talk}</h2><a href="mailto:email@alessiobellan.it" className="inline-flex min-h-11 items-center text-sm underline decoration-[var(--experience-yellow)] decoration-2 underline-offset-4">email@alessiobellan.it <ArrowUpRight className="ml-2" size={15} aria-hidden="true" /></a><div className="mt-5 flex gap-4"><a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[color:rgba(242,238,229,.3)]"><Linkedin size={18} /></a><a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[color:rgba(242,238,229,.3)]"><Instagram size={18} /></a></div></div>
        </div>
        <div className="experience-footer__bottom"><p>© 2026 Alessio Bellan · P. IVA 14824790969</p><p>{copy.built}</p></div>
      </div>
    </footer>
  );
}
