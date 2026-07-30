import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, X } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/constants';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices?: Array<{ category: string; label: string; price: number }>;
  total?: number;
  initialService?: string;
  initialNotes?: string;
}

export function RequestModal({
  isOpen,
  onClose,
  selectedServices = [],
  total = 0,
  initialService = '',
  initialNotes = ''
}: RequestModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [method, setMethod] = useState<'email' | 'whatsapp' | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    if (initialNotes) {
      setFormData((prev) => ({ ...prev, notes: initialNotes }));
    }
  }, [initialNotes]);

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
    if (initialNotes.trim()) {
      return `Nome: ${formData.name || '[NOME]'}\nEmail: ${formData.email}\nTelefono: ${formData.phone}\n\n${initialNotes}`;
    }

    const servicesList = selectedServices.map(s => `- ${s.category}: ${s.label} (€${s.price})`).join('\n');
    const donation = Math.round(total * 0.1);
    
    let text = `Richiesta preventivo da ${formData.name || '[NOME]'}\n\n`;
    if (servicesList) {
      text += `Servizi selezionati:\n${servicesList}\n\n`;
      text += `Totale stimato: ${total}€\n`;
      text += `Di cui il 10% (circa ${donation}€) va in donazione ad ABBO APS.\n\n`;
    }
    
    if (formData.notes.trim()) {
      text += `Note: ${formData.notes.trim()}\n\n`;
    }
    
    text += `Vorrei prenotare una breve chiamata per parlarne insieme.`;
    return text;
  };

  const getActionLink = () => {
    const text = generateMessageText();
    if (method === 'email') {
      const encodedBody = encodeURIComponent(text).replace(/%0A/g, '%0D%0A');
      const subject = encodeURIComponent(`Richiesta preventivo - ${formData.name || '[NOME]'}`);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-rise">
      <div className="relative w-full max-w-lg liquid-glass rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Invia richiesta preventivo
            </h3>
            {initialService && (
              <p className="text-xs font-mono text-primary mt-1">{initialService}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Choose Contact Method */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground">Come preferisci inviarmi i dati della stima?</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleMethodSelect('whatsapp')}
                className="p-5 rounded-2xl liquid-glass border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 flex flex-col items-center justify-center gap-3 transition-all group"
              >
                <MessageCircle className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Invia su WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => handleMethodSelect('email')}
                className="p-5 rounded-2xl liquid-glass border border-white/10 hover:border-primary/40 hover:bg-primary/10 flex flex-col items-center justify-center gap-3 transition-all group"
              >
                <Mail className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Invia via Email</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Form */}
        {step === 2 && (
          <form className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Nome *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Il tuo nome"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
              />
              {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
            </div>

            {method === 'email' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="La tua email"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                />
                {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
              </div>
            )}

            {method === 'whatsapp' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Telefono *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+39 333 1234567"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                />
                {errors.phone && <p className="text-[11px] text-red-400">{errors.phone}</p>}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Note aggiuntive (opzionale)</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Aggiungi eventuali dettagli o tempistiche desiderate..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Cambia metodo
              </button>

              <a
                href={getActionLink()}
                onClick={handleLinkClick}
                className="bg-primary text-primary-foreground rounded-full px-6 py-2.5 text-xs font-medium hover:scale-105 transition-transform"
              >
                Conferma ed invia
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
