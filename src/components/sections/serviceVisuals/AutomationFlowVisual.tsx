import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, FileText, Mail, Bell, Database, Sparkles, RefreshCw } from 'lucide-react';

export function AutomationFlowVisual() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { name: 'Modulo Compilato', icon: FileText, desc: 'Utente inserisce i dati dal sito' },
    { name: 'Generazione PDF', icon: RefreshCw, desc: 'Creazione automatica del documento' },
    { name: 'Invio Email', icon: Mail, desc: 'Conferma immediata al destinatario' },
    { name: 'Notifica Team', icon: Bell, desc: 'Messaggio istantaneo su Telegram/Slack' },
    { name: 'Archivio DB', icon: Database, desc: 'Dati sincronizzati senza copiare a mano' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full liquid-glass rounded-2xl border border-white/10 p-6 overflow-hidden shadow-2xl relative">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-primary">
          <Sparkles className="w-4 h-4" />
          <span>FLUSSO AUTOMATICO IN ESECUZIONE</span>
        </div>
        <span className="text-[11px] text-muted-foreground font-mono">0 Errori • 100% Affidabile</span>
      </div>

      {/* Nodes Connection Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = idx === activeStep;
          const isPassed = idx < activeStep;

          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[120px] ${
                isActive
                  ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105'
                  : isPassed
                  ? 'bg-white/10 border-white/20 text-foreground'
                  : 'bg-white/5 border-white/10 text-muted-foreground opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-primary text-primary-foreground' : 'bg-white/10'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {isPassed && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div>
                <div className="text-xs font-bold font-display text-foreground leading-tight mb-1">{s.name}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
        <span>Passaggio {activeStep + 1} di 5</span>
        <span className="font-mono text-primary">Tempo medio esecuzione: ~0.8s</span>
      </div>
    </div>
  );
}
