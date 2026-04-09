import { type Locale } from "@/lib/i18n-data";
import { type PageSeo } from "@/lib/seo";
import { homePageMeta } from "@/lib/site-meta";

export function getHomePageSeo(locale: Locale): PageSeo {
  const meta = homePageMeta[locale];

  return {
    title: meta.title,
    description: meta.description,
    path: "/",
  };
}
