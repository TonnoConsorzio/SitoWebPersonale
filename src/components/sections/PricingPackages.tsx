import { ArrowUpRight } from 'lucide-react';
import { ScrollUnderline } from '../ScrollUnderline';
import { useHomeCopy } from '../../hooks/useHomeCopy';

export function PricingPackages() {
  const copy = useHomeCopy().pricing;
  return (
    <section id="prezzi" data-scroll-theme="paper" className="scene scene--pricing" aria-labelledby="prezzi-title">
      <div className="scene__container">
        <div className="pricing-scene__intro">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="prezzi-title"><ScrollUnderline>{copy.titleEmphasis}</ScrollUnderline><br />{copy.titleB}</h2>
          </div>
          <div className="pricing-scene__support"><p>{copy.introA}</p><p>{copy.introB}</p></div>
        </div>
        <div className="pricing-rows">
          {copy.packages.map((pkg) => (
            <article key={pkg.name} className="pricing-row">
              <p className="pricing-row__name">{pkg.name}</p>
              <div><s className="text-sm text-[color:var(--experience-muted)]">{pkg.oldPrice}</s><p className="pricing-row__price">{pkg.price}</p></div>
              <p className="pricing-row__features">{pkg.features.join(' · ')}</p>
              <div className="pricing-row__action"><p className="pricing-row__saving">{pkg.saving}</p><a href="#contatti" className="text-link">{copy.contact} <ArrowUpRight size={16} aria-hidden="true" /></a></div>
            </article>
          ))}
        </div>
        <div className="pricing-scene__footnote"><p>{copy.footnote}</p><a href="#contatti" className="text-link">{copy.book} <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
