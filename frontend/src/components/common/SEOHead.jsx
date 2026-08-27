import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME, TAGLINE_HI } from '../../config';

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  schemaData
}) => {
  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — ${TAGLINE_HI} | Premium Organic Products`;

  const metaDescription =
    description ||
    'Pure, authentic and stone-ground natural organic products for a healthy you and a healthy planet. Free shipping on orders above ₹500 across India.';

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl || window.location.href} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage || '/assets/natural-mantra-logo.svg'} />
      <meta property="og:url" content={canonicalUrl || window.location.href} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage || '/assets/natural-mantra-logo.svg'} />

      {/* JSON-LD Schema Markup */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
