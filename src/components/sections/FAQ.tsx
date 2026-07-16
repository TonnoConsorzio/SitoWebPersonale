import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
      question: "Quanto tempo ci vuole per completare il progetto?",
      answer: "Dipende dalla richiesta: da una settimana per un sito semplice, fino a qualche mese per progetti più articolati come un gestionale su misura."
    },
    {
      question: "Quante revisioni sono incluse?",
      answer: "Nella prima settimana le revisioni sono illimitate. Dopo la consegna puoi scegliere tra revisioni a consumo (30€ + 45€/h) oppure un forfait mensile di 85€ per modifiche illimitate nel tempo."
    },
    {
      question: "Il dominio e l'hosting li gestisci tu?",
      answer: "Il dominio resta sempre di tua proprietà e gestione. Dell'hosting posso occuparmene io, ma solo dopo esserci confrontati su cosa serve davvero."
    },
    {
      question: "Cosa succede dopo la consegna se qualcosa si rompe?",
      answer: "Nel primo mese dopo la consegna, assistenza e risoluzione di eventuali errori sono a mio carico, senza costi aggiuntivi. Le modifiche vere e proprie seguono invece le opzioni di revisione."
    },
    {
      question: "Che differenza c'è tra i pacchetti?",
      answer: "Non ci sono funzionalità bloccate per fascia: la differenza è semplicemente quanto vuoi investire nel progetto — più budget, più tempo e cura possiamo dedicare a design e dettagli."
    },
    {
      question: "Fai anche e-commerce?",
      answer: "Sì. Per un e-commerce contattami direttamente per un preventivo su misura, perché le esigenze cambiano molto da caso a caso."
    },
    {
      question: "Come funziona il pagamento?",
      answer: "Acconto all'avvio del progetto, saldo alla consegna."
    },
    {
      question: "Devo fornirti io i contenuti?",
      answer: "Testi e foto puoi fornirmeli tu, oppure posso occuparmene io — dipende dal progetto. Copy e fotografie professionali, se richiesti, sono quotati a parte."
    },
    {
      question: "Se dopo mi serve modificare un testo o una foto, è compreso?",
      answer: "Le piccole modifiche (fino a circa 30 minuti di lavoro) sono sempre gratuite."
    },
    {
      question: "Lavori anche con chi non ha le idee chiare?",
      answer: "Lavoro con chi ha voglia di raccontare qualcosa di vero. Le idee le sviluppiamo insieme: il punto di partenza sei tu e la tua storia, il resto lo costruiamo insieme."
    }
  ];

export function FAQ() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref as any} className="py-24 px-8 max-w-4xl mx-auto">
      <div className={`mb-16 text-center ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Domande frequenti</h2>
      </div>

      <div className={`liquid-glass rounded-3xl p-6 md:p-8 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-white/5 last:border-0">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
            >
              <h3 className="text-2xl font-display text-foreground pr-8" style={{ fontFamily: "'Instrument Serif', serif" }}>{faq.question}</h3>
              <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
