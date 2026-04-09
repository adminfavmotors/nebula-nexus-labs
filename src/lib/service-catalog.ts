import type { Locale } from "@/lib/i18n-data";

export type ServiceKey =
  | "one-page"
  | "landing-page"
  | "company-website"
  | "corporate-website"
  | "redesign"
  | "technical-support";

type LocalizedServiceCatalogContent = {
  listName: string;
  priceFrom: string;
  teaser: string;
};

export type ServiceCatalogEntry = {
  key: ServiceKey;
  slug: string;
  aliases?: string[];
  content: Record<Locale, LocalizedServiceCatalogContent>;
};

export const serviceCatalogEntries: ServiceCatalogEntry[] = [
  {
    key: "one-page",
    slug: "strona-wizytowka",
    aliases: ["strona-wizytowka-one-page"],
    content: {
      pl: {
        listName: "Strona wizytówka",
        priceFrom: "od 1 490 zł",
        teaser: "Prosta strona dla małej firmy lub specjalisty",
      },
      en: {
        listName: "Business card website",
        priceFrom: "from 1,490 PLN",
        teaser: "Simple website for a small company or solo expert",
      },
    },
  },
  {
    key: "landing-page",
    slug: "landing-page",
    content: {
      pl: {
        listName: "Landing page",
        priceFrom: "od 1 790 zł",
        teaser: "Strona pod kampanie, leady i sprzedaż",
      },
      en: {
        listName: "Landing page",
        priceFrom: "from 1,790 PLN",
        teaser: "Page built for campaigns, leads and sales",
      },
    },
  },
  {
    key: "company-website",
    slug: "strona-firmowa",
    aliases: ["strona-firmowa-z-podstronami"],
    content: {
      pl: {
        listName: "Strona firmowa",
        priceFrom: "od 2 990 zł",
        teaser: "Rozbudowana strona dla firmy z większą ofertą",
      },
      en: {
        listName: "Company website",
        priceFrom: "from 2,990 PLN",
        teaser: "Extended website for a company with a broader offer",
      },
    },
  },
  {
    key: "corporate-website",
    slug: "strona-premium-dla-wymagajacych-firm",
    aliases: ["strona-korporacyjna-premium"],
    content: {
      pl: {
        listName: "Strona premium dla wymagających firm",
        priceFrom: "wycena indywidualna",
        teaser: "Zaawansowany serwis dla większej marki lub organizacji",
      },
      en: {
        listName: "Premium website for demanding companies",
        priceFrom: "custom quote",
        teaser: "Advanced website for a larger brand or organisation",
      },
    },
  },
  {
    key: "redesign",
    slug: "redesign-strony",
    content: {
      pl: {
        listName: "Redesign strony",
        priceFrom: "od 1 690 zł",
        teaser: "Odświeżenie wizualne i UX bez budowy wszystkiego od zera",
      },
      en: {
        listName: "Website redesign",
        priceFrom: "from 1,690 PLN",
        teaser: "Visual and UX refresh without rebuilding everything",
      },
    },
  },
  {
    key: "technical-support",
    slug: "opieka-techniczna",
    content: {
      pl: {
        listName: "Opieka techniczna",
        priceFrom: "od 149 zł / miesiąc",
        teaser: "Stałe wsparcie, poprawki i rozwój po publikacji",
      },
      en: {
        listName: "Technical support",
        priceFrom: "from 149 PLN / month",
        teaser: "Ongoing support, fixes and post-launch improvements",
      },
    },
  },
];

export function getServiceCatalog(locale: Locale) {
  return serviceCatalogEntries.map((entry, index) => ({
    key: entry.key,
    slug: entry.slug,
    num: `${String(index + 1).padStart(2, "0")}.`,
    ...entry.content[locale],
  }));
}

export function getCanonicalServiceSlug(slug: string) {
  return serviceCatalogEntries.find((entry) => entry.slug === slug || entry.aliases?.includes(slug))?.slug ?? null;
}

export function getCanonicalServiceSlugs() {
  return serviceCatalogEntries.map((entry) => entry.slug);
}
