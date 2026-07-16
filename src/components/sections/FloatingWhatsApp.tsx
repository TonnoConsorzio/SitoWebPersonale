import { MessageCircle } from 'lucide-react';
import config from '../../data/config.json';

export function FloatingWhatsApp() {
  return (
    <a 
      href={`https://wa.me/${config.social.whatsapp}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 liquid-glass rounded-full p-4 text-foreground shadow-lg hover:scale-105 transition-transform"
      aria-label="Contattaci su WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
