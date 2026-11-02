import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { ALL_ROUTES } from '../seo/routeMeta';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType,
  canonicalUrl,
  noindex,
}) => {
  const location = useLocation();
  const currentPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
  const routeSeo = ALL_ROUTES[currentPath];

  const siteName = 'Crown Money';
  const defaultTitle = routeSeo?.title || 'Pay Off Mortgage Faster | Mortgage Reduction | Crown Money';
  const defaultDescription =
    routeSeo?.description ||
    "Australian homeowners use Crown Money's money management system to pay off their home loan years sooner. Free mortgage savings check in 2 minutes.";
  const defaultKeywords =
    'mortgage reduction Australia, pay off mortgage faster, financial coaching Australia, debt reduction strategy, home loan interest savings, Crown Money Management, Scott Parry, Home Ownership Programme';

  const finalTitle = title ? (title.includes(siteName) ? title : `${title} | ${siteName}`) : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalNoindex = noindex !== undefined ? noindex : Boolean(routeSeo?.noindex);

  const finalOgTitle = ogTitle || finalTitle;
  const finalOgDescription = ogDescription || finalDescription;
  const finalOgImage =
    ogImage || routeSeo?.ogImage || 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png';
  const finalOgType = ogType || routeSeo?.ogType || 'website';

  const baseDomain = 'https://crownmoney.com.au';
  const finalCanonicalUrl = canonicalUrl || routeSeo?.canonical || (!finalNoindex ? `${baseDomain}${currentPath}` : undefined);
  const finalOgUrl = ogUrl || finalCanonicalUrl;

  // Keep the single #crown-schema-jsonld script tag in sync on client-side SPA navigation
  useEffect(() => {
    if (!routeSeo?.schema) return;
    let scriptEl = document.getElementById('crown-schema-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'crown-schema-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(routeSeo.schema);
  }, [currentPath, routeSeo]);

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      {finalNoindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={finalOgType} />
      {finalOgUrl && <meta property="og:url" content={finalOgUrl} />}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      {finalOgImage && <meta property="og:image" content={finalOgImage} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {finalOgUrl && <meta name="twitter:url" content={finalOgUrl} />}
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      {finalOgImage && <meta name="twitter:image" content={finalOgImage} />}

      {/* Canonical (omitted on 404/unindexed pages without canonical) */}
      {finalCanonicalUrl && <link rel="canonical" href={finalCanonicalUrl} />}
    </Helmet>
  );
};
