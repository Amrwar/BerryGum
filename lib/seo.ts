import { Metadata } from "next";
import { siteConfig } from "./config";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  ogImage = "/og-image.jpg",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : `${siteConfig.name} - ${siteConfig.tagline}`;
  
  const metaDescription = description || siteConfig.description;
  
  const defaultKeywords = [
    "web design Egypt",
    "website development Cairo",
    "ØªØµÙ…ÙŠÙ… Ù…ÙˆØ§Ù‚Ø¹ Ù…ØµØ±",
    "web studio Egypt",
    "restaurant website",
    "clinic website",
    "medical website Egypt",
    "ecommerce Egypt",
  ];

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: "en_EG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Giza",
      addressCountry: "EG",
      streetAddress: siteConfig.address,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "sales",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: Object.values(siteConfig.social),
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Giza",
      addressCountry: "EG",
    },
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
  },
};
