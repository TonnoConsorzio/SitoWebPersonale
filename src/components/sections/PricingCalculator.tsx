import { useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
import { Heart, MessageCircle, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import config from '../../data/config.json';
import pricingData from '../../data/pricingCalculator.json';

const shortNames: Record<string, string> = {
  'web-landing': 'Essenziale',
  'web-standard': 'Standard',
  'web-custom': 'Su Misura',
  'app-micro': 'Micro-tool',
  'app-base': 'Base',
  'app-pro': 'Avanzato',
  'brand-logo': 'Logo',
  'brand-kit': 'Brand Kit',
  'brand-full': 'Identità Completa',
  'social-base': 'Base',
  'social-standard': 'Standard',
  'social-full': 'Full',
  'infra-setup': 'Setup Server',
  'copy-base': 'Base',
  'copy-standard': 'Standard',
  'copy-full': 'Full',
  'seo-base': 'On-page Base',
  'seo-standard': 'Standard',
  'seo-continuous': 'Continuativa'
};

const categories = pricingData.map(cat => ({
  id: cat.id,
  name: cat.category,
  description: cat.id === 'social' ? 'Gestione strategica per costruire una community e raccontare il tuo valore.' : undefined,
  options: cat.options.map(opt => ({
    id: opt.id,
    name: shortNames[opt.id] || opt.label,
    price: opt.price,
    desc: opt.description
  }))
}));

function AnimatedTotal({ total }: { total: number }) {
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    let start = displayTotal;
    const end = total;
    if (start === end) return;
    
    let startTime: number | null = null;
    const duration = 800; // ms
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayTotal(Math.floor(start + (end - start) * easeProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [total]);

  return <span>€{displayTotal}</span>;
}

export function PricingCalculator() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [selections, setSelections] = useState<Record<string, number | null>>(() => {
    const initial: Record<string, number | null> = {};
    categories.forEach(c => {
      initial[c.id] = null; // start with nothing selected
    });
    return initial;
  });

  const toggleOption = (categoryId: string, index: number) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index
    }));
  };

  const total = categories.reduce((acc, cat) => {
    const selectedIndex = selections[cat.id];
    if (selectedIndex === null) return acc;
    const option = cat.options[selectedIndex];
    return acc + (option ? option.price : 0);
  }, 0);

  const donationAmount = Math.floor(total * 0.1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateMessage = () => {
    let msg = "Ciao Alessio! Ho appena configurato un preventivo sul tuo sito:\n\nServizi selezionati:\n";
    categories.forEach(cat => {
      const selectedIndex = selections[cat.id];
      if (selectedIndex !== null) {
        const option = cat.options[selectedIndex];
        msg += `- ${cat.name}: ${option.name} (€${option.price})\n`;
      }
    });
    msg += `\nTotale stimato: €${total}\n`;
    if (donationAmount > 0) {
      msg += `Donazione ad ABBO APS: €${donationAmount}\n`;
    }
    msg += "\nVorrei prenotare una chiamata per parlarne insieme.";
    return encodeURIComponent(msg);
  };

  const whatsappLink = `https://wa.me/${config.social.whatsapp}?text=${generateMessage()}`;
  const emailLink = `mailto:info@alessiobellan.it?subject=Richiesta%20Preventivo&body=${generateMessage()}`;

  return (
    <section ref={ref as any} className="py-24 px-8 max-w-5xl mx-auto">
      <div className={`text-center mb-16 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Quanto potrebbe costare il tuo progetto</h2>
        <p className="text-muted-foreground text-lg">Seleziona i servizi per configurare una stima iniziale. Clicca di nuovo per deselezionare.</p>
      </div>

      <div className={`liquid-glass rounded-3xl p-8 md:p-12 ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 mb-12">
          {categories.map(category => {
            const selectedIndex = selections[category.id];
            const currentOption = selectedIndex !== null ? category.options[selectedIndex] : null;

            return (
              <div key={category.id} className="relative flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-medium text-foreground">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <span className={`font-display text-3xl transition-opacity ${currentOption ? 'text-primary opacity-100' : 'text-muted-foreground opacity-30'}`} style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {currentOption ? `€${currentOption.price}` : '€0'}
                  </span>
                </div>
                
                <div className="flex-1 flex flex-col justify-end mt-auto pt-4">
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 relative overflow-hidden">
                      {category.options.map((opt, i) => {
                        const isSelected = i === selectedIndex;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => toggleOption(category.id, i)}
                            className={`flex-1 py-3 px-1 text-[10px] sm:text-xs md:text-sm font-medium rounded-xl transition-colors duration-300 relative z-10 outline-none ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId={`active-pill-${category.id}`}
                                className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                            <span className="relative z-10">{opt.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-xl text-sm text-muted-foreground leading-relaxed border border-white/5 shadow-inner min-h-[80px]">
                    {currentOption ? (
                      <>
                        <strong className="text-foreground block mb-1">{currentOption.name}</strong>
                        {currentOption.desc}
                      </>
                    ) : (
                      <span className="opacity-60 italic flex items-center justify-center h-full text-xs">
                        Nessun piano selezionato
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col items-center">
          <div className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Stima indicativa</div>
          <div className="text-5xl md:text-7xl font-display text-primary mb-6">
            <AnimatedTotal total={total} />
          </div>
          
          <AnimatePresence>
            {total > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-primary mb-8 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20 text-center"
              >
                <Heart className="w-5 h-5 shrink-0" />
                <span>
                  <strong>€{donationAmount}</strong> (il 10% del totale) andranno in donazione ad <strong>ABBO APS</strong>.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-muted-foreground text-sm max-w-md mb-8">
            Questa è una stima indicativa — il preventivo definitivo arriva dopo una chiamata conoscitiva in cui analizziamo le tue reali necessità.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="liquid-glass rounded-full px-8 py-4 text-foreground font-medium hover:scale-[1.03] transition-transform"
          >
            Invia preventivo
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="liquid-glass p-8 rounded-3xl max-w-sm w-full shadow-2xl border border-white/20 relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-display text-foreground mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>Contattami</h3>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                Come preferisci inviarmi il preventivo? Ti risponderò al più presto per organizzare la chiamata.
              </p>
              
              <div className="flex flex-col gap-3">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white py-3.5 px-4 rounded-xl flex items-center justify-center font-medium hover:bg-[#20bd5a] transition-colors gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Invia su WhatsApp
                </a>
                <a 
                  href={emailLink}
                  className="bg-white/10 border border-white/10 text-foreground py-3.5 px-4 rounded-xl flex items-center justify-center font-medium hover:bg-white/20 transition-colors gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Invia via Email
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
