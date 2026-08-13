import { FormEvent, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';

const CONTACT_EMAIL = 'email@alessiobellan.it';

export function Contact() {
  const { t, i18n } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '', context: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = i18n.language.startsWith('en') ? `Project request from ${form.name}` : `Richiesta progetto da ${form.name}`;
    const body = [
      `Nome: ${form.name}`,
      `Email: ${form.email}`,
      `Esigenza: ${form.service}`,
      form.context ? `Contesto: ${form.context}` : '',
      '',
      form.message
    ].filter(Boolean).join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <section id="contatti" ref={ref as any} className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
      <div className={`mb-14 max-w-2xl ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>{t('contact.title')}</h2>
        <p className="text-muted-foreground text-lg max-w-[65ch] leading-relaxed">{t('contact.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <div className={`liquid-glass rounded-2xl p-7 md:p-10 border border-white/10 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          <p className="text-sm text-muted-foreground mb-7">Bastano nome, email, esigenza e una descrizione breve.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">{t('contact.form_name')}</label>
                <input required autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} type="text" id="name" className="contact-field" placeholder={t('contact.form_name_ph')} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">{t('contact.form_email')}</label>
                <input required autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} type="email" id="email" className="contact-field" placeholder={t('contact.form_email_ph')} />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm text-muted-foreground mb-2">Di cosa hai bisogno?</label>
              <select required value={form.service} onChange={(event) => update('service', event.target.value)} id="service" className="contact-field appearance-none">
                <option value="">Seleziona un’opzione</option>
                <option value="Sito">Sito</option>
                <option value="Automazione">Automazione</option>
                <option value="Agency / white label">Agency / white label</option>
                <option value="Custom">Custom</option>
                <option value="Altro">Altro</option>
              </select>
            </div>

            {(form.service === 'Sito' || form.service === 'Automazione' || form.service === 'Agency / white label') && (
              <div>
                <label htmlFor="context" className="block text-sm text-muted-foreground mb-2">
                  {form.service === 'Automazione' ? 'Quale attività ripeti a mano?' : form.service === 'Agency / white label' ? 'Che tipo di supporto cerchi?' : 'Hai già un sito o dei materiali?'}
                </label>
                <input value={form.context} onChange={(event) => update('context', event.target.value)} type="text" id="context" className="contact-field" />
              </div>
            )}

            <div>
              <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">{t('contact.form_message')}</label>
              <textarea required value={form.message} onChange={(event) => update('message', event.target.value)} id="message" rows={5} className="contact-field resize-y" placeholder={t('contact.form_message_ph')} />
            </div>

            <button type="submit" className="w-full bg-primary text-primary-foreground rounded-full py-4 min-h-[48px] font-medium hover:bg-primary/90 transition-colors">
              {t('contact.form_submit')}
            </button>
            {submitted && <p role="status" className="text-sm text-primary">Ricevuto. Si aprirà il tuo programma email per completare l’invio.</p>}
          </form>
        </div>

        <aside className={`border-l border-primary/40 pl-6 md:pl-8 flex flex-col justify-between ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}>
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-primary mb-4">Un confronto breve</p>
            <h3 className="text-3xl md:text-4xl font-display text-foreground mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>Quindici minuti per capire se ha senso.</h3>
            <p className="text-base text-muted-foreground leading-relaxed max-w-[42ch]">Puoi prenotare una chiamata. Se il progetto non è adatto a questo percorso, te lo dico subito.</p>
          </div>
          <div className="pt-10 flex flex-col items-start gap-5">
            <a href="https://calendar.app.google/GLseASBXvsbYPY5m7" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full px-7 py-4 min-h-[48px] text-foreground font-medium hover:bg-white/10 transition-colors">
              {t('contact.cal_cta')}
            </a>
            <a href="/alessio-bellan.vcf" download="alessio-bellan.vcf" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Download className="w-4 h-4" />
              {t('contact.download_vcard')}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
