import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { Check, Info, Sparkles, ArrowRight } from 'lucide-react';
import pricingData from '../data/pricingCalculator.json';
import { RequestModal } from '../components/RequestModal';
import { SEO } from '../components/SEO';

export function PricingPage() {
  const [searchParams] = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const preselectedService = searchParams.get('service');
    if (preselectedService === 'siti-web') {
      setSelectedOptions(prev => ({ ...prev, website: 'web-standard' }));
    } else if (preselectedService === 'gestionali') {
      setSelectedOptions(prev => ({ ...prev, app: 'app-base' }));
    } else if (preselectedService === 'grafica') {
      setSelectedOptions(prev => ({ ...prev, brand: 'brand-kit' }));
    } else if (preselectedService === 'social') {
      setSelectedOptions(prev => ({ ...prev, social: 'social-standard' }));
    } else if (preselectedService === 'infrastrutture') {
      setSelectedOptions(prev => ({ ...prev, infra: 'infra-setup' }));
    }
  }, [searchParams]);

  const toggleOption = (categoryId: string, optionId: string) => {
    setSelectedOptions(prev => {
      if (prev[categoryId] === optionId) {
        const newState = { ...prev };
        delete newState[categoryId];
        return newState;
      }
      return { ...prev, [categoryId]: optionId };
    });
  };

  const selectedCount = Object.keys(selectedOptions).length;

  const discountPercent = selectedCount >= 3 ? 5 : selectedCount === 2 ? 3 : 0;

  const { subtotal, discount, total } = useMemo(() => {
    let sub = 0;
    Object.entries(selectedOptions).forEach(([catId, optId]) => {
      const cat = pricingData.find((c: any) => c.id === catId);
      if (cat) {
        const opt = cat.options.find((o: any) => o.id === optId);
        if (opt) {
          sub += opt.price;
        }
      }
    });
    const disc = Math.floor(sub * (discountPercent / 100));
    return { subtotal: sub, discount: disc, total: sub - disc };
  }, [selectedOptions, discountPercent]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSelectedServicesList = () => {
    const list: Array<{ category: string; label: string; price: number }> = [];
    Object.entries(selectedOptions).forEach(([catId, optId]) => {
      const cat = pricingData.find((c: any) => c.id === catId);
      const opt = cat?.options.find((o: any) => o.id === optId);
      if (cat && opt) {
        list.push({ category: cat.category, label: opt.label, price: opt.price });
      }
    });
    return list;
  };

  return (
    <>
      <SEO 
        title="Prezzi e Stima del Progetto | Alessio Bellan" 
        description="Calcola una stima guidata o configura le opzioni per il tuo progetto digitale. Trasparenza sui costi e il 10% in donazione ad ABBO APS."
        canonical="/prezzi"
      />
      <Navigation />

      <main className="pt-28 pb-24 px-6 md:px-8 max-w-7xl mx-auto space-y-12">
        {/* Banner Callout for Guided Estimator */}
        <div className="liquid-glass p-6 md:p-8 rounded-3xl border border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STIMA GUIDATA</span>
            </div>
            <h2 className="text-xl md:text-2xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Vuoi calcolare una prima fascia di prezzo in 1 minuto?
            </h2>
            <p className="text-xs text-muted-foreground">
              Rispondi alle domande del nostro stimatore guidato senza inserire l'email.
            </p>
          </div>
          <Link
            to="/stima-progetto"
            className="liquid-glass rounded-full px-6 py-3 text-foreground font-medium hover:scale-[1.03] transition-transform text-xs shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>Prova lo stimatore</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="text-center">
          <h1 className="font-display text-4xl md:text-6xl mb-4 text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Listino e opzioni
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Scegli esattamente le voci di cui hai bisogno oppure richiedi direttamente una prima stima.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {pricingData.map((category: any) => (
              <section key={category.id}>
                <h2 className="font-display text-2xl mb-6 text-foreground border-b border-white/10 pb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {category.options.map((option: any) => {
                    const isSelected = selectedOptions[category.id] === option.id;
                    return (
                      <div 
                        key={option.id}
                        onClick={() => toggleOption(category.id, option.id)}
                        className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border flex flex-col ${isSelected ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--primary),0.15)]' : 'liquid-glass border-transparent hover:border-white/10'}`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className={`font-display text-base font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                            {option.label}
                          </h3>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-white/20'}`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                        <div className="text-xl font-bold mb-3 flex-grow">
                          €{option.price}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 liquid-glass rounded-3xl p-8 border border-white/10">
              <h2 className="font-display text-2xl mb-6 text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Riepilogo</h2>
              
              {selectedCount === 0 ? (
                <p className="text-muted-foreground text-xs italic mb-8">Nessun servizio selezionato. Scegli le opzioni a sinistra per comporre il tuo pacchetto.</p>
              ) : (
                <div className="space-y-4 mb-8">
                  {Object.entries(selectedOptions).map(([catId, optId]) => {
                    const cat = pricingData.find((c: any) => c.id === catId);
                    const opt = cat?.options.find((o: any) => o.id === optId);
                    if (!cat || !opt) return null;
                    return (
                      <div key={catId} className="flex justify-between items-center text-xs border-b border-white/5 pb-4 last:border-0 last:pb-0">
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">{cat.category}</div>
                          <div className="text-foreground font-medium">{opt.label}</div>
                        </div>
                        <div className="font-mono text-foreground">€{opt.price}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="bg-black/40 rounded-2xl p-5 mb-8 border border-white/5 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotale</span>
                  <span>€{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-medium">
                    <span>Sconto Bundle ({discountPercent}%)</span>
                    <span>-€{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-primary mt-3 pt-3 border-t border-white/10">
                  <span>Totale stimato</span>
                  <span>€{total}</span>
                </div>
                {total > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-medium pt-1">
                    <span>In donazione (10%)</span>
                    <span>€{Math.round(total * 0.1)}</span>
                  </div>
                )}
              </div>

              <button 
                type="button"
                className={`block text-center rounded-full w-full py-3.5 text-xs font-medium transition-all ${selectedCount > 0 ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02]' : 'bg-white/5 text-muted-foreground cursor-not-allowed'}`}
                onClick={() => {
                  if (selectedCount > 0) setIsModalOpen(true);
                }}
              >
                Richiedi questo pacchetto
              </button>

              <div className="flex items-start gap-2.5 mt-6 text-xs text-muted-foreground bg-white/5 p-4 rounded-xl">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p>
                  I prezzi sono indicativi. Il preventivo ufficiale viene concordato dopo una breve chiamata conoscitiva.
                </p>
              </div>

              <div className="text-center text-xs text-muted-foreground/80 mt-6">
                <p className="mb-1 font-medium text-emerald-400">Il 10% del totale va in donazione</p>
                Sostiene <a href="https://abboaps.it" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">ABBO APS</a> per progetti educativi ed informatica.
              </div>
            </div>
          </div>
        </div>
      </main>

      <RequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedServices={getSelectedServicesList()} 
        total={total} 
      />

      <Footer />
    </>
  );
}
