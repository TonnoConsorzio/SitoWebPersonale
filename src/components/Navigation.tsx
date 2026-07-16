import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-4 liquid-glass" : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-8 flex flex-row justify-between items-center">
        <Link to="/" className="text-3xl tracking-tight font-display text-foreground">
          Alessio Bellan
        </Link>

        <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors min-h-[48px] px-3 flex items-center">Home</Link>
          <a href="/#servizi" className="hover:text-foreground transition-colors min-h-[48px] px-3 flex items-center">Servizi</a>
          <Link to="/portfolio" className="hover:text-foreground transition-colors min-h-[48px] px-3 flex items-center">Portfolio</Link>
          <a href="/#about" className="hover:text-foreground transition-colors min-h-[48px] px-3 flex items-center">About</a>
          <Link to="/curriculum" className="hover:text-foreground transition-colors min-h-[48px] px-3 flex items-center">Curriculum</Link>
          <Link to="/prezzi" className="hover:text-foreground transition-colors min-h-[48px] px-3 flex items-center">Prezzi</Link>
        </div>

        <a href="https://wa.me/393755532010" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full px-6 min-h-[48px] flex items-center justify-center text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer">
          Lavoriamo insieme
        </a>
      </div>
    </nav>
  );
}
