import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

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
  ogImage = 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png',
  ogUrl,
  ogType = 'website',
  canonicalUrl,
  noindex = false,
}) => {
  const location = useLocation();
  
  const siteName = 'Crown Money';
  const defaultTitle = 'Pay Off Mortgage Faster | Mortgage Reduction | Crown Money';
  const defaultDescription = "Australian homeowners use Crown Money's money management system to pay off their home loan years sooner. Free mortgage savings check in 2 minutes.";
  const defaultKeywords = 'mortgage reduction Australia, pay off mortgage faster, financial coaching Australia, debt reduction strategy, home loan interest savings, Crown Money Management, Scott Parry, Home Ownership Programme';

  const finalTitle = title ? (title.includes(siteName) ? title : `${title} | ${siteName}`) : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  
  const finalOgTitle = ogTitle || finalTitle;
  const finalOgDescription = ogDescription || finalDescription;
  
  const currentPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
  const baseDomain = 'https://crownmoney.com.au';
  const finalOgUrl = ogUrl || `${baseDomain}${currentPath}`;
  const finalCanonicalUrl = canonicalUrl || `${baseDomain}${currentPath}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalOgUrl} />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Canonical */}
      <link rel="canonical" href={finalCanonicalUrl} />
    </Helmet>
  );
};
