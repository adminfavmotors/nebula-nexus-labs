import type { Locale } from "@/lib/i18n-data";

export type ServiceKey =
  | "one-page"
  | "landing-page"
  | "company-website"
  | "corporate-website"
  | "redesign"
  | "technical-support";

type LocalizedServiceContent = {
  listName: string;
  priceFrom: string;
  teaser: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLead: string;
  intro: string;
  scopeTitle: string;
  scopeItems: string[];
  idealForTitle: string;
  idealForItems: string[];
  pricingTitle: string;
  pricingItems: string[];
};

type ServiceEntry = {
  key: ServiceKey;
  slug: string;
  aliases?: string[];
  content: Record<Locale, LocalizedServiceContent>;
};

type PageUiCopy = {
  eyebrow: string;
  primaryCta: string;
  secondaryCta: string;
  homeCta: string;
  scopeBadge: string;
  fitBadge: string;
  pricingBadge: string;
  relatedTitle: string;
  relatedBody: string;
};

const pageUi: Record<Locale, PageUiCopy> = {
  pl: {
    eyebrow: "Usługa NODE48",
    primaryCta: "Przejdź do formularza",
    secondaryCta: "Wróć do usług",
    homeCta: "Zobacz stronę główną",
    scopeBadge: "Zakres usługi",
    fitBadge: "Dla kogo",
    pricingBadge: "Co wpływa na cenę",
    relatedTitle: "Powiązane usługi",
    relatedBody: "Każda z tych stron może być kolejnym krokiem po briefie, redesignie albo rozbudowie obecnej witryny.",
  },
  en: {
    eyebrow: "NODE48 service",
    primaryCta: "Open contact form",
    secondaryCta: "Back to services",
    homeCta: "See homepage",
    scopeBadge: "What is included",
    fitBadge: "Best for",
    pricingBadge: "What affects pricing",
    relatedTitle: "Related services",
    relatedBody: "These pages often become the next step after a brief, redesign or expansion of an existing website.",
  },
};

