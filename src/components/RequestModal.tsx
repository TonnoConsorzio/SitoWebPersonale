import React, { useState } from 'react';
import { Mail, MessageCircle, X } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/constants';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: Array<{ category: string; label: string; price: number }>;
  total: number;
}

export function RequestModal({ isOpen, onClose, selectedServices, total }: RequestModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [method, setMethod] = useState<'email' | 'whatsapp' | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleMethodSelect = (selectedMethod: 'email' | 'whatsapp') => {
    setMethod(selectedMethod);
    setStep(2);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Il nome è obbligatorio';
    
    if (method === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = "L'email è obbligatoria";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Inserisci un'email valida";
      }
    }
    
    if (method === 'whatsapp') {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Il telefono è obbligatorio';
      } else if (!/^\+?[0-9\s\-]{8,}$/.test(formData.phone)) {
        newErrors.phone = 'Inserisci un numero di telefono valido';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateMessageText = () => {
    const servicesList = selectedServices.map(s => `- ${s.category}: ${s.label} (€${s.price})`).join('\n');
    const donation = Math.round(total * 0.1);
    
    let text = `Richiesta pacchetto da ${formData.name || '[NOME]'}\n\n`;
    text += `Servizi selezionati:\n${servicesList}\n\n`;
    text += `Totale stimato: ${total}€\n`;
    text += `Di cui il 10% (circa ${donation}€) va in donazione ad ABBO APS.\n\n`;
    
    if (formData.notes.trim()) {
      text += `Note: ${formData.notes.trim()}\n\n`;
    }
    
    text += `I prezzi sono indicativi. Il prezzo può ovviamente variare in base alle esigenze specifiche: dopo la richiesta fisseremo una call conoscitiva per confermare le reali necessità e stilare un preventivo ufficiale su misura.`;
    
    return text;
  };

  const getActionLink = () => {
    const text = generateMessageText();
    if (method === 'email') {
      const encodedBody = encodeURIComponent(text).replace(/%0A/g, '%0D%0A');
      const subject = encodeURIComponent(`Richiesta pacchetto - ${formData.name || '[NOME]'}`);
      return `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${encodedBody}`;
    } else {
      const encodedText = encodeURIComponent(text);
      return `https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodedText}`;
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }
    
    onClose();
    setTimeout(() => {
      setStep(1);
      setMethod(null);
      setFormData({ name: '', email: '', phone: '', notes: '' });
      setErrors({});
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-secondary/90 border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground bg-white/5 rounded-full hover:bg-white/10 transition-colors z-10"
          aria-label="Chiudi"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {step === 1 && (
            <div className="animate-fade-rise">
              <h2 className="font-display text-2xl text-foreground mb-2">Come preferisci essere contattato?</h2>
              <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                Scegli il canale che preferisci per inviare la richiesta. Non salveremo nessun dato.
              </p>
              
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => handleMethodSelect('whatsapp')}
                  className="flex items-center gap-4 w-full p-5 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors text-left group min-h-[64px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-lg">WhatsApp</div>
                    <div className="text-sm text-muted-foreground">Risposta rapida</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleMethodSelect('email')}
                  className="flex items-center gap-4 w-full p-5 rounded-2xl border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors text-left group min-h-[64px]"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-lg">Email</div>
                    <div className="text-sm text-muted-foreground">Più formale</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-rise">
              <div className="flex items-center gap-3 mb-6">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-muted-foreground hover:text-foreground underline decoration-white/20 min-h-[48px] px-2 -ml-2"
                >
                  Indietro
                </button>
              </div>
              
              <h2 className="font-display text-2xl text-foreground mb-6">
                I tuoi dettagli per {method === 'whatsapp' ? 'WhatsApp' : "l'Email"}
              </h2>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-foreground/90 mb-1.5">
                    Nome <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-background border ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-primary'} rounded-xl px-4 py-3.5 text-base text-foreground focus:outline-none focus:ring-1 ${errors.name ? 'focus:ring-red-400' : 'focus:ring-primary'} transition-colors`}
                    placeholder="Il tuo nome"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1.5">{errors.name}</p>}
                </div>

                {method === 'email' && (
                  <div>
                    <label htmlFor="email" className="block text-base font-medium text-foreground/90 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-background border ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-primary'} rounded-xl px-4 py-3.5 text-base text-foreground focus:outline-none focus:ring-1 ${errors.email ? 'focus:ring-red-400' : 'focus:ring-primary'} transition-colors`}
                      placeholder="tua@email.it"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1.5">{errors.email}</p>}
                  </div>
                )}

                {method === 'whatsapp' && (
                  <div>
                    <label htmlFor="phone" className="block text-base font-medium text-foreground/90 mb-1.5">
                      Telefono <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      name="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-background border ${errors.phone ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-primary'} rounded-xl px-4 py-3.5 text-base text-foreground focus:outline-none focus:ring-1 ${errors.phone ? 'focus:ring-red-400' : 'focus:ring-primary'} transition-colors`}
                      placeholder="+39 333 1234567"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1.5">{errors.phone}</p>}
                  </div>
                )}

                <div>
                  <label htmlFor="notes" className="block text-base font-medium text-foreground/90 mb-1.5">
                    Note aggiuntive <span className="text-muted-foreground font-normal">(opzionale)</span>
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3.5 text-base text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors min-h-[100px] resize-y"
                    placeholder="Hai esigenze particolari? Scrivile qui"
                  />
                </div>

                <div className="pt-4">
                  <a
                    href={getActionLink()}
                    onClick={handleLinkClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-4 text-base font-medium hover:scale-[1.02] transition-transform min-h-[56px] shadow-lg shadow-primary/20"
                  >
                    {method === 'whatsapp' ? (
                      <>
                        <MessageCircle className="w-5 h-5" /> Invia su WhatsApp
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" /> Invia via Email
                      </>
                    )}
                  </a>
                  <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed">
                    Il messaggio verrà preparato nella tua app. L'invio non è automatico.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
