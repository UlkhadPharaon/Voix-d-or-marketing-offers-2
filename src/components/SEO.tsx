import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  schemas?: object[];
}

export function SEO({ title, description, schemas }: SEOProps) {
  return (
    <Helmet>
      <title>{title} | NEFERTEM - AI Growth Systems</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | NEFERTEM - AI Growth Systems`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | NEFERTEM - AI Growth Systems`} />
      <meta name="twitter:description" content={description} />

      {schemas && schemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(schemas)}
        </script>
      )}
    </Helmet>
  );
}