export const serviceEntries: ServiceEntry[] = [
  {
    key: "one-page",
    slug: "strona-wizytowka",
    aliases: ["strona-wizytowka-one-page"],
    content: {
      pl: {
        listName: "Strona wizytówka",
        priceFrom: "od 1 490 zł",
        teaser: "Prosta strona dla małej firmy lub specjalisty",
        metaTitle: "Strona wizytówka | NODE48",
        metaDescription: "Projekt i wdrożenie strony wizytówki dla małych firm, ekspertów i lokalnych usług. Ceny od 1490 zł.",
        heroTitle: "Strona wizytówka dla małych firm i specjalistów",
        heroLead: "Lekka, szybka i czytelna strona, która przedstawia ofertę, buduje zaufanie i ułatwia pierwszy kontakt.",
        intro: "To rozwiązanie dla firm, które chcą być obecne w Google, wyglądać profesjonalnie i zebrać najważniejsze informacje o ofercie na jednej dobrze zaprojektowanej stronie.",
        scopeTitle: "Co zawiera strona wizytówka",
        scopeItems: [
          "projekt jednego spójnego ekranu sprzedażowego z kluczowymi sekcjami",
          "sekcję oferta, o firmie, FAQ i wezwanie do kontaktu",
          "responsywne wdrożenie działające na telefonach i laptopach",
          "podstawowe ustawienia SEO on-page i przygotowanie do indeksacji",
        ],
        idealForTitle: "Dla kogo ta usługa ma sens",
        idealForItems: [
          "dla lokalnych usług, freelancerów i mikrofirm",
          "dla marek, które startują i potrzebują pierwszej obecności online",
          "dla firm, które chcą prostego kontaktu bez rozbudowanej architektury",
        ],
        pricingTitle: "Od czego zależy cena",
        pricingItems: [
          "liczba sekcji i złożoność treści",
          "czy przygotowujemy też copy, strukturę i CTA",
          "czy strona ma zawierać dodatkowe integracje lub animacje",
        ],
      },
      en: {
        listName: "Business card website",
        priceFrom: "from 1,490 PLN",
        teaser: "Simple website for a small company or solo expert",
        metaTitle: "Business card website | NODE48",
        metaDescription: "Design and delivery of a business card website for small companies, specialists and local services. Prices from 1,490 PLN.",
        heroTitle: "Business card website for small companies and specialists",
        heroLead: "A light, fast and clear website that presents your offer, builds trust and makes the first contact easier.",
        intro: "This format works well for companies that want to show up in search, look professional and collect the most important information about their offer on one polished page.",
        scopeTitle: "What the business card website includes",
        scopeItems: [
          "a focused one-page structure with the key business sections",
          "offer, about, FAQ and contact call-to-action blocks",
          "responsive frontend implementation for phones and laptops",
          "basic on-page SEO setup and indexing readiness",
        ],
        idealForTitle: "Who this service is for",
        idealForItems: [
          "local services, freelancers and micro businesses",
          "brands that need their first professional online presence",
          "teams that want simple contact without a deep site structure",
        ],
        pricingTitle: "What affects the price",
        pricingItems: [
          "number of sections and content complexity",
          "whether we prepare messaging, structure and CTA",
          "whether extra integrations or motion details are needed",
        ],
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
        metaTitle: "Landing page sprzedażowy | NODE48",
        metaDescription: "Landing page pod kampanie reklamowe, lead generation i oferty sprzedażowe. Projekt, copy flow i wdrożenie od 1790 zł.",
        heroTitle: "Landing page, który prowadzi użytkownika do konkretnej akcji",
        heroLead: "Projektujemy strony pod kampanie, leady i sprzedaż, z jasną strukturą komunikacji i mocnym CTA.",
        intro: "Landing page nie powinien być tylko ładny. Ma porządkować ofertę, redukować opór i prowadzić użytkownika do zapisu, zakupu albo wysłania zapytania.",
        scopeTitle: "Zakres usługi landing page",
        scopeItems: [
          "struktura strony oparta o ofertę, obiekcje i konwersję",
          "sekcje hero, korzyści, dowód zaufania, FAQ i CTA",
          "wdrożenie gotowe pod kampanie Google Ads i Meta Ads",
          "podstawowe SEO techniczne oraz konfiguracja meta danych",
        ],
        idealForTitle: "Kiedy landing page sprawdza się najlepiej",
        idealForItems: [
          "przy jednej ofercie lub jednym pakiecie usług",
          "przy kampaniach reklamowych i lead generation",
          "gdy chcesz szybko przetestować nową propozycję wartości",
        ],
        pricingTitle: "Co wpływa na cenę landing page",
        pricingItems: [
          "czy przygotowujemy strategię komunikacji i copy",
          "liczba sekcji, elementów zaufania i wariantów CTA",
          "czy strona wymaga integracji z CRM, formularzami lub analityką",
        ],
      },
      en: {
        listName: "Landing page",
        priceFrom: "from 1,790 PLN",
        teaser: "Page built for campaigns, leads and sales",
        metaTitle: "Conversion-focused landing page | NODE48",
        metaDescription: "Landing page for paid campaigns, lead generation and sales offers. Strategy, copy flow and implementation from 1,790 PLN.",
        heroTitle: "Landing page designed to lead visitors toward one clear action",
        heroLead: "We design campaign pages for lead generation and sales with a clear message hierarchy and strong CTA.",
        intro: "A landing page should not only look good. It should structure the offer, reduce friction and guide the visitor toward signup, purchase or inquiry.",
        scopeTitle: "What the landing page service includes",
        scopeItems: [
          "page structure built around offer clarity, objections and conversion",
          "hero, benefits, trust proof, FAQ and CTA sections",
          "implementation ready for Google Ads and Meta Ads traffic",
          "basic technical SEO and structured meta setup",
        ],
        idealForTitle: "When a landing page is the best choice",
        idealForItems: [
          "for a single offer or focused service package",
          "for paid campaigns and lead generation funnels",
          "when you want to test a new value proposition quickly",
        ],
        pricingTitle: "What affects landing page pricing",
        pricingItems: [
          "whether we build the messaging strategy and copy flow",
          "number of sections, trust elements and CTA variants",
          "whether the page needs CRM, form or analytics integrations",
        ],
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
        metaTitle: "Strona firmowa | NODE48",
        metaDescription: "Projektujemy strony firmowe z podstronami usług, o firmie, FAQ i kontaktem. Lepsza struktura, SEO i wygodna rozbudowa. Od 2990 zł.",
        heroTitle: "Strona firmowa dla firm, które chcą rosnąć długofalowo",
        heroLead: "To dobry wybór, kiedy oferta jest szersza, a użytkownik potrzebuje kilku punktów wejścia zamiast jednej strony.",
        intro: "Strona firmowa pomaga uporządkować komunikację, zwiększyć liczbę fraz, na które możesz się pozycjonować, i lepiej prowadzić użytkownika przez różne usługi.",
        scopeTitle: "Co obejmuje rozbudowana strona firmowa",
        scopeItems: [
          "architekturę informacji z podziałem na usługi, ofertę i sekcje wspierające",
          "projekt kilku podstron w jednym spójnym systemie wizualnym",
          "responsywne wdrożenie z myślą o dalszej rozbudowie",
          "ustawienia SEO dla podstron, nagłówków i opisów meta",
        ],
        idealForTitle: "Dla kogo jest taka strona",
        idealForItems: [
          "dla firm z kilkoma usługami lub segmentami oferty",
          "dla marek, które chcą rozwijać ruch organiczny",
          "dla zespołów potrzebujących bardziej wiarygodnej prezentacji firmy",
        ],
        pricingTitle: "Co wpływa na cenę strony firmowej",
        pricingItems: [
          "liczba podstron i poziom złożoności struktury",
          "czy przygotowujemy content architecture i copy",
          "czy wdrożenie obejmuje blog, case studies lub dodatkowe moduły",
        ],
      },
      en: {
        listName: "Company website",
        priceFrom: "from 2,990 PLN",
        teaser: "Extended website for a company with a broader offer",
        metaTitle: "Company website | NODE48",
        metaDescription: "We design company websites with service pages, about, FAQ and contact sections. Better structure, SEO and long-term scalability. From 2,990 PLN.",
        heroTitle: "Company website for businesses that want to grow long term",
        heroLead: "This is the right option when your offer is broader and users need several entry points instead of a single page.",
        intro: "A structured company website helps organise communication, target more search topics and guide visitors through multiple services more effectively.",
        scopeTitle: "What an extended company website includes",
        scopeItems: [
          "information architecture across services, offer pages and support sections",
          "multi-page design inside one coherent visual system",
          "responsive implementation prepared for future growth",
          "SEO setup for page hierarchy, headings and meta descriptions",
        ],
        idealForTitle: "Who this type of website is for",
        idealForItems: [
          "companies with several services or offer categories",
          "brands that want to grow organic visibility",
          "teams that need a more credible and complete company presentation",
        ],
        pricingTitle: "What affects company website pricing",
        pricingItems: [
          "number of subpages and structural complexity",
          "whether we shape the content architecture and copy",
          "whether implementation includes a blog, case studies or extra modules",
        ],
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
        metaTitle: "Strona premium dla wymagających firm | NODE48",
        metaDescription: "Projekt i wdrożenie strony premium dla wymagających firm z rozbudowaną architekturą, wieloma sekcjami i wysokim standardem prezentacji marki. Wycena indywidualna.",
        heroTitle: "Strona premium dla wymagających firm i marek o wysokich standardach",
        heroLead: "Budujemy serwisy dla większych organizacji, gdzie liczy się czytelna struktura, wizerunek, SEO i spójność wielu obszarów komunikacji.",
        intro: "Taki projekt wymaga bardziej dopracowanej architektury, hierarchii treści i wizualnej dyscypliny. To nie jest tylko większa strona firmowa, ale cały system prezentacji marki.",
        scopeTitle: "Co zawiera strona premium dla wymagających firm",
        scopeItems: [
          "warsztat lub discovery dla struktury serwisu i priorytetów komunikacyjnych",
          "projekt wielu typów podstron i komponentów w jednym systemie",
          "wdrożenie serwisu o większej skali z zachowaniem wydajności",
          "pełne przygotowanie meta danych, struktury nagłówków i linkowania wewnętrznego",
        ],
        idealForTitle: "Dla kogo jest ten poziom usługi",
        idealForItems: [
          "dla większych firm, grup kapitałowych i marek premium",
          "dla organizacji z wieloma ofertami, działami lub rynkami",
          "dla zespołów, które potrzebują serwisu wspierającego marketing i sprzedaż",
        ],
        pricingTitle: "Co wpływa na cenę premium",
        pricingItems: [
          "liczba typów podstron, komponentów i wariantów treści",
          "stopień skomplikowania architektury i scenariuszy użytkownika",
          "potrzeba integracji, governance treści i pracy z dużą ilością materiałów",
        ],
      },
      en: {
        listName: "Premium website for demanding companies",
        priceFrom: "custom quote",
        teaser: "Advanced website for a larger brand or organisation",
        metaTitle: "Premium website for demanding companies | NODE48",
        metaDescription: "Design and delivery of a premium website for demanding companies with expanded architecture, multiple sections and a high standard of brand presentation. Custom quote.",
        heroTitle: "Premium website for demanding companies and high-standard brands",
        heroLead: "We build websites for larger organisations where structure, brand image, SEO and consistency across many communication areas matter.",
        intro: "This kind of project needs more disciplined architecture, stronger content hierarchy and a more robust design system. It is not just a bigger company website, but a full brand presentation system.",
        scopeTitle: "What a premium website for demanding companies includes",
        scopeItems: [
          "discovery work for site structure and communication priorities",
          "design of multiple page types and reusable components",
          "implementation of a larger-scale website without performance compromises",
          "complete setup of meta data, heading structure and internal linking",
        ],
        idealForTitle: "Who this service level is for",
        idealForItems: [
          "larger companies, holdings and premium brands",
          "organisations with many offers, departments or markets",
          "teams that need a website supporting both marketing and sales",
        ],
        pricingTitle: "What affects premium project pricing",
        pricingItems: [
          "number of page types, components and content variations",
          "complexity of architecture and user journeys",
          "need for integrations, content governance and work with large content sets",
        ],
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
        metaTitle: "Redesign strony internetowej | NODE48",
        metaDescription: "Redesign strony internetowej: nowa estetyka, lepsza struktura i mocniejszy UX bez niepotrzebnego chaosu. Ceny od 1690 zł.",
        heroTitle: "Redesign strony internetowej, który porządkuje wizerunek i użyteczność",
        heroLead: "Odświeżamy istniejące strony tak, aby wyglądały nowocześnie, działały czytelniej i lepiej wspierały sprzedaż lub zapytania.",
        intro: "Redesign jest dobrym wyborem, gdy fundament już istnieje, ale warstwa wizualna, struktura lub doświadczenie użytkownika przestały odpowiadać marce i celom biznesowym.",
        scopeTitle: "Co może obejmować redesign strony",
        scopeItems: [
          "audyt obecnej strony i wskazanie miejsc, które blokują skuteczność",
          "nową hierarchię treści, układ sekcji i kierunek wizualny",
          "odświeżenie kluczowych ekranów lub całego serwisu",
          "wdrożenie zmian z zachowaniem istniejących wartościowych elementów SEO",
        ],
        idealForTitle: "Kiedy redesign ma największy sens",
        idealForItems: [
          "gdy marka wygląda już nieaktualnie lub niespójnie",
          "gdy strona jest trudna w odbiorze na mobile lub laptopie",
          "gdy chcesz poprawić konwersję bez budowy projektu od zera",
        ],
        pricingTitle: "Od czego zależy cena redesignu",
        pricingItems: [
          "zakres zmian: kilka sekcji, jedna podstrona czy cały serwis",
          "czy zostawiamy obecny stack i strukturę, czy wchodzimy głębiej",
          "czy projekt obejmuje też nowy copy flow, SEO i komponenty",
        ],
      },
      en: {
        listName: "Website redesign",
        priceFrom: "from 1,690 PLN",
        teaser: "Visual and UX refresh without rebuilding everything",
        metaTitle: "Website redesign | NODE48",
        metaDescription: "Website redesign focused on better aesthetics, stronger structure and cleaner UX without unnecessary chaos. Prices from 1,690 PLN.",
        heroTitle: "Website redesign that improves both visual quality and usability",
        heroLead: "We refresh existing websites so they look modern, feel clearer and support lead generation or sales more effectively.",
        intro: "Redesign is the right option when the foundation already exists, but the visual layer, structure or user experience no longer match the brand and business goals.",
        scopeTitle: "What a redesign can include",
        scopeItems: [
          "audit of the current website and friction points",
          "new content hierarchy, section layout and visual direction",
          "refresh of the key screens or the whole website",
          "implementation that preserves valuable SEO elements where possible",
        ],
        idealForTitle: "When redesign is the best choice",
        idealForItems: [
          "when the brand presentation looks outdated or inconsistent",
          "when the site is difficult to use on mobile or laptop",
          "when you want better conversion without rebuilding from scratch",
        ],
        pricingTitle: "What affects redesign pricing",
        pricingItems: [
          "scope of change: a few sections, one page or the whole site",
          "whether we keep the current stack and structure or go deeper",
          "whether the project also includes new copy flow, SEO and components",
        ],
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
        metaTitle: "Opieka techniczna nad stroną | NODE48",
        metaDescription: "Opieka techniczna nad stroną internetową: aktualizacje, poprawki, drobny rozwój i wsparcie po wdrożeniu. Pakiety od 149 zł.",
        heroTitle: "Opieka techniczna nad stroną po wdrożeniu",
        heroLead: "Zajmujemy się aktualizacjami, poprawkami i bieżącym rozwojem strony, żeby nie została porzucona po publikacji.",
        intro: "Wiele stron dobrze wygląda w dniu startu, ale traci jakość bez regularnych poprawek i opieki. Ta usługa pozwala utrzymać porządek techniczny i szybko reagować na nowe potrzeby.",
        scopeTitle: "Co wchodzi w zakres opieki technicznej",
        scopeItems: [
          "aktualizacje treści, sekcji i prostych elementów interfejsu",
          "drobne poprawki techniczne, wydajnościowe i responsywne",
          "monitorowanie zgłoszeń i priorytetyzacja prac rozwojowych",
          "wsparcie przy dodawaniu nowych bloków lub iteracji po starcie",
        ],
        idealForTitle: "Komu przyda się taka opieka",
        idealForItems: [
          "firmom, które nie mają własnego zespołu technicznego",
          "markom prowadzącym aktywne kampanie i częste aktualizacje",
          "stronom, które mają rosnąć razem z biznesem po wdrożeniu",
        ],
        pricingTitle: "Co wpływa na koszt opieki",
        pricingItems: [
          "liczba godzin lub skala zmian potrzebnych w miesiącu",
          "czy prace obejmują tylko poprawki, czy też rozwój nowych sekcji",
          "czas reakcji i priorytet obsługi zgłoszeń",
        ],
      },
      en: {
        listName: "Technical support",
        priceFrom: "from 149 PLN / month",
        teaser: "Ongoing support, fixes and post-launch improvements",
        metaTitle: "Website technical support | NODE48",
        metaDescription: "Website technical support covering updates, fixes, small improvements and post-launch care. Plans from 149 PLN.",
        heroTitle: "Technical support for your website after launch",
        heroLead: "We handle updates, fixes and ongoing improvements so the website does not get abandoned after publishing.",
        intro: "Many websites look good on launch day, but lose quality without regular maintenance. This service helps keep the technical side clean and responsive to new needs.",
        scopeTitle: "What technical support includes",
        scopeItems: [
          "content updates, section edits and small UI changes",
          "technical, performance and responsive fixes",
          "handling requests and prioritising small development tasks",
          "support with adding new blocks or post-launch iterations",
        ],
        idealForTitle: "Who benefits from this service",
        idealForItems: [
          "companies without an in-house technical team",
          "brands running active campaigns and frequent updates",
          "websites that need to evolve after launch together with the business",
        ],
        pricingTitle: "What affects support cost",
        pricingItems: [
          "number of hours or scope of monthly changes",
          "whether the work includes only fixes or also new sections",
          "response time expectations and support priority",
        ],
      },
    },
  },
];

export function getServiceCatalog(locale: Locale) {
  return serviceEntries.map((entry, index) => ({
    key: entry.key,
    slug: entry.slug,
    num: `${String(index + 1).padStart(2, "0")}.`,
    ...entry.content[locale],
  }));
}

export function getServicePageUi(locale: Locale) {
  return pageUi[locale];
}

function findServiceEntryBySlug(slug: string) {
  return serviceEntries.find((item) => item.slug === slug || item.aliases?.includes(slug));
}

export function getServiceBySlug(locale: Locale, slug: string) {
  const entry = findServiceEntryBySlug(slug);

  if (!entry) {
    return null;
  }

  return {
    key: entry.key,
    slug: entry.slug,
    ...entry.content[locale],
  };
}

export function getCanonicalServiceSlug(slug: string) {
  return findServiceEntryBySlug(slug)?.slug ?? null;
}
