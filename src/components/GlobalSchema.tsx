import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function GlobalSchema() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'it';
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alessio Bellan",
    "image": "https://alessiobellan.it/media/brand/foto-profilo.JPG",
    "jobTitle": "Freelance web developer e digital designer",
    "description": "Alessio Bellan progetta siti web, automazioni, gestionali e strumenti digitali per piccole aziende, professionisti e associazioni.",
    "url": "https://alessiobellan.it",
    "telephone": "+393755532010",
    "email": "email@alessiobellan.it",
    "areaServed": [
      {
        "@type": "City",
        "name": "Monza"
      },
      {
        "@type": "City",
        "name": "Milano"
      },
      {
        "@type": "City",
        "name": "Lecco"
      },
      {
        "@type": "City",
        "name": "Bergamo"
      }
    ],
    "knowsAbout": ["Siti web", "Automazioni", "Gestionali web", "Formazione digitale", "Infrastrutture Docker"],
    "sameAs": [
      "https://wa.me/393755532010"
    ]
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
