import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollUnderline } from '../ScrollUnderline';

export function About() {
  return (
    <section id="about" data-scroll-theme="paper" className="scene scene--about" aria-labelledby="about-title">
      <div className="scene__container about-scene__layout">
        {/* TODO: replace with Alessio editorial portrait */}
        <div className="about-scene__media about-scene__placeholder" role="img" aria-label="Spazio riservato a un ritratto editoriale di Alessio Bellan" />
        <div className="about-scene__copy">
          <p className="eyebrow">Alessio Bellan</p>
          <h2 id="about-title">Mi piacciono<br />i <ScrollUnderline>problemi storti.</ScrollUnderline></h2>
          <div>
            <p>Progetto e sviluppo siti, automazioni e strumenti digitali.</p>
            <p>Se una soluzione semplice basta, non ti vendo quella complicata.</p>
            <p>Se invece la soluzione non esiste, provo a costruirla.</p>
            <p>E c’è una regola a cui tengo parecchio:</p>
            <p><strong>Durante il progetto sai cosa sta succedendo.</strong></p>
            <p>Non sparisco con la tua idea per tornare settimane dopo con qualcosa che non riconosci.</p>
          </div>
          <Link to="/curriculum" className="text-link">Conosciamoci <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>

      <div id="abbo" data-scroll-theme="yellow" className="abbo-scene">
        <div className="scene__container">
          <h2>Una parte del mio lavoro tiene in piedi anche qualcos’altro.</h2>
          <p>Il <strong>10% del compenso di ogni progetto</strong> sostiene ABBO APS, l’associazione non profit per l’educazione digitale che ho cofondato e presiedo.</p>
          <a href="https://abboaps.org" target="_blank" rel="noopener noreferrer" className="text-link">Conosci ABBO APS <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
