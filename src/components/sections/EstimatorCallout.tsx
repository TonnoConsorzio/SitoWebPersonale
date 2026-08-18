import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EstimatorCallout() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-24" aria-labelledby="stima-title">
      <div className="grid gap-8 border-2 border-foreground bg-foreground p-6 text-background shadow-[8px_8px_0_#FBCF15] md:grid-cols-[1fr_0.75fr] md:p-10">
        <div><p className="mono-label mb-5 text-primary">Se vuoi un numero prima della call</p><h2 id="stima-title" className="display-font max-w-3xl text-5xl leading-[0.95] md:text-7xl">Fai una prima stima.</h2><p className="mt-6 max-w-[52ch] text-background/70">Poche domande, linguaggio normale, fascia indicativa immediata. Nessuna email obbligatoria prima del risultato.</p><Link to="/stima-progetto" className="btn-primary mt-8 px-6 py-3">Apri lo stimatore <ArrowUpRight className="ml-2" size={18} aria-hidden="true" /></Link></div>
        <div className="self-end border-t border-background/30 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0"><p className="mono-label text-primary">Il risultato</p><p className="display-font mt-5 text-4xl">Orientativo.</p><p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-background/65">La fascia serve a capire se siamo vicini. Il prezzo definitivo arriva dopo aver visto il progetto.</p></div>
      </div>
    </section>
  );
}
