import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../../data/config.json';
import { useHomeCopy } from '../../hooks/useHomeCopy';

export function Testimonials() {
  const { i18n } = useTranslation();
  const copy = useHomeCopy().testimonials;
  const [active, setActive] = useState(0);
  const lang = i18n.language.startsWith('en') ? 'en' : 'it';
  const testimonial = config.testimonials[active];
  const quote = typeof testimonial.quote === 'string' ? testimonial.quote : testimonial.quote[lang];
  const role = typeof testimonial.role === 'string' ? testimonial.role : testimonial.role[lang];
  const move = (direction: number) => setActive((current) => (current + direction + config.testimonials.length) % config.testimonials.length);

  return (
    <section data-scroll-theme="paper" className="scene scene--testimonials" aria-labelledby="testimonials-title">
      <div className="scene__container testimonials-scene__layout">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="testimonials-title">{copy.title}</h2>
          <div className="testimonials-scene__controls">
            <button type="button" onClick={() => move(-1)} aria-label={copy.previous}><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" onClick={() => move(1)} aria-label={copy.next}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <figure className="testimonials-scene__quote" aria-live="polite">
          <div key={active} className="testimonials-scene__quote-content">
            <blockquote>“{quote}”</blockquote>
            <figcaption><strong>{testimonial.name}</strong><br />{role}</figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
