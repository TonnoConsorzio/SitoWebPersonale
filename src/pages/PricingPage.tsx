import { Link } from 'react-router-dom';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { PricingPackages } from '../components/sections/PricingPackages';
import { SEO } from '../components/SEO';

export function PricingPage() {
  return (
    <>
      <SEO
        title="Servizi e prezzi | Alessio Bellan"
        description="Sito Essenziale da 890 €, Automation Sprint da 490 € e sviluppo white label per agenzie. Perimetro e tempi chiari."
        canonical="/prezzi"
      />
      <Navigation />
      <main className="pt-28 pb-12">
        <header className="px-6 md:px-8 max-w-4xl mx-auto text-center pb-4">
          <h1 className="text-5xl md:text-6xl font-display text-foreground mb-5">Parti dal bisogno, non dal pacchetto.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-[60ch] mx-auto">Le proposte qui sotto hanno un perimetro preciso. Se il tuo progetto è diverso, preparo una stima dopo averlo capito.</p>
        </header>
        <PricingPackages />
        <section className="px-6 md:px-8 max-w-3xl mx-auto text-center border-t border-white/10 pt-16">
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Non sai da dove partire?</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-7">Usa lo stimatore per raccogliere le idee, oppure scrivimi direttamente.</p>
          <Link to="/stima-progetto" className="inline-block bg-primary text-primary-foreground rounded-full px-7 py-4 font-medium hover:bg-primary/90 transition-colors">Apri la stima guidata</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
