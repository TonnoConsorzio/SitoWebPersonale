import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { SEO } from '../components/SEO';

const steps = [
  ['01', 'Mi dai il contesto', 'Obiettivi, materiali, scadenze e cosa deve restare sotto il tuo controllo.'],
  ['02', 'Definiamo il perimetro', 'Pagine, funzioni e responsabilità sono chiari prima di partire.'],
  ['03', 'Sviluppo in autonomia', 'Lavoro nel tuo processo e aggiorno quando serve, senza riunioni inutili.'],
  ['04', 'Test e consegna', 'Controllo responsive, moduli, collegamenti e pubblicazione.'],
  ['05', 'Resta tutto documentato', 'Ricevi accessi, materiali e indicazioni per il passaggio di consegne.']
];

const trustPoints = [
  'Posso lavorare con il tuo brand e il tuo processo.',
  'Accordi e responsabilità sono messi per iscritto.',
  'Niente contatto diretto con il cliente finale senza accordo.',
  'Codice, accessi e materiali restano trasferibili.'
];

export function AgencyPage() {
  return (
    <>
      <SEO
        title="Sviluppo white label per agenzie | Alessio Bellan"
        description="Supporto white label per agenzie e studi: sviluppo web affidabile, perimetro chiaro e consegna documentata."
        canonical="/agenzie"
      />
      <Navigation />

      <main className="pt-32 pb-24">
        <section className="px-6 md:px-8 max-w-5xl mx-auto pb-24">
          <p className="text-sm uppercase tracking-[0.18em] text-primary mb-6">Per agenzie e studi</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display leading-tight max-w-4xl mb-7">
            Uno sviluppatore web affidabile, dietro le quinte.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[65ch] mb-10">
            Ti aiuto a consegnare siti e piccoli strumenti web quando il tuo team è pieno, senza cambiare il tuo rapporto con il cliente.
          </p>
          <a href="mailto:email@alessiobellan.it?subject=Pilot%20Web%20White%20Label" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-7 py-4 min-h-[48px] font-medium hover:bg-primary/90 transition-colors">
            Parliamone <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        <section className="px-6 md:px-8 max-w-7xl mx-auto border-y border-white/10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-primary mb-4">Come funziona</p>
              <h2 className="text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Un passaggio chiaro dall’incarico alla consegna.</h2>
            </div>
            <div className="space-y-0">
              {steps.map(([number, title, description]) => (
                <div key={number} className="grid grid-cols-[3rem_1fr] gap-5 py-6 border-b border-white/10 first:pt-0">
                  <span className="text-primary font-mono text-sm pt-1">{number}</span>
                  <div>
                    <h3 className="text-xl text-foreground mb-2">{title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-[58ch]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-8 max-w-7xl mx-auto py-20">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-12 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-primary mb-4">Pilot Web White Label</p>
              <h2 className="text-4xl md:text-5xl font-display text-foreground mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>Un primo incarico piccolo, per capire come lavoriamo.</h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-[60ch]">Un progetto circoscritto, con consegna e responsabilità definite. Se il modo di lavorare funziona, possiamo costruire una collaborazione più stabile.</p>
            </div>
            <div className="border border-primary/40 rounded-2xl p-7">
              <div className="text-4xl font-display text-primary mb-3">390 €</div>
              <p className="text-base text-foreground mb-6">Pilot Web White Label</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-7">Per una landing o una pagina web con perimetro concordato. Il prezzo vale per il pilot standard, non per progetti complessi.</p>
              <a href="mailto:email@alessiobellan.it?subject=Pilot%20Web%20White%20Label" className="block text-center bg-primary text-primary-foreground rounded-full py-4 font-medium hover:bg-primary/90 transition-colors">Candidiamo un progetto</a>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-8 max-w-5xl mx-auto pb-20">
          <div className="border-t border-white/10 pt-10">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-7" style={{ fontFamily: "'Instrument Serif', serif" }}>Cosa puoi aspettarti</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {trustPoints.map((point) => <li key={point} className="flex gap-3 text-base text-muted-foreground leading-relaxed"><Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />{point}</li>)}
            </ul>
          </div>
        </section>

        <section className="px-6 md:px-8 max-w-5xl mx-auto text-center border-t border-white/10 pt-20">
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>Hai un progetto da consegnare?</h2>
          <p className="text-base text-muted-foreground max-w-[55ch] mx-auto mb-8">Mandami contesto, scadenza e perimetro. Ti rispondo con una valutazione concreta.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-medium hover:text-foreground transition-colors">Torna al sito <ArrowRight className="w-4 h-4" /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
