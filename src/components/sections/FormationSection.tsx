import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHomeCopy } from '../../hooks/useHomeCopy';

export function FormationSection() {
  const copy = useHomeCopy().formation;
  const { i18n } = useTranslation();
  const english = i18n.language.startsWith('en');
  const points = english
    ? [
        ['Documents and copy', 'Writing, summaries and review.'],
        ['Repetitive tasks', 'Steps to reduce or automate.'],
        ['Tools that stay yours', 'Clear guidance to keep working independently.']
      ]
    : [
        ['Documenti e testi', 'Scrittura, sintesi e revisione.'],
        ['Attività ripetitive', 'Passaggi da ridurre o automatizzare.'],
        ['Strumenti che restano tuoi', 'Indicazioni chiare per continuare da solo.']
      ];
  return (
    <section id="formazione" data-scroll-theme="paper" className="scene scene--formation" aria-labelledby="formazione-title">
      <div className="scene__container formation-scene__layout">
        <div className="formation-scene__copy">
          <p className="section-kicker">{english ? 'Practical training' : 'Formazione'}</p>
          <h2 id="formazione-title">{copy.title}</h2>
          <p>{copy.copyA}</p>
          <p className="formation-scene__supporting-copy">{copy.copyB}</p>
          <Link to="/servizi/formazione-ai" className="text-link">{copy.cta} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="formation-scene__preview">
          <p className="formation-scene__preview-label">{english ? 'What we work on' : 'Su cosa lavoriamo'}</p>
          <ul className="formation-scene__list">
            {points.map(([title, description]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
