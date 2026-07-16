import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';
import config from '../../data/config.json';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 liquid-glass' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8 flex flex-row justify-between items-center">
        <a href="/" className="flex items-center gap-2 text-2xl font-display text-foreground">
          <img src="/media/brand/logo.svg" alt="Alessio Bellan Logo" className="h-8 w-auto" />
          Alessio Bellan
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Home</a>
          <a href="#servizi" className="hover:text-foreground transition-colors">Servizi</a>
          <a href="#portfolio" className="hover:text-foreground transition-colors">Portfolio</a>
          <a href="#journal" className="hover:text-foreground transition-colors">Journal</a>
          <a href="#prezzi" className="hover:text-foreground transition-colors">Prezzi</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#contatti" className="hover:text-foreground transition-colors">Contatti</a>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 border-r border-white/20 pr-6">
            <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
          <a href="#contatti" className="liquid-glass rounded-full px-6 min-h-[48px] flex items-center justify-center text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer">
            Inizia un progetto
          </a>
        </div>
      </div>
    </nav>
  );
}
