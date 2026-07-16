import { Helmet } from 'react-helmet-async';

export function GlobalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Alessio Bellan",
    "image": "https://alessiobellan.it/og-image.jpg",
    "description": "Freelance specializzato in siti web, gestionali su misura, grafica & identità visiva, social media management, e infrastrutture Docker.",
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
    "priceRange": "€€",
    "sameAs": [
      "https://wa.me/393755532010"
    ]
  };

  return (
    <Helmet>
      <html lang="it" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
