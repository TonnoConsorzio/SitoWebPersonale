import { useState } from 'react';
import { Terminal, ArrowRight, CheckCircle } from 'lucide-react';

export const formationPrompts = [
  { title: 'Sintesi Documenti', input: 'Riassumi questo verbale estraendo solo le scadenze e le persone responsabili.', result: 'Estratte 3 scadenze operative senza perdere il contesto.' },
  { title: 'Bozze Contenuti', input: 'Crea una bozza di risposta professionale per una richiesta di preventivo.', result: 'Bozza pronta in 5 secondi, pronta per il controllo umano.' },
  { title: 'Classificazione Dati', input: 'Categorizza queste 50 richieste arrivate dal form in base al servizio.', result: 'Smistamento automatico ordinato per priorità.' }
];

export function AIBoardVisual({ compact = false }: { compact?: boolean }) {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const prompts = formationPrompts;

  return (
    <div className={`ai-board-visual ${compact ? 'ai-board-visual--compact' : ''}`.trim()}>

      {/* Selectable Prompt Use Cases */}
      <div className="ai-board-visual__tabs" role="tablist" aria-label="Esempi di utilizzo">
        {prompts.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedPrompt(i)}
            id={`formation-tab-${i}`}
            role="tab"
            aria-selected={selectedPrompt === i}
            aria-controls="formation-prompt-panel"
            tabIndex={selectedPrompt === i ? 0 : -1}
            onKeyDown={(event) => {
              const nextIndex =
                event.key === 'ArrowRight' || event.key === 'ArrowDown'
                  ? (i + 1) % prompts.length
                  : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                    ? (i - 1 + prompts.length) % prompts.length
                    : event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? prompts.length - 1
                        : -1;

              if (nextIndex >= 0) {
                event.preventDefault();
                setSelectedPrompt(nextIndex);
                document.getElementById(`formation-tab-${nextIndex}`)?.focus();
              }
            }}
            className={`ai-board-visual__tab ${selectedPrompt === i ? 'is-active' : ''}`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Interactive Prompt & Result Box */}
      <div
        id="formation-prompt-panel"
        role="tabpanel"
        aria-labelledby={`formation-tab-${selectedPrompt}`}
        className="ai-board-visual__prompt-panel"
      >
        <div>
          <div className="ai-board-visual__prompt-label">
            <Terminal aria-hidden="true" /> Prompt di esempio
          </div>
          <p className="ai-board-visual__prompt-text">
            “{prompts[selectedPrompt].input}”
          </p>
        </div>

        <div className="ai-board-visual__result-label">
          <ArrowRight aria-hidden="true" />
          <span>Risultato elaborato</span>
        </div>

        <div key={selectedPrompt} className="ai-board-visual__result">
          <CheckCircle aria-hidden="true" />
          <span>{prompts[selectedPrompt].result}</span>
        </div>
      </div>
    </div>
  );
}
