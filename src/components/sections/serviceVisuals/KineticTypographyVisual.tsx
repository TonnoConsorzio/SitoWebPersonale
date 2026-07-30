import { useState } from 'react';
import { Palette, Type, Layers } from 'lucide-react';

export function KineticTypographyVisual() {
  const [activePalette, setActivePalette] = useState(0);

  const palettes = [
    { name: 'Identità Primaria', colors: ['#031A24', '#0EA5E9', '#FFFFFF', '#64748B'] },
    { name: 'Editorial Dark', colors: ['#0A0A0C', '#E2E8F0', '#38BDF8', '#1E293B'] },
    { name: 'Warm Brand', colors: ['#1C1917', '#F97316', '#FEF3C7', '#78350F'] }
  ];

  return (
    <div className="w-full liquid-glass rounded-2xl border border-white/10 p-6 overflow-hidden shadow-2xl relative space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-primary">
          <Type className="w-4 h-4" />
          <span>SISTEMA VISIVO & TIPOGRAFIA</span>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground">Vector SVG + Brand Guidelines</span>
      </div>

      {/* Kinetic Typography Display */}
      <div className="relative py-4 text-center space-y-2">
        <div 
          className="text-5xl md:text-7xl font-display tracking-tight text-foreground transition-all duration-700 hover:tracking-widest cursor-default select-none"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Riconoscibile.
        </div>
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
          Carattere • Forme • Coerenza
        </p>
      </div>

      {/* Palette Swatches */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-primary" />
            {palettes[activePalette].name}
          </span>
          <button
            onClick={() => setActivePalette((prev) => (prev + 1) % palettes.length)}
            className="text-[11px] font-mono text-primary hover:underline"
          >
            Cambia palette →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 h-12 rounded-lg overflow-hidden border border-white/10">
          {palettes[activePalette].colors.map((hex, idx) => (
            <div
              key={idx}
              className="h-full flex items-end justify-center pb-1 text-[10px] font-mono transition-transform hover:scale-105"
              style={{ backgroundColor: hex, color: idx === 2 ? '#000' : '#FFF' }}
            >
              {hex}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
