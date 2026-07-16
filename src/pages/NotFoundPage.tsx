import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Pagina non trovata | Alessio Bellan</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-[80vh] pt-40 pb-20 flex flex-col items-center justify-center px-8 relative overflow-hidden">
        {/* Aesthetic background glows */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-50" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[hsl(240,100%,70%)]/10 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-50" />

        <div className="text-center animate-fade-rise flex flex-col items-center max-w-2xl mx-auto">
          <h1 className="text-8xl md:text-9xl font-display text-primary mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
            404
          </h1>
          <h2 className="text-3xl md:text-5xl text-foreground font-medium mb-6 leading-tight">
            Oops, pagina non trovata.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
            Sembra che tu ti sia perso. Il link che hai cliccato è rotto o la pagina è stata spostata.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 liquid-glass rounded-full px-8 py-4 text-foreground font-medium hover:scale-[1.03] transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Torna alla Home
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
