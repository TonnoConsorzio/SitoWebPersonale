import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollTo } from '../../hooks/useScrollTo';
import { Linkedin, Instagram } from 'lucide-react';
import config from '../../data/config.json';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
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
        <a href="#/" className="flex items-center gap-2 text-xl sm:text-2xl font-display text-foreground">
          <img src="./media/brand/logo.svg" alt="Alessio Bellan Logo" className="h-8 w-8" width="32" height="32" />
          <span className="hidden sm:inline">Alessio Bellan</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#" onClick={(e) => handleScrollTo(e, 'home')} className="hover:text-foreground transition-colors">Home</a>
          <a href="#servizi" onClick={(e) => handleScrollTo(e, 'servizi')} className="hover:text-foreground transition-colors">Servizi</a>
          <a href="#portfolio" onClick={(e) => handleScrollTo(e, 'portfolio')} className="hover:text-foreground transition-colors">Portfolio</a>
          <a href="#journal" onClick={(e) => handleScrollTo(e, 'journal')} className="hover:text-foreground transition-colors">Journal</a>
          <a href="#prezzi" onClick={(e) => handleScrollTo(e, 'prezzi')} className="hover:text-foreground transition-colors">Prezzi</a>
          <a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')} className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#contatti" onClick={(e) => handleScrollTo(e, 'contatti')} className="hover:text-foreground transition-colors">Contatti</a>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-4 border-r border-white/20 pr-6">
            <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Profilo Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Profilo LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
          <a href="#contatti" onClick={(e) => handleScrollTo(e, 'contatti')} className="liquid-glass rounded-full px-4 sm:px-6 min-h-[40px] sm:min-h-[48px] flex items-center justify-center text-xs sm:text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer">
            Inizia un progetto
          </a>
        </div>
      </div>
    </nav>
  );
}
