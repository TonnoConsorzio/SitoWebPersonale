import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-24 liquid-glass rounded-t-3xl border-b-0 px-8 py-12 max-w-7xl mx-auto">
      <div className="md:flex md:justify-between grid grid-cols-1 gap-12">
        <div className="max-w-xs">
          <Link to="/" className="text-2xl tracking-tight font-display text-foreground block mb-4 min-h-[44px] flex items-center">
            Alessio Bellan
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Progetto e sviluppo siti web, gestionali e identità digitali per chi ha qualcosa da dire.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-12 sm:gap-16">
          <div>
            <h4 className="font-medium text-foreground mb-4 text-sm">Info</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/#about" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">Portfolio</Link></li>
              <li><Link to="/curriculum" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">Curriculum</Link></li>
              <li><Link to="/prezzi" className="hover:text-foreground transition-colors min-h-[44px] flex items-center">Prezzi</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:items-end md:ml-auto">
          <p className="text-xs text-muted-foreground/60 mb-2">
            Parte del ricavato sostiene <a href="https://abboaps.it" target="_blank" rel="noopener noreferrer" className="underline hover:text-muted-foreground min-h-[44px] inline-flex items-center ml-1">ABBO APS</a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-6 text-xs text-muted-foreground/50 text-center">
        © {new Date().getFullYear()} Alessio Bellan. Tutti i diritti riservati.
      </div>
    </footer>
  );
}
