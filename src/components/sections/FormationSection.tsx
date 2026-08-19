import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHomeCopy } from '../../hooks/useHomeCopy';
import { AIBoardVisual } from './serviceVisuals/AIBoardVisual';

export function FormationSection() {
  const copy = useHomeCopy().formation;
  return (
    <section id="formazione" data-scroll-theme="paper" className="scene scene--formation" aria-labelledby="formazione-title">
      <div className="scene__container formation-scene__layout">
        <div className="formation-scene__copy">
          <h2 id="formazione-title">{copy.title}</h2>
          <p>{copy.copyA}</p>
          <p>{copy.copyB}</p>
          <Link to="/servizi/formazione-ai" className="text-link">{copy.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="formation-scene__preview"><AIBoardVisual compact /></div>
      </div>
    </section>
  );
}
