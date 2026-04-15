import { businessPhone, contactEmail } from "@/lib/contact-config";
import type { Locale } from "@/lib/i18n-data";
import { localizePath } from "@/lib/locale-routes";
import { brandName, siteUrl } from "@/lib/site-identity";

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
  const pageUrl = new URL(localizePath(`/uslugi/${slug}`, locale), siteUrl).toString();
  const homeUrl = new URL(localizePath("/", locale), siteUrl).toString();

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
            name: brandName,
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
          name: brandName,
          url: siteUrl,
          email: contactEmail,
          telephone: businessPhone,
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
