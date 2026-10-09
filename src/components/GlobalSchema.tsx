import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { business } from '../config/business';

export function GlobalSchema() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'it';
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": business.personId,
        "name": business.name,
        "image": business.image,
        "jobTitle": business.jobTitle,
        "description": "Siti web, gestionali, identità visive, social media e infrastrutture per PMI, professionisti e associazioni.",
        "url": business.siteUrl,
        "telephone": business.telephone,
        "email": business.email,
        "areaServed": business.serviceAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
        "knowsAbout": ["Siti web", "Gestionali e web app", "Grafica e identità visiva", "Social media", "Infrastrutture Docker"],
        "sameAs": business.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${business.siteUrl}/#website`,
        "url": business.siteUrl,
        "name": business.name,
        "inLanguage": lang,
        "publisher": { "@id": business.personId },
      },
    ],
  };

  return (
    <Helmet>
      <html lang={lang} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
