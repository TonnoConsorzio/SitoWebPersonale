import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useScrollTo } from '../../hooks/useScrollTo';
import { useTranslation } from 'react-i18next';
import { useHomeCopy } from '../../hooks/useHomeCopy';
import { BrandMark } from '../BrandMark';

export function Navigation() {
  const { i18n } = useTranslation();
  const copy = useHomeCopy().nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const languageTimer = useRef<number | undefined>(undefined);
  const handleScrollTo = useScrollTo();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24));

  useEffect(() => {
    setScrolled(scrollY.get() > 24);
  }, [scrollY]);

  useEffect(() => () => window.clearTimeout(languageTimer.current), []);

  const scrollLink = (id: string, label: string) => (
    <a href={`#${id}`} onClick={(event) => { setMenuOpen(false); handleScrollTo(event, id); }} className="experience-nav__link">
      {label}
    </a>
  );

  const activeLanguage = i18n.language.startsWith('en') ? 'en' : 'it';
  const changeLanguage = (language: 'it' | 'en') => {
    if (language === activeLanguage) return;
    setIsChangingLanguage(true);
    window.clearTimeout(languageTimer.current);
    void i18n.changeLanguage(language);
    languageTimer.current = window.setTimeout(() => setIsChangingLanguage(false), 190);
  };
  const languageSwitch = (className = '') => (
    <div className={['experience-nav__language', isChangingLanguage && 'is-switching', className].filter(Boolean).join(' ')} role="group" aria-label={copy.changeLanguage}>
      <button type="button" className={activeLanguage === 'it' ? 'is-active' : ''} onClick={() => changeLanguage('it')} aria-pressed={activeLanguage === 'it'}>IT</button>
      <button type="button" className={activeLanguage === 'en' ? 'is-active' : ''} onClick={() => changeLanguage('en')} aria-pressed={activeLanguage === 'en'}>EN</button>
    </div>
  );

  return (
    <>
      <a href="#contenuto" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-3 focus:font-bold">{copy.skip}</a>
      <nav className={`experience-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Alessio Bellan">
        <div className="experience-nav__inner">
          <Link to="/" className="experience-nav__brand group inline-flex min-h-11 items-center gap-2.5" aria-label="Alessio Bellan, home">
            <BrandMark size={30} />
            <span className="text-[.92rem] font-bold tracking-tight">Alessio Bellan</span>
          </Link>

          <div className="experience-nav__links hidden lg:flex">
            {scrollLink('servizi', copy.services)}
            {scrollLink('progetti', copy.projects)}
            {scrollLink('about', copy.about)}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">{languageSwitch()}</div>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="experience-nav__menu lg:hidden" aria-label={menuOpen ? copy.closeMenu : copy.openMenu} aria-expanded={menuOpen} aria-controls="mobile-menu">
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="experience-nav__sheet lg:hidden">
            <div className="flex flex-col items-start gap-2">
              {scrollLink('servizi', copy.services)}
              {scrollLink('progetti', copy.projects)}
              {scrollLink('about', copy.about)}
              {languageSwitch('experience-nav__language--mobile')}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
