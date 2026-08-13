import { useState, useEffect } from 'react';
import { useScrollTo } from '../../hooks/useScrollTo';
import { Linkedin, Instagram, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import config from '../../data/config.json';

export function Navigation() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleScrollTo = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 liquid-glass' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-row justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl sm:text-2xl font-display text-foreground">
          <img src="./media/brand/logo.svg" alt="Alessio Bellan Logo" className="h-8 w-8" width="32" height="32" />
          <span className="hidden sm:inline">Alessio Bellan</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-base text-muted-foreground">
          <Link to="/servizi" className="hover:text-foreground transition-colors">{t('nav.services')}</Link>
          <Link to="/portfolio" className="hover:text-foreground transition-colors">{t('nav.portfolio')}</Link>
          <Link to="/agenzie" className="hover:text-foreground transition-colors">{t('nav.agencies')}</Link>
          <a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')} className="hover:text-foreground transition-colors">{t('nav.faq')}</a>
          <a href="#contatti" onClick={(e) => handleScrollTo(e, 'contatti')} className="hover:text-foreground transition-colors">{t('nav.contact')}</a>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-4 border-r border-white/20 pr-6">
            <button 
              onClick={() => i18n.changeLanguage(i18n.language.startsWith('it') ? 'en' : 'it')}
              className="text-xl hover:scale-110 transition-transform mr-2"
              aria-label="Toggle language"
            >
              {i18n.language.startsWith('it') ? '🇬🇧' : '🇮🇹'}
            </button>
            <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Profilo Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Profilo LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
          <Link 
            to="/stima-progetto" 
            className="liquid-glass rounded-full px-5 py-2.5 min-h-[44px] flex items-center justify-center text-base font-medium text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
          >
            {t('nav.get_estimate')}
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-foreground"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 mt-4 px-4 pt-4 pb-2 space-y-1 bg-background/95">
          <Link onClick={() => setMenuOpen(false)} to="/servizi" className="block py-3 text-muted-foreground">{t('nav.services')}</Link>
          <Link onClick={() => setMenuOpen(false)} to="/portfolio" className="block py-3 text-muted-foreground">{t('nav.portfolio')}</Link>
          <Link onClick={() => setMenuOpen(false)} to="/agenzie" className="block py-3 text-muted-foreground">{t('nav.agencies')}</Link>
          <a onClick={(e) => { setMenuOpen(false); handleScrollTo(e, 'faq'); }} href="#faq" className="block py-3 text-muted-foreground">{t('nav.faq')}</a>
          <a onClick={(e) => { setMenuOpen(false); handleScrollTo(e, 'contatti'); }} href="#contatti" className="block py-3 text-muted-foreground">{t('nav.contact')}</a>
        </div>
      )}
    </nav>
  );
}
