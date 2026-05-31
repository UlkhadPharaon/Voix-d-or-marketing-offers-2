import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  schemas?: object[];
}

export function SEO({ title, description, schemas }: SEOProps) {
  return (
    <Helmet>
      <title>{title} | Studio Voix d'Or</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | Studio Voix d'Or`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Studio Voix d'Or`} />
      <meta name="twitter:description" content={description} />

      {schemas && schemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(schemas)}
        </script>
      )}
    </Helmet>
  );
}
