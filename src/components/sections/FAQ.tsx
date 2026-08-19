import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHomeCopy } from '../../hooks/useHomeCopy';

export function FAQ() {
  const copy = useHomeCopy().faq;
  const faqs = copy.items;
  const [openIndex, setOpenIndex] = useState(0);
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) };

  return (
    <>
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
      <section id="faq" data-scroll-theme="dark" className="scene scene--faq" aria-labelledby="faq-title">
        <div className="scene__container faq-scene__layout">
          <div className="faq-scene__intro"><h2 id="faq-title">{copy.titleA}<br /><span>{copy.titleB}</span></h2></div>
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
