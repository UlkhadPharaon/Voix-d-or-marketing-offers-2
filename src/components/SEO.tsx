import { Helmet } from 'react-helmet-async';

// TODO(owner): confirmer le domaine canonique du site.
const SITE_URL = (import.meta.env.VITE_SITE_URL as string) || 'https://nefertem.africa';
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo/nefertem-full.png`;

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  schemas?: object[];
}

export function SEO({ title, description, path = '/', image, schemas }: SEOProps) {
  const fullTitle = `${title} | NEFERTEM - AI Growth Systems`;
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;
  return (
    <Helmet>
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="fr_FR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas && schemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(schemas)}
        </script>
      )}
    </Helmet>
  );
}
