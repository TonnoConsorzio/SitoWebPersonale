import { useState } from 'react';
import { Layout, Globe, Search, CheckCircle, Monitor, Smartphone } from 'lucide-react';

export function BrowserWireframeVisual() {
  const [isWireframe, setIsWireframe] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="w-full liquid-glass rounded-2xl border border-white/10 p-4 md:p-6 overflow-hidden shadow-2xl relative">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
          <div className="ml-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 font-mono text-[11px] text-muted-foreground flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>https://tuosito.it</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`px-3 py-1.5 rounded-full border font-mono transition-all ${
              isWireframe
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:text-foreground'
            }`}
          >
            {isWireframe ? 'Modalità Wireframe' : 'Sito Completo'}
          </button>

          <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-full transition-colors ${device === 'desktop' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
              title="Desktop view"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-full transition-colors ${device === 'mobile' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
              title="Mobile view"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Screen Canvas */}
      <div
        className={`transition-all duration-500 mx-auto ${
          device === 'mobile' ? 'max-w-[320px] rounded-3xl border-4 border-white/20 p-2' : 'w-full'
        }`}
      >
        <div className={`space-y-4 transition-all duration-500 ${isWireframe ? 'font-mono opacity-85' : ''}`}>
          {/* Header mockup */}
          <div className={`p-4 rounded-xl flex items-center justify-between ${isWireframe ? 'border-2 border-dashed border-white/20 bg-transparent' : 'bg-white/5 border border-white/10'}`}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary/40 flex items-center justify-center font-bold text-xs">AB</div>
              <span className="font-display font-medium text-sm">Alessio Bellan</span>
            </div>
            <div className="hidden sm:flex gap-3 text-xs text-muted-foreground">
              <span>Home</span>
              <span>Servizi</span>
              <span>Portfolio</span>
            </div>
            <div className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">Contatti</div>
          </div>

          {/* Hero section mockup */}
          <div className={`p-6 md:p-8 rounded-xl ${isWireframe ? 'border-2 border-dashed border-white/20' : 'bg-gradient-to-br from-primary/20 via-white/5 to-transparent border border-primary/20'}`}>
            <div className="max-w-md space-y-3">
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-mono bg-primary/20 text-primary">
                {isWireframe ? '[WIRE-FRAME-V1]' : 'PROGETTO SU MISURA'}
              </div>
              <h4 className="text-xl md:text-2xl font-display leading-tight">
                {isWireframe ? 'h1: Un sito non deve soltanto esserci' : 'Ogni progetto racconta una storia'}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isWireframe ? 'p: Progetto siti veloci, chiari e costruiti intorno alle persone.' : 'Progetto soluzioni digitali veloci, trasparenti e costruite sul tuo lavoro.'}
              </p>
              <div className="flex gap-2 pt-2">
                <div className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-medium">Inizia ora</div>
                <div className="px-4 py-2 border border-white/10 rounded-full text-xs text-muted-foreground">Scopri i servizi</div>
              </div>
            </div>
          </div>

          {/* Feature Grid Mockup */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { title: 'Velocità CWV', value: '98/100' },
              { title: 'Responsive', value: 'Fluid' },
              { title: 'Proprietà', value: '100%' }
            ].map((f, i) => (
              <div key={i} className={`p-3 rounded-lg text-center ${isWireframe ? 'border border-dashed border-white/20' : 'bg-white/5 border border-white/10'}`}>
                <div className="text-xs text-muted-foreground">{f.title}</div>
                <div className="text-sm font-bold text-primary mt-1">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
