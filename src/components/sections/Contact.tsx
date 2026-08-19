import { FormEvent, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollUnderline } from '../ScrollUnderline';
import { useHomeCopy } from '../../hooks/useHomeCopy';

const bookingUrl = 'https://calendar.app.google/GLseASBXvsbYPY5m7';
const contactEmail = 'email@alessiobellan.it';

export function Contact() {
  const copy = useHomeCopy().contact;
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const update = (field: keyof typeof form, value: string) => { setForm((current) => ({ ...current, [field]: value })); setSubmitted(false); };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = [`${copy.name}: ${form.name}`, `${copy.email}: ${form.email}`, `${copy.service}: ${form.service}`, '', form.message].join('\n');
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`${copy.subject} ${form.name}`)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <section id="contatti" data-scroll-theme="yellow" className="scene scene--contact" aria-labelledby="contatti-title">
      <div className="scene__container contact-scene__layout">
        <div className="contact-scene__copy">
          <h2 id="contatti-title">{copy.title}</h2>
          <p>{copy.copy}</p>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="experience-button">{copy.book} <ArrowUpRight size={17} aria-hidden="true" /></a>
          <p className="contact-scene__meta">{copy.metaA} <ScrollUnderline>{copy.metaEmphasis}</ScrollUnderline><br />{copy.metaB}</p>
        </div>
        <div className="contact-scene__form">
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="contact-scene__form-grid">
              <div className="contact-scene__form-field"><label htmlFor="contact-name">{copy.name}</label><input id="contact-name" name="name" autoComplete="name" required value={form.name} onChange={(event) => update('name', event.target.value)} className="experience-field" placeholder={copy.namePlaceholder} /></div>
              <div className="contact-scene__form-field"><label htmlFor="contact-email">{copy.email}</label><input id="contact-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={(event) => update('email', event.target.value)} className="experience-field" placeholder={copy.emailPlaceholder} /></div>
            </div>
            <div className="contact-scene__form-field"><label htmlFor="contact-service">{copy.service}</label><select id="contact-service" name="service" required value={form.service} onChange={(event) => update('service', event.target.value)} className="experience-field"><option value="">{copy.servicePlaceholder}</option>{copy.services.map((service) => <option key={service}>{service}</option>)}</select></div>
            <div className="contact-scene__form-field"><label htmlFor="contact-message">{copy.message}</label><textarea id="contact-message" name="message" required rows={6} value={form.message} onChange={(event) => update('message', event.target.value)} className="experience-field resize-y" placeholder={copy.messagePlaceholder} /></div>
            <button type="submit" className="contact-scene__submit">{copy.submit} <ArrowUpRight size={17} aria-hidden="true" /></button>
            {submitted && <p className="mt-4 text-sm font-bold" role="status">{copy.sent}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
