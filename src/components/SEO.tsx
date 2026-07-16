import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  schemas?: any[];
}

export function SEO({ title, description, canonical, schemas }: SEOProps) {
  // If title already has " | Alessio Bellan", don't append it again
  const fullTitle = title.includes('Alessio Bellan') ? title : `${title} | Alessio Bellan`;
  const url = `https://alessiobellan.it${canonical}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://alessiobellan.it/og-image.jpg" />
      
      {/* Schema.org JSON-LD */}
      {schemas && schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
