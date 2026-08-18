import { Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import config from '../../data/config.json';

export function Footer() {
  return (
    <footer className="experience-footer">
      <div className="scene__container">
        <div className="experience-footer__grid">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 text-2xl font-bold"><img src="/media/brand/logo-nav.webp" alt="" className="h-9 w-9" width="36" height="36" /> Alessio Bellan</Link>
            <p className="mt-6 max-w-[38ch] text-[color:rgba(242,238,229,.65)]">Idee fuori di testa. Soluzioni con i piedi per terra.</p>
            <p className="mt-5 max-w-[42ch] text-sm text-[color:rgba(242,238,229,.5)]">Il 10% del compenso di ogni progetto sostiene ABBO APS.</p>
          </div>
          <div><h2 className="mono-label mb-4 text-[color:var(--experience-yellow)]">Esplora</h2><nav className="flex flex-col items-start gap-2 text-sm"><a href="/#servizi" className="min-h-11 inline-flex items-center">Servizi</a><a href="/#progetti" className="min-h-11 inline-flex items-center">Progetti</a><Link to="/prezzi" className="min-h-11 inline-flex items-center">Prezzi</Link><Link to="/curriculum" className="min-h-11 inline-flex items-center">Chi sono</Link></nav></div>
          <div><h2 className="mono-label mb-4 text-[color:var(--experience-yellow)]">Parliamo</h2><a href="mailto:email@alessiobellan.it" className="inline-flex min-h-11 items-center text-sm underline decoration-[var(--experience-yellow)] decoration-2 underline-offset-4">email@alessiobellan.it <ArrowUpRight className="ml-2" size={15} aria-hidden="true" /></a><div className="mt-5 flex gap-4"><a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[color:rgba(242,238,229,.3)]"><Linkedin size={18} /></a><a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[color:rgba(242,238,229,.3)]"><Instagram size={18} /></a></div></div>
        </div>
        <div className="experience-footer__bottom"><p>© 2026 Alessio Bellan · P. IVA 14824790969</p><p>Progettato e sviluppato da Alessio Bellan.</p></div>
      </div>
    </footer>
  );
}
