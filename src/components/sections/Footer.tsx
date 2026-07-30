import { Instagram, Linkedin } from 'lucide-react';
import config from '../../data/config.json';
import { useScrollTo } from '../../hooks/useScrollTo';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useTranslation();
  const handleScrollTo = useScrollTo();

  return (
    <footer className="mt-24 liquid-glass rounded-t-3xl border-b-0 px-8 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="max-w-sm space-y-3">
          <a href="#/" onClick={(e) => handleScrollTo(e, 'home')} className="flex items-center gap-2 text-3xl font-display text-foreground block mb-2">
            <img src="./media/brand/logo.svg" alt="Alessio Bellan Logo" className="h-10 w-10" width="40" height="40" />
            <span>Alessio Bellan</span>
          </a>
          <p className="text-muted-foreground text-base leading-relaxed">
            {t('footer.description')}
          </p>
          <p className="text-base text-muted-foreground/80 leading-relaxed pt-1">
            Il 10% di ogni progetto sostiene{' '}
            <a href="https://abboaps.it" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline hover:text-foreground font-medium text-foreground">
              <img src="./media/brand/abbo-logo-bianco.svg" alt="ABBO APS" className="h-4 w-auto inline shrink-0" height="16" />
              <span>ABBO APS</span>
            </a>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 md:col-span-1 justify-center">
          <div>
            <h4 className="font-medium text-foreground mb-4 text-base uppercase tracking-widest">{t('footer.services')}</h4>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li><Link to="/servizi" className="hover:text-foreground transition-colors">Servizi</Link></li>
              <li><Link to="/servizi/gestionali-web-app" className="hover:text-foreground transition-colors">Gestionali</Link></li>
              <li><Link to="/servizi/grafica-identita" className="hover:text-foreground transition-colors">Grafica</Link></li>
              <li><Link to="/servizi/social-media" className="hover:text-foreground transition-colors">Social media</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-4 text-base uppercase tracking-widest">{t('footer.info')}</h4>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li><a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-foreground transition-colors">Chi sono</a></li>
              <li><a href="#portfolio" onClick={(e) => handleScrollTo(e, 'portfolio')} className="hover:text-foreground transition-colors">Portfolio</a></li>
              <li><a href="#journal" onClick={(e) => handleScrollTo(e, 'journal')} className="hover:text-foreground transition-colors">Journal</a></li>
              <li><a href="#prezzi" onClick={(e) => handleScrollTo(e, 'prezzi')} className="hover:text-foreground transition-colors">Prezzi</a></li>
              <li><a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')} className="hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#contatti" onClick={(e) => handleScrollTo(e, 'contatti')} className="hover:text-foreground transition-colors">Contatti</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:items-end md:ml-auto">
          <a href="mailto:email@alessiobellan.it" className="text-foreground hover:text-muted-foreground transition-colors mb-6 text-xl">
            email@alessiobellan.it
          </a>
          <div className="flex gap-4">
            <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Profilo LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Profilo Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-base text-muted-foreground/80 gap-4 md:gap-0">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            <p>© 2026 Alessio Bellan. {t('footer.rights')}</p>
            <span className="hidden md:inline">•</span>
            <p>P. IVA 14824790969</p>
          </div>
          <div className="mt-2 text-center md:text-left">
            <p className="text-muted-foreground">{t('footer.made_with')}</p>
          </div>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
