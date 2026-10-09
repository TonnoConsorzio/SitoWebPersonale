import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  schemas?: any[];
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}

export function SEO({ title, description, canonical, schemas, type = 'website', image = 'https://alessiobellan.it/media/brand/foto-profilo.JPG', imageAlt = 'Alessio Bellan', noIndex = false }: SEOProps) {
  // If title already has " | Alessio Bellan", don't append it again
  const fullTitle = title.includes('Alessio Bellan') ? title : `${title} | Alessio Bellan`;
  const url = `https://alessiobellan.it${canonical}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex,follow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Schema.org JSON-LD */}
      {schemas && schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
