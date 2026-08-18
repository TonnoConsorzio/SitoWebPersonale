import { ArrowUpRight } from 'lucide-react';
import { ScrollUnderline } from '../ScrollUnderline';

const packages = [
  { name: 'PARTENZA', oldPrice: '880 €', price: '790 €', saving: 'Risparmi 90 €', features: ['Sito Essenziale', 'Logo'] },
  { name: 'CRESCITA', oldPrice: '2.255 €', price: '2.030 €', saving: 'Risparmi 225 €', features: ['Sito Standard', 'Brand Kit', 'Configurazione server'] },
  { name: 'SISTEMA', oldPrice: '4.950 €', price: '4.450 €', saving: 'Risparmi 500 €', features: ['Sito su misura', 'Identità completa', 'Gestionale base'] }
];

export function PricingPackages() {
  return (
    <section id="prezzi" data-scroll-theme="paper" className="scene scene--pricing" aria-labelledby="prezzi-title">
      <div className="scene__container">
        <div className="pricing-scene__intro">
          <h2 id="prezzi-title"><ScrollUnderline>Prezzi chiari.</ScrollUnderline><br />Prima di iniziare.</h2>
        </div>
        <div className="pricing-rows">
          {packages.map((pkg) => (
            <article key={pkg.name} className="pricing-row">
              <p className="pricing-row__name">{pkg.name}</p>
              <div><s className="text-sm text-[color:var(--experience-muted)]">{pkg.oldPrice}</s><p className="pricing-row__price">{pkg.price}</p></div>
              <p className="pricing-row__features">{pkg.features.join(' · ')}</p>
              <div className="pricing-row__action"><p className="pricing-row__saving">{pkg.saving}</p><a href="#contatti" className="text-link">Parliamone <ArrowUpRight size={16} aria-hidden="true" /></a></div>
            </article>
          ))}
        </div>
        <p className="pricing-scene__footnote">Nessuno dei tre? Meglio non comprare un pacchetto sbagliato.</p>
      </div>
    </section>
  );
}
