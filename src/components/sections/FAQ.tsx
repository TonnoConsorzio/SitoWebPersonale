import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const faqs = [
  ['Non so esattamente cosa mi serve. È un problema?', 'No. Non devi arrivare con il nome della tecnologia o un capitolato di trenta pagine. Raccontami cosa vuoi ottenere o cosa oggi non funziona. La parte tecnica viene dopo.'],
  ['Perché dovrei scegliere te invece di un’agenzia?', 'Con me parli direttamente con la persona che pensa e costruisce il progetto. Meno passaggi, più confronto. Se il tuo progetto richiede una struttura più grande di quella che posso offrirti, te lo dico.'],
  ['Dominio, codice e dati restano miei?', 'Sì. Il progetto non deve diventare un modo per tenerti legato a me.'],
  ['Ci saranno costi mensili?', 'Se servono hosting, domini, software o servizi esterni, te li dico prima. Niente abbonamenti che compaiono dopo la consegna.'],
  ['Devo usare per forza una soluzione personalizzata?', 'No. Se WordPress, un software esistente o uno strumento già pronto risolve bene il problema, ha poco senso costruirne uno da zero. Custom non significa automaticamente migliore.'],
  ['Mi terrai aggiornato durante il progetto?', 'Sì. Preferisco mostrarti cosa sta succedendo mentre lavoriamo piuttosto che sparire e presentarti tutto alla fine.'],
  ['E dopo la consegna?', 'Decidiamo insieme quanta autonomia vuoi. Posso continuare a seguirti oppure lasciarti documentazione, accessi e strumenti per gestire ciò che puoi gestire da solo.'],
  ['Quanto tempo serve?', 'Dipende dal progetto. Un sito semplice può richiedere circa 1–2 settimane. Un progetto più complesso o un gestionale può richiedere 4–6 settimane o più. Prima di iniziare definiamo tempi e passaggi.']
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) };

  return (
    <>
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
      <section id="faq" data-scroll-theme="dark" className="scene scene--faq" aria-labelledby="faq-title">
        <div className="scene__container faq-scene__layout">
          <div className="faq-scene__intro"><h2 id="faq-title">Domande sensate.<br /><span>Risposte senza giri strani.</span></h2></div>
          <div className="faq-scene__list">
            {faqs.map(([question, answer], index) => {
              const isOpen = openIndex === index;
              return <div key={question} className={`faq-scene__item ${isOpen ? 'is-open' : ''}`}><h3><button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(isOpen ? -1 : index)}>{question}<span className="faq-scene__icon" aria-hidden="true">+</span></button></h3><div id={`faq-answer-${index}`} className="faq-scene__answer-wrap"><p className="faq-scene__answer">{answer}</p></div></div>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
