import { useInView } from '../hooks/useInView';
import { Mail, MessageCircle } from 'lucide-react';

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="contatti" className="py-24 px-6 md:px-8 max-w-4xl mx-auto">
      <div ref={ref as any} className="text-center mb-12">
        <h2 className={`font-display text-4xl sm:text-5xl text-primary mb-4 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
          Lavoriamo insieme
        </h2>
        <p className={`text-muted-foreground max-w-xl mx-auto text-lg ${isInView ? 'animate-fade-rise-delay' : 'opacity-0'}`}>
          Hai un'idea, un progetto o semplicemente vuoi fare due chiacchiere? Scegli come preferisci contattarmi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a 
          href="https://wa.me/393755532010"
          target="_blank" rel="noopener noreferrer"
          className={`liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}
        >
          <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-6">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h3 className="font-display text-2xl mb-2 text-foreground">WhatsApp</h3>
          <p className="text-muted-foreground text-sm">Mandami un messaggio per una risposta rapida.</p>
        </a>

        <a 
          href="mailto:email@alessiobellan.it"
          className={`liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 ${isInView ? 'animate-fade-rise-delay-2' : 'opacity-0'}`}
          style={{ animationDelay: isInView ? '0.3s' : '0s' }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="font-display text-2xl mb-2 text-foreground">Email</h3>
          <p className="text-muted-foreground text-sm">email@alessiobellan.it</p>
        </a>
      </div>
    </section>
  );
}
