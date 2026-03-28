import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n-data";

type ServiceStructuredDataInput = {
  locale: Locale;
  slug: string;
  serviceName: string;
  title: string;
  description: string;
};

export function getServicePageStructuredData({
  locale,
  slug,
  serviceName,
  title,
  description,
}: ServiceStructuredDataInput) {
  const pageUrl = new URL(`/uslugi/${slug}`, siteConfig.siteUrl).toString();
  const homeUrl = new URL("/", siteConfig.siteUrl).toString();

  return [
    {
      id: `breadcrumb-${slug}`,
      schema: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteConfig.brandName,
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: serviceName,
            item: pageUrl,
          },
        ],
      },
    },
    {
      id: `service-${slug}`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceName,
        serviceType: serviceName,
        description,
        url: pageUrl,
        areaServed: {
          "@type": "Country",
          name: "Poland",
        },
        availableLanguage: locale === "pl" ? ["pl", "en"] : ["en", "pl"],
        provider: {
          "@type": "Organization",
          name: siteConfig.brandName,
          url: siteConfig.siteUrl,
          email: siteConfig.contactEmail,
          telephone: siteConfig.businessPhone,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
          name: title,
        },
      },
    },
  ];
}
