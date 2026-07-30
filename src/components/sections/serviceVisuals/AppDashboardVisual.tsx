import { useState } from 'react';
import { Database, Users, Calendar, FileText, CheckCircle2, TrendingUp } from 'lucide-react';

export function AppDashboardVisual() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'events'>('dashboard');

  return (
    <div className="w-full liquid-glass rounded-2xl border border-white/10 p-4 md:p-6 overflow-hidden shadow-2xl relative">
      {/* Dashboard Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-medium text-sm text-foreground">Gestionale Proprietario</h4>
            <p className="text-[11px] text-muted-foreground">Flusso dati in tempo reale</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'dashboard' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'users' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Users className="w-3.5 h-3.5" />
            Soci & Clienti
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'events' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Iscrizioni
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs text-muted-foreground">Iscritti attivi</span>
              <div className="text-2xl font-bold text-primary font-display">1,420</div>
              <span className="text-[10px] text-emerald-400 font-mono">+12% questo mese</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs text-muted-foreground">Documenti generati</span>
              <div className="text-2xl font-bold text-foreground font-display">348</div>
              <span className="text-[10px] text-muted-foreground font-mono">Automazione attiva</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs text-muted-foreground">Tempo risparmiato</span>
              <div className="text-2xl font-bold text-emerald-400 font-display">~18 ore/mese</div>
              <span className="text-[10px] text-muted-foreground font-mono">Processo senza errori</span>
            </div>
          </div>

          {/* Abstract Data Flow Table */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-foreground">Attività recenti del sistema</span>
              <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">Sincronizzato</span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Nuova iscrizione laboratorio #12', type: 'Modulo → DB', status: 'Completato', color: 'text-emerald-400' },
                { name: 'Generazione ricevuta PDF', type: 'Worker automatico', status: 'Elaborato', color: 'text-emerald-400' },
                { name: 'Invio notifica email di conferma', type: 'Servizio Notifiche', status: 'Inviato', color: 'text-primary' }
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg bg-black/20 border border-white/5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${row.color}`} />
                    <span className="text-foreground">{row.name}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">{row.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <span className="text-xs font-semibold text-foreground">Anagrafica & Ruoli</span>
          <div className="space-y-2 text-xs">
            {['Marco Rossi (Amministratore)', 'Laura Bianchi (Operatore)', 'Giuseppe Verdi (Socio)'].map((u, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-white/5">
                <span className="text-foreground">{u}</span>
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded">Accesso Riservato</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <span className="text-xs font-semibold text-foreground">Calendario Iscrizioni & Posti</span>
          <div className="space-y-2 text-xs">
            {['Laboratorio Coding Scratch — 15/20 posti', 'Corso Robotica LEGO — 18/18 posti (Completo)'].map((ev, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-white/5">
                <span className="text-foreground">{ev}</span>
                <span className="text-[10px] font-mono text-emerald-400">Automatizzato</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
