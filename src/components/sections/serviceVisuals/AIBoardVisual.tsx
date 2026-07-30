import { useState } from 'react';
import { Bot, Lightbulb, Terminal, ArrowRight, CheckCircle } from 'lucide-react';

export function AIBoardVisual() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);

  const prompts = [
    { title: 'Sintesi Documenti', input: 'Riassumi questo verbale estraendo solo le scadenze e le persone responsabili.', result: 'Estratte 3 scadenze operative senza perdere il contesto.' },
    { title: 'Bozze Contenuti', input: 'Crea una bozza di risposta professionale per una richiesta di preventivo.', result: 'Bozza pronta in 5 secondi, pronta per il controllo umano.' },
    { title: 'Classificazione Dati', input: 'Categorizza queste 50 richieste arrivate dal form in base al servizio.', result: 'Smistamento automatico ordinato per priorità.' }
  ];

  return (
    <div className="w-full liquid-glass rounded-2xl border border-white/10 p-6 overflow-hidden shadow-2xl relative space-y-6">
      {/* Blackboard Top */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-primary">
          <Bot className="w-4 h-4" />
          <span>LAVAGNA DIGITALE — PROMPTING PRATICO</span>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground">Utilizzi Concreti nel Lavoro</span>
      </div>

      {/* Selectable Prompt Use Cases */}
      <div className="grid grid-cols-3 gap-2">
        {prompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelectedPrompt(i)}
            className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
              selectedPrompt === i
                ? 'bg-primary/20 border-primary text-foreground'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:text-foreground'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Interactive Prompt & Result Box */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-primary" /> Prompt di esempio
          </div>
          <p className="text-foreground/90 bg-white/5 p-3 rounded-lg border border-white/5">
            "{prompts[selectedPrompt].input}"
          </p>
        </div>

        <div className="flex items-center gap-2 text-primary text-[11px] pt-1">
          <ArrowRight className="w-3.5 h-3.5" />
          <span>Risultato elaborato</span>
        </div>

        <div className="bg-emerald-400/10 border border-emerald-400/20 p-3 rounded-lg text-emerald-400 flex items-start gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{prompts[selectedPrompt].result}</span>
        </div>
      </div>
    </div>
  );
}
