import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

type VisualKind = 'showroom' | 'system' | 'workflow' | 'identity' | 'newsroom' | 'lab' | 'map' | 'gallery';

type ServiceSignatureVisualProps = {
  kind: VisualKind;
  data: any;
};

const projectImages = {
  showroom: '/media/projects/dh/cover.webp',
  system: '/media/projects/abbo-aps/cover.png',
  identity: '/media/projects/abbo-aps/gallery-1.png',
  galleryA: '/media/projects/fumagalli/cover.png',
  galleryB: '/media/projects/dh/gallery-2.png',
  galleryC: '/media/projects/abbo-aps/gallery-2.png'
};

const formationExamples = [
  {
    title: 'Sintesi documenti',
    input: 'Estrarre scadenze e responsabili da un verbale.',
    output: 'Un elenco verificabile, pronto da controllare.'
  },
  {
    title: 'Bozze contenuti',
    input: 'Preparare una prima risposta a una richiesta reale.',
    output: 'Una base chiara da rivedere e firmare.'
  },
  {
    title: 'Classificazione dati',
    input: 'Ordinare le richieste arrivate da un modulo.',
    output: 'Dati raggruppati senza ricopiare tutto a mano.'
  }
];

function IndexRows({ items }: { items: string[] }) {
  return (
    <ol className="service-visual__rows">
      {items.map((item, index) => (
        <li key={item}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{item}</strong>
        </li>
      ))}
    </ol>
  );
}

export function ServiceSignatureVisual({ kind, data }: ServiceSignatureVisualProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [workflowMode, setWorkflowMode] = useState<'before' | 'after'>('before');
  const items = (data.offerings || data.examples || data.tasks || data.paths || data.includes || []).map((item: any) => (
    typeof item === 'string' ? item : item.title
  ));

  if (kind === 'showroom') {
    return (
      <div className="service-visual service-visual--showroom">
        <Link to="/portfolio/2" className="service-visual__image-link">
          <img src={projectImages.showroom} alt="Anteprima del progetto Digital Heroes" />
          <span>Apri il progetto <ExternalLink size={15} aria-hidden="true" /></span>
        </Link>
        <div className="service-visual__caption">
          <span>Sito web e gestionale</span>
          <strong>Un sito deve far capire cosa succede dopo.</strong>
        </div>
      </div>
    );
  }

  if (kind === 'system') {
    return (
      <div className="service-visual service-visual--system">
        <div className="service-visual__project-head">
          <span>Progetto reale</span>
          <strong>ABBO APS</strong>
        </div>
        <img src={projectImages.system} alt="Anteprima del gestionale ABBO APS" />
        <IndexRows items={items.slice(0, 5)} />
      </div>
    );
  }

  if (kind === 'workflow') {
    const examples = data.examples || [];
    return (
      <div className="service-visual service-visual--workflow">
        <div className="service-visual__switch" role="group" aria-label="Confronta il flusso di lavoro">
          <button type="button" className={workflowMode === 'before' ? 'is-active' : ''} onClick={() => setWorkflowMode('before')}>Prima</button>
          <button type="button" className={workflowMode === 'after' ? 'is-active' : ''} onClick={() => setWorkflowMode('after')}>Dopo</button>
        </div>
        <div className="service-visual__workflow-copy">
          <span>{workflowMode === 'before' ? 'Passaggi sparsi' : 'Un flusso ordinato'}</span>
          <strong>{workflowMode === 'before' ? 'Copie, controlli e doppioni.' : 'Un passaggio arriva al successivo.'}</strong>
        </div>
        <ol className="service-visual__flow">
          {(workflowMode === 'before' ? examples : examples.slice(0, 2)).map((item: any, index: number) => (
            <li key={item.title}>
              <span>{index + 1}</span>
              <div><strong>{item.title}</strong><small>{item.desc}</small></div>
              {index < (workflowMode === 'before' ? examples : examples.slice(0, 2)).length - 1 && <ArrowRight aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (kind === 'identity') {
    return (
      <div className="service-visual service-visual--identity">
        <div className="service-visual__identity-mark">ABBO</div>
        <div className="service-visual__identity-meta">
          <span>Sistema visivo</span>
          <strong>Un’identità tiene insieme segni, parole e materiali.</strong>
        </div>
        <img src={projectImages.identity} alt="Applicazione dell'identità visiva ABBO APS" />
        <div className="service-visual__swatches" aria-label="Palette di progetto">
          {['#0A0A0A', '#FBCF15', '#E4DDD0', '#F1ECE2'].map((color) => <span key={color} style={{ backgroundColor: color }} />)}
        </div>
      </div>
    );
  }

  if (kind === 'newsroom') {
    const rows = data.approach || [];
    return (
      <div className="service-visual service-visual--newsroom">
        <div className="service-visual__newsroom-title"><span>Redazione</span><strong>Dal tema al contenuto</strong></div>
        <ol className="service-visual__newsroom-list">
          {rows.map((row: any, index: number) => (
            <li key={row.title} className={activeIndex === index ? 'is-active' : ''}>
              <button type="button" onClick={() => setActiveIndex(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{row.title}</strong>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
              {activeIndex === index && <p>{row.desc}</p>}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (kind === 'lab') {
    const example = formationExamples[activeIndex % formationExamples.length];
    return (
      <div className="service-visual service-visual--lab">
        <div className="service-visual__lab-tabs" role="tablist" aria-label="Esempi di formazione">
          {formationExamples.map((item, index) => (
            <button key={item.title} type="button" role="tab" aria-selected={activeIndex === index} className={activeIndex === index ? 'is-active' : ''} onClick={() => setActiveIndex(index)}>{item.title}</button>
          ))}
        </div>
        <div className="service-visual__lab-step"><span>1</span><div><small>Partenza</small><strong>{example.input}</strong></div></div>
        <div className="service-visual__lab-step"><span>2</span><div><small>Risultato</small><strong>{example.output}</strong></div></div>
        <p>Il metodo si adatta al lavoro reale. L’output resta da controllare.</p>
      </div>
    );
  }

  if (kind === 'map') {
    const layers = ['Dominio', 'DNS', 'Hosting', 'Backup', 'Docker'];
    return (
      <div className="service-visual service-visual--map">
        <div className="service-visual__map-head"><span>System map</span><strong>Quello che c’è dietro</strong></div>
        <ol className="service-visual__map-list">
          {layers.map((layer, index) => (
            <li key={layer} className={activeIndex === index ? 'is-active' : ''}>
              <button type="button" onClick={() => setActiveIndex(index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{layer}</strong></button>
              {activeIndex === index && <p>{['Il nome con cui le persone arrivano al sito.', 'Il collegamento che porta il dominio al server giusto.', 'L’ambiente dove vivono sito e strumenti.', 'Copie per poter ripristinare i dati.', 'Contenitori separati per gestire i servizi.'][index]}</p>}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="service-visual service-visual--gallery">
      <div className="service-visual__gallery-main"><img src={projectImages.galleryA} alt="Progetto La Voce del Fumagalli" /><span>Progetti reali</span></div>
      <div className="service-visual__gallery-side"><img src={projectImages.galleryB} alt="Dettaglio progetto Digital Heroes" /><img src={projectImages.galleryC} alt="Dettaglio progetto ABBO APS" /></div>
      <div className="service-visual__gallery-caption"><strong>Un materiale deve avere una direzione.</strong><Link to="/portfolio">Vedi i progetti <ArrowRight size={16} aria-hidden="true" /></Link></div>
    </div>
  );
}
