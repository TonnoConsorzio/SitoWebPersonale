import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Check, Info } from 'lucide-react';
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

  // Sconto bundle: 3% se 2 servizi, 5% se 3+ servizi
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
        title="Prezzi e Configuratore Pacchetti" 
        description="Calcola il preventivo per il tuo sito web, gestionale o brand identity. Scegli i servizi e ottieni subito una stima dei costi. Il 10% va in donazione."
        canonical="/prezzi"
      />
      <Navigation />
      <main className="pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6 text-primary">Crea il tuo pacchetto</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Invece di pacchetti fissi, scegli esattamente cosa ti serve. Più servizi selezioni, maggiore sarà lo sconto bundle applicato automaticamente. Trasparenza totale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            {pricingData.map((category: any) => (
              <section key={category.id}>
                <h2 className="font-display text-2xl mb-6 text-foreground border-b border-white/10 pb-4">{category.category}</h2>
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
                          <h3 className={`font-display text-lg ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                            {option.label}
                          </h3>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-white/20'}`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                        <div className="text-xl font-bold mb-3 flex-grow">
                          €{option.price}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
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
              <h2 className="font-display text-3xl mb-6 text-primary">Riepilogo</h2>
              
              {selectedCount === 0 ? (
                <p className="text-muted-foreground text-sm italic mb-8">Nessun servizio selezionato. Scegli le opzioni a sinistra per comporre il tuo pacchetto.</p>
              ) : (
                <div className="space-y-4 mb-8">
                  {Object.entries(selectedOptions).map(([catId, optId]) => {
                    const cat = pricingData.find((c: any) => c.id === catId);
                    const opt = cat?.options.find((o: any) => o.id === optId);
                    if (!cat || !opt) return null;
                    return (
                      <div key={catId} className="flex justify-between items-center text-sm border-b border-white/5 pb-4 last:border-0 last:pb-0">
                        <div>
                          <div className="text-muted-foreground text-sm mb-1">{cat.category}</div>
                          <div className="text-foreground font-medium">{opt.label}</div>
                        </div>
                        <div className="font-mono text-foreground">€{opt.price}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="bg-background/50 rounded-2xl p-6 mb-8 border border-white/5">
                <div className="flex justify-between text-sm mb-3 text-muted-foreground">
                  <span>Subtotale</span>
                  <span>€{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm mb-3 text-emerald-400 font-medium">
                    <span>Sconto Bundle ({discountPercent}%)</span>
                    <span>-€{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-2xl font-bold text-primary mt-4 pt-4 border-t border-white/10">
                  <span>Totale stimato</span>
                  <span>€{total}</span>
                </div>
                {total > 0 && (
                  <div className="flex justify-between text-sm mt-3 text-emerald-400 font-medium">
                    <span>In donazione (10%)</span>
                    <span>€{Math.round(total * 0.1)}</span>
                  </div>
                )}
              </div>

              <button 
                type="button"
                className={`block text-center rounded-full w-full py-4 text-base font-medium transition-all ${selectedCount > 0 ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] shadow-[0_0_20px_rgba(var(--primary),0.2)]' : 'bg-white/5 text-muted-foreground cursor-not-allowed'}`}
                onClick={() => {
                  if (selectedCount > 0) setIsModalOpen(true);
                }}
              >
                Richiedi questo pacchetto
              </button>

              <div className="flex items-start gap-3 mt-6 text-sm text-muted-foreground bg-primary/5 p-4 rounded-xl">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p>
                  I prezzi sono indicativi. Dopo la tua richiesta fisseremo una call conoscitiva per confermare le tue reali necessità e stilare un preventivo ufficiale su misura.
                </p>
              </div>

              <div className="text-center text-sm text-muted-foreground/80 mt-8">
                <p className="mb-2 font-medium italic text-emerald-400">Il 10% del totale va in donazione</p>
                Questo importo sostiene <a href="https://abboaps.it" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">ABBO APS</a> per aiutare e finanziare progetti educativi e laboratori di informatica dedicati ai giovani.
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
