import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';

export function Contact() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="contatti" ref={ref as any} className="py-24 px-8 max-w-7xl mx-auto">
      <div className={`mb-16 text-center ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>{t('contact.title')}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto whitespace-pre-line leading-relaxed">{t('contact.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`liquid-glass rounded-3xl p-8 md:p-12 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          <h3 className="text-2xl font-display text-foreground mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>Modulo di contatto</h3>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">{t('contact.form_name')}</label>
              <input type="text" id="name" className="w-full bg-input/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors" placeholder={t('contact.form_name_ph')} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">{t('contact.form_email')}</label>
              <input type="email" id="email" className="w-full bg-input/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors" placeholder={t('contact.form_email_ph')} />
            </div>
            <div>
              <label htmlFor="service" className="block text-sm text-muted-foreground mb-2">{t('contact.form_service')}</label>
              <select id="service" className="w-full bg-input/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors appearance-none">
                <option value="">{t('contact.form_service_ph')}</option>
                <option value="web">{t('contact.opt_web')}</option>
                <option value="app">{t('contact.opt_app')}</option>
                <option value="brand">{t('contact.opt_brand')}</option>
                <option value="social">{t('contact.opt_social')}</option>
                <option value="infra">{t('contact.opt_infra')}</option>
                <option value="auto">{t('contact.opt_auto')}</option>
                <option value="unsure">{t('contact.opt_unsure')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">{t('contact.form_message')}</label>
              <textarea id="message" rows={4} className="w-full bg-input/50 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder={t('contact.form_message_ph')}></textarea>
            </div>
            <button type="button" className="w-full liquid-glass rounded-full py-4 text-foreground font-medium hover:scale-[1.02] transition-transform">
              {t('contact.form_submit')}
            </button>
          </form>
        </div>

        <div className={`liquid-glass rounded-3xl p-8 md:p-12 flex flex-col h-full min-h-[500px] ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}>
          <h3 className="text-2xl font-display text-foreground mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>{t('contact.cal_title')}</h3>
          <div className="flex-1 rounded-xl overflow-hidden bg-background/50 border border-white/10 relative flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
            <p className="text-muted-foreground mb-8 whitespace-pre-line leading-relaxed">
              {t('contact.cal_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://calendar.app.google/GLseASBXvsbYPY5m7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="liquid-glass rounded-full px-8 py-4 text-foreground font-medium hover:scale-[1.03] transition-transform inline-block"
              >
                {t('contact.cal_cta')}
              </a>
              <a 
                href="/alessio-bellan.vcf" 
                download="alessio-bellan.vcf"
                className="bg-primary text-primary-foreground rounded-full px-6 py-4 font-medium hover:scale-[1.03] transition-transform inline-flex items-center gap-2 text-sm shadow-lg shadow-primary/20"
              >
                <Download className="w-4 h-4" />
                {t('contact.download_vcard')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
