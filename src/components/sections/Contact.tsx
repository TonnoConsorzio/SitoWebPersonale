import { FormEvent, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { ScrollUnderline } from '../ScrollUnderline';

const bookingUrl = 'https://calendar.app.google/GLseASBXvsbYPY5m7';
const contactEmail = 'email@alessiobellan.it';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const update = (field: keyof typeof form, value: string) => { setForm((current) => ({ ...current, [field]: value })); setSubmitted(false); };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = [`Nome: ${form.name}`, `Email: ${form.email}`, `Esigenza: ${form.service}`, '', form.message].join('\n');
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Richiesta progetto da ${form.name}`)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <section id="contatti" data-scroll-theme="yellow" data-thread-stage="final" className="scene scene--contact" aria-labelledby="contatti-title">
      <div className="scene__container contact-scene__layout">
        <div className="contact-scene__copy">
          <p className="eyebrow">Hai qualcosa da sistemare?</p>
          <h2 id="contatti-title">Non devi conoscere già la soluzione.</h2>
          <p>Raccontami il problema. In 15 minuti capiamo se posso aiutarti e quale potrebbe essere la strada giusta.</p>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="experience-button mt-8">Prenota 15 minuti <ArrowUpRight size={17} aria-hidden="true" /></a>
          <p className="contact-scene__meta">Se non sono la persona adatta, <ScrollUnderline>te lo dico.</ScrollUnderline><br />15 minuti. Nessuna pressione commerciale.</p>
          <a href="/alessio-bellan.vcf" download="alessio-bellan.vcf" className="contact-scene__download"><Download size={16} aria-hidden="true" /> Salva il contatto</a>
        </div>
        <div className="contact-scene__form">
          <form onSubmit={handleSubmit}>
            <div className="contact-scene__form-grid">
              <div className="contact-scene__form-field"><label htmlFor="contact-name">Nome</label><input id="contact-name" name="name" autoComplete="name" required value={form.name} onChange={(event) => update('name', event.target.value)} className="experience-field" placeholder="Il tuo nome…" /></div>
              <div className="contact-scene__form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={(event) => update('email', event.target.value)} className="experience-field" placeholder="nome@azienda.it…" /></div>
            </div>
            <div className="contact-scene__form-field"><label htmlFor="contact-service">Cosa vuoi sistemare?</label><select id="contact-service" name="service" required value={form.service} onChange={(event) => update('service', event.target.value)} className="experience-field"><option value="">Scegli una voce</option><option>Sito web</option><option>Automazione</option><option>Gestionale o web app</option><option>Formazione</option><option>Identità o social</option><option>Non lo so ancora</option></select></div>
            <div className="contact-scene__form-field"><label htmlFor="contact-message">Raccontami in breve</label><textarea id="contact-message" name="message" required rows={6} value={form.message} onChange={(event) => update('message', event.target.value)} className="experience-field resize-y" placeholder="Cosa succede oggi? Cosa vorresti cambiare?…" /></div>
            <button type="submit" className="contact-scene__submit">Prepara email <ArrowUpRight size={17} aria-hidden="true" /></button>
            {submitted && <p className="mt-4 text-sm font-bold" role="status">Si è aperto il tuo programma email. Controlla destinatario e contenuto prima di inviare.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
