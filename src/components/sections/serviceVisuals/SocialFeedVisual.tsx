import { useState } from 'react';
import { Share2, MessageCircle, Heart, Calendar, Sparkles, Send } from 'lucide-react';

export function SocialFeedVisual() {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="w-full liquid-glass rounded-2xl border border-white/10 p-6 overflow-hidden shadow-2xl relative space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-primary">
          <Calendar className="w-4 h-4" />
          <span>PIANO EDITORIALE & CONTENUTI</span>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground">Programmazione Settimanale</span>
      </div>

      {/* Abstract Social Post Card */}
      <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center font-bold text-xs">AB</div>
            <div>
              <div className="text-xs font-semibold text-foreground">Alessio Bellan</div>
              <div className="text-[10px] text-muted-foreground">Strategia & Contenuti</div>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full">Pubblicato</span>
        </div>

        <p className="text-xs text-foreground/90 leading-relaxed font-body">
          Non basta pubblicare tutti i giorni. Serve avere qualcosa da dire che sia utile e coerente con la tua storia. 🚀
        </p>

        {/* Abstract graphic inside post */}
        <div className="p-4 rounded-lg bg-black/40 border border-white/5 text-center space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-widest text-primary">Format Rubrica</span>
          <div className="text-base font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            "Dietro ogni progetto c'è una scelta."
          </div>
        </div>

        {/* Interactive Stats / Actions */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5 text-muted-foreground">
          <button onClick={toggleLike} className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{likes}</span>
          </button>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" />
            <span>12 commenti</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Share2 className="w-4 h-4" />
            <span>Condividi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
