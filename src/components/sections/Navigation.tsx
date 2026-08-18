import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollTo } from '../../hooks/useScrollTo';
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const { i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleScrollTo = useScrollTo();

  useEffect(() => {
    let previousY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 24);
      setHidden(currentY > previousY + 8 && currentY > 120 && !menuOpen);
      if (currentY < previousY - 8 || currentY < 80) setHidden(false);
      previousY = currentY;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  const scrollLink = (id: string, label: string) => (
    <a href={`#${id}`} onClick={(event) => { setMenuOpen(false); handleScrollTo(event, id); }} className="experience-nav__link">
      {label}
    </a>
  );

  const toggleLanguage = () => i18n.changeLanguage(i18n.language.startsWith('it') ? 'en' : 'it');

  return (
    <>
      <a href="#contenuto" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-3 focus:font-bold">Vai al contenuto</a>
      <nav className={`experience-nav ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`} aria-label="Navigazione principale">
        <div className="experience-nav__inner">
          <Link to="/" className="group inline-flex min-h-11 items-center gap-3" aria-label="Alessio Bellan, home">
            <img src="/media/brand/logo-nav.webp" alt="" className="h-9 w-9" width="36" height="36" />
            <span className="hidden text-lg font-bold tracking-tight sm:inline">Alessio Bellan</span>
          </Link>

          <div className="experience-nav__links hidden lg:flex">
            {scrollLink('servizi', 'Servizi')}
            {scrollLink('progetti', 'Progetti')}
            <Link to="/prezzi" className="experience-nav__link">Prezzi</Link>
            {scrollLink('about', 'Chi sono')}
            <Link to="/journal/primo-articolo" className="experience-nav__link">Journal</Link>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={toggleLanguage} className="hidden min-h-11 min-w-11 items-center justify-center border-b border-current text-xs font-bold tracking-[0.12em] transition-colors hover:border-[var(--experience-yellow)] hover:text-[var(--experience-muted)] lg:inline-flex" aria-label="Cambia lingua">{i18n.language.startsWith('it') ? 'EN' : 'IT'}</button>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="experience-nav__menu lg:hidden" aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'} aria-expanded={menuOpen} aria-controls="mobile-menu">
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="experience-nav__sheet lg:hidden">
            <div className="flex flex-col items-start gap-2">
              {scrollLink('servizi', 'Servizi')}
              {scrollLink('progetti', 'Progetti')}
              <Link onClick={() => setMenuOpen(false)} to="/prezzi" className="experience-nav__link">Prezzi</Link>
              {scrollLink('about', 'Chi sono')}
              <Link onClick={() => setMenuOpen(false)} to="/journal/primo-articolo" className="experience-nav__link">Journal</Link>
              <button type="button" onClick={toggleLanguage} className="mt-5 min-h-11 border-b border-foreground text-xs font-bold tracking-[0.12em] transition-colors hover:border-primary hover:text-primary">{i18n.language.startsWith('it') ? 'English' : 'Italiano'}</button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
