import { type Locale } from "@/lib/i18n-data";
import { legalContent } from "@/lib/legal-content";
import { getLocalizedAlternates, getLocalizedLegalPath, getLocalizedServicePath, localizePath } from "@/lib/locale-routes";
import { type PageSeo } from "@/lib/seo";
import { getServicePageStructuredData } from "@/lib/service-page-seo";
import { getServicePageDetail } from "@/lib/service-page-details";
import { getCanonicalServiceSlug, getCanonicalServiceSlugs, getServiceBySlug } from "@/lib/service-pages";
import { businessPhone, contactEmail } from "@/lib/contact-config";
import { brandName, ogImageUrl, siteUrl } from "@/lib/site-identity";
import { homePageMeta } from "@/lib/site-meta";

export type LegalDocumentKey = "privacy" | "cookies";

export type IndexedRouteEntry = {
  path: string;
  seo: PageSeo;
};

export function getHomePageSeo(locale: Locale): PageSeo {
  const meta = homePageMeta[locale];

  return {
    title: meta.title,
    description: meta.description,
    path: localizePath("/", locale),
    ogImage: ogImageUrl,
    locale,
    alternates: getLocalizedAlternates("/"),
    structuredData: [
      {
        id: "organization",
        schema: {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: brandName,
          url: siteUrl,
          logo: ogImageUrl,
          email: contactEmail,
          telephone: businessPhone,
          areaServed: { "@type": "Country", name: "Poland" },
        },
      },
      {
        id: "website",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: brandName,
          url: siteUrl,
        },
      },
    ],
  };
}

export function getServicePagePath(slug: string) {
  return `/uslugi/${slug}`;
}

export function getServicePageSeo(locale: Locale, slug: string): PageSeo | null {
  const canonicalSlug = getCanonicalServiceSlug(slug) ?? slug;
  const service = getServiceBySlug(locale, canonicalSlug);
  const detail = getServicePageDetail(locale, canonicalSlug);

  if (!service || !detail) {
    return null;
  }

  return {
    title: detail.metaTitle ?? service.metaTitle,
    description: detail.metaDescription ?? service.metaDescription,
    path: getLocalizedServicePath(locale, canonicalSlug),
    ogImage: ogImageUrl,
    locale,
    alternates: getLocalizedAlternates(getServicePagePath(canonicalSlug)),
    structuredData: getServicePageStructuredData({
      locale,
      slug: canonicalSlug,
      serviceName: service.listName,
      title: detail.metaTitle ?? service.metaTitle,
      description: detail.metaDescription ?? service.metaDescription,
    }),
  };
}

export function getLegalPagePath(documentKey: LegalDocumentKey) {
  return documentKey === "privacy" ? "/privacy-policy" : "/cookie-policy";
}

export function getLegalPageSeo(locale: Locale, documentKey: LegalDocumentKey): PageSeo {
  const documentContent = legalContent[locale][documentKey];

  return {
    title: documentContent.metaTitle,
    description: documentContent.metaDescription,
    path: getLocalizedLegalPath(locale, documentKey),
    robots: "noindex,follow",
    locale,
    alternates: getLocalizedAlternates(getLegalPagePath(documentKey)),
  };
}

export function getIndexedRouteManifest(locale: Locale = "pl"): IndexedRouteEntry[] {
  return [
    {
      path: localizePath("/", locale),
      seo: getHomePageSeo(locale),
    },
    ...getCanonicalServiceSlugs().map((slug) => ({
      path: getLocalizedServicePath(locale, slug),
      seo: getServicePageSeo(locale, slug)!,
    })),
  ];
}

export function getPrerenderRouteManifest(locale: Locale = "pl"): IndexedRouteEntry[] {
  return [
    ...getIndexedRouteManifest(locale),
    {
      path: getLocalizedLegalPath(locale, "privacy"),
      seo: getLegalPageSeo(locale, "privacy"),
    },
    {
      path: getLocalizedLegalPath(locale, "cookies"),
      seo: getLegalPageSeo(locale, "cookies"),
    },
  ];
}
