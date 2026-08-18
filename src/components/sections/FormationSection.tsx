import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FormationSection() {
  return (
    <section id="formazione" data-scroll-theme="paper" className="scene scene--formation" aria-labelledby="formazione-title">
      <div className="scene__container formation-scene__layout">
        <div className="formation-scene__copy">
          <p className="eyebrow">Formazione</p>
          <h2 id="formazione-title">Qualcosa che puoi usare il giorno dopo.</h2>
          <p>AI e strumenti digitali spiegati attraverso esempi, esercizi e problemi reali.</p>
          <p>Niente sfilata di tool. L’obiettivo è capire cosa ti serve e imparare a usarlo davvero.</p>
          <Link to="/servizi/formazione-ai" className="text-link">Scopri la formazione <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
