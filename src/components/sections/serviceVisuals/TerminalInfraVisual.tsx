import { useState } from 'react';
import { Server, ShieldCheck, Cpu, HardDrive, CheckCircle2, Terminal } from 'lucide-react';

export function TerminalInfraVisual() {
  const [serverState] = useState({
    status: 'ONLINE',
    uptime: '99.98%',
    containers: 4,
    ssl: 'Attivo (Let\'s Encrypt)',
    memory: '1.2 GB / 4 GB'
  });

  return (
    <div className="w-full liquid-glass rounded-2xl border border-white/10 p-6 overflow-hidden shadow-2xl relative space-y-6">
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Terminal className="w-4 h-4" />
          <span>SYSTEM DASHBOARD — DOCKER & SERVER</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] font-mono text-emerald-400 font-bold">{serverState.status}</span>
        </div>
      </div>

      {/* Grid Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
            <Cpu className="w-3.5 h-3.5 text-primary" /> CPU & RAM
          </div>
          <div className="text-foreground font-bold">{serverState.memory}</div>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
            <Server className="w-3.5 h-3.5 text-primary" /> Docker
          </div>
          <div className="text-foreground font-bold">{serverState.containers} Container</div>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SSL / HTTPS
          </div>
          <div className="text-emerald-400 font-bold">Sicuro</div>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
            <HardDrive className="w-3.5 h-3.5 text-primary" /> Uptime
          </div>
          <div className="text-foreground font-bold">{serverState.uptime}</div>
        </div>
      </div>

      {/* Abstract Command Output */}
      <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1 text-muted-foreground">
        <div className="text-emerald-400">$ docker ps --format "table &#123;&#123;.Names&#125;&#125;\t&#123;&#123;.Status&#125;&#125;"</div>
        <div className="text-foreground/90">web-app-frontend      Up 42 days (healthy)</div>
        <div className="text-foreground/90">api-backend-service    Up 42 days (healthy)</div>
        <div className="text-foreground/90">postgres-database      Up 42 days (healthy)</div>
        <div className="text-foreground/90">nginx-reverse-proxy    Up 42 days (healthy)</div>
      </div>
    </div>
  );
}
