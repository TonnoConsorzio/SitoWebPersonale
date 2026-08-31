import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHomeCopy } from '../../hooks/useHomeCopy';
import { ScrollUnderline } from '../ScrollUnderline';
import { AIBoardVisual } from './serviceVisuals/AIBoardVisual';

export function FormationSection() {
  const copy = useHomeCopy().formation;
  const { i18n } = useTranslation();
  const emphasis = i18n.language.startsWith('en') ? 'day after' : 'giorno dopo';
  const [before, after] = copy.title.split(emphasis);
  return (
    <section id="formazione" data-scroll-theme="paper" className="scene scene--formation" aria-labelledby="formazione-title">
      <div className="scene__container formation-scene__layout">
        <div className="formation-scene__copy">
          <h2 id="formazione-title">{before}<ScrollUnderline>{emphasis}</ScrollUnderline>{after}</h2>
          <p>{copy.copyA}</p>
          <p>{copy.copyB}</p>
          <Link to="/servizi/formazione-ai" className="text-link">{copy.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="formation-scene__preview"><AIBoardVisual compact /></div>
      </div>
    </section>
  );
}
