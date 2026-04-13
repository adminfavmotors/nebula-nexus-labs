import { type Locale } from "@/lib/i18n-data";
import { type PageSeo } from "@/lib/seo";
import { businessPhone, contactEmail } from "@/lib/contact-config";
import { brandName, ogImageUrl, siteUrl } from "@/lib/site-identity";
import { homePageMeta } from "@/lib/site-meta";

export function getHomePageSeo(locale: Locale): PageSeo {
  const meta = homePageMeta[locale];

  return {
    title: meta.title,
    description: meta.description,
    path: "/",
    ogImage: ogImageUrl,
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
