import { type Locale } from "@/lib/i18n-data";
import { legalContent } from "@/lib/legal-content";
import { type PageSeo } from "@/lib/seo";
import { getServicePageStructuredData } from "@/lib/service-page-seo";
import { getServicePageDetail } from "@/lib/service-page-details";
import { getCanonicalServiceSlug, getCanonicalServiceSlugs, getServiceBySlug } from "@/lib/service-pages";
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
    path: "/",
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
    path: getServicePagePath(canonicalSlug),
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
    path: getLegalPagePath(documentKey),
  };
}

export function getIndexedRouteManifest(locale: Locale = "pl"): IndexedRouteEntry[] {
  return [
    {
      path: "/",
      seo: getHomePageSeo(locale),
    },
    ...getCanonicalServiceSlugs().map((slug) => ({
      path: getServicePagePath(slug),
      seo: getServicePageSeo(locale, slug)!,
    })),
    {
      path: getLegalPagePath("privacy"),
      seo: getLegalPageSeo(locale, "privacy"),
    },
    {
      path: getLegalPagePath("cookies"),
      seo: getLegalPageSeo(locale, "cookies"),
    },
  ];
}
