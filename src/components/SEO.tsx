import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig } from '../config/seo';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEO = ({
  title = seoConfig.title,
  description = seoConfig.description,
  image = seoConfig.ogImage,
  url = seoConfig.ogUrl,
}: SEOProps) => {
  return (
    <Helmet>
      {/* Título e descrição básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={seoConfig.keywords} />
      <meta name="author" content={seoConfig.author} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content={seoConfig.twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}; 