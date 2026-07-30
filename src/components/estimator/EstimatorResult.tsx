import { EstimateResult } from '../../config/projectEstimator';
import { Calendar, CheckCircle2, RefreshCw, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import config from '../../data/config.json';

interface EstimatorResultProps {
  result: EstimateResult;
  serviceTitle: string;
  onRestart: () => void;
}

export function EstimatorResult({
  result,
  serviceTitle,
  onRestart
}: EstimatorResultProps) {
  const formattedMin = result.minPrice.toLocaleString('it-IT');
  const formattedMax = result.maxPrice.toLocaleString('it-IT');

  const summaryText = `Ciao Alessio, ho completato la stima per "${serviceTitle}".
Fascia stimata: ${result.isMonthly ? `Da ${formattedMin} € a ${formattedMax} € / mese` : `${formattedMin} € – ${formattedMax} €`}
Riepilogo:
${result.summaryItems.map(item => `- ${item}`).join('\n')}

Vorrei concordare una chiamata conoscitiva.`;

  const mailtoUrl = `mailto:info@alessiobellan.it?subject=${encodeURIComponent(`Richiesta stima: ${serviceTitle}`)}&body=${encodeURIComponent(summaryText)}`;
  const whatsappUrl = `https://wa.me/${config.social.whatsapp}?text=${encodeURIComponent(summaryText)}`;

  return (
    <div className="space-y-8 animate-fade-rise">
      {/* Result Price Box */}
      <div className="liquid-glass p-8 md:p-12 rounded-3xl border border-primary/30 text-center space-y-4">
        {result.suggestedServiceTitle && (
          <p className="text-base font-mono text-primary">
            Servizio consigliato: {result.suggestedServiceTitle}
          </p>
        )}

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {result.isMonthly ? (
            <span>Da {formattedMin} € a {formattedMax} € <span className="text-lg font-mono text-muted-foreground">/ mese</span></span>
          ) : (
            <span>Il progetto potrebbe rientrare tra <br /><span className="text-primary">{formattedMin} € e {formattedMax} €</span></span>
          )}
        </h2>

        {result.requiresAnalysis && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-base flex items-center justify-center gap-2 max-w-lg mx-auto">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Per questa tipologia è consigliata una breve analisi per definire i dettagli.</span>
          </div>
        )}
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selected Answers Summary */}
        <div className="liquid-glass p-6 md:p-8 rounded-3xl space-y-3 border border-white/10">
          <h3 className="text-xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Riepilogo configurazione
          </h3>
          <ul className="space-y-2 text-base text-muted-foreground">
            <li className="font-semibold text-foreground">Servizio: {serviceTitle}</li>
            {result.summaryItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What might be included */}
        <div className="liquid-glass p-6 md:p-8 rounded-3xl space-y-3 border border-white/10">
          <h3 className="text-xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Cosa potrebbe includere
          </h3>
          <ul className="space-y-2 text-base text-foreground/90">
            {result.includedItems.map((inc, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Factors affecting price */}
      {result.costFactors.length > 0 && (
        <div className="liquid-glass p-6 rounded-2xl border border-white/10 space-y-3">
          <h4 className="text-base font-semibold text-foreground uppercase tracking-wider font-mono">
            Cosa può far variare il prezzo:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-base text-muted-foreground">
            {result.costFactors.map((factor, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Direct Contact Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <a
          href={mailtoUrl}
          className="w-full sm:w-auto liquid-glass rounded-full px-8 py-4 text-foreground font-medium hover:scale-[1.02] transition-transform text-base shadow-lg flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5 text-primary" />
          <span>Invia via Email</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-full px-8 py-4 text-base font-medium flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Invia su WhatsApp</span>
        </a>

        <a
          href="https://calendar.app.google/GLseASBXvsbYPY5m7"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-white/5 border border-white/10 rounded-full px-8 py-4 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all text-base font-medium flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5 text-primary" />
          <span>Prenota una chiamata</span>
        </a>
      </div>

      {/* Single Restart Option */}
      <div className="text-center pt-2">
        <button
          onClick={onRestart}
          className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Ricomincia da capo</span>
        </button>
      </div>
    </div>
  );
}
