import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "pl" | "en";

type TranslationSet = {
  meta: {
    title: string;
    description: string;
  };
  brand: string;
  nav: {
    links: Array<{ label: string; href: string }>;
    cta: string;
    languageLabel: string;
  };
  hero: {
    badge: string;
    words: [string, string, string];
    body: string;
    primaryCta: string;
    secondaryCta: string;
    imageLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    stats: Array<{ value: number; suffix: string; label: string }>;
  };
  services: {
    eyebrow: string;
    title: string;
    items: Array<{ num: string; name: string; price: string }>;
  };
  howWeWork: {
    eyebrow: string;
    title: string;
    link: string;
    steps: Array<{ num: string; title: string; desc: string }>;
  };
  projects: {
    eyebrow: string;
    title: string;
    viewAll: string;
    imageLabel: string;
    items: Array<{ name: string; tag: string }>;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; desc: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    email: string;
    phone: string;
    items: Array<{ question: string; answer: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    button: string;
    availabilityTitle: string;
    availabilityBody: string;
  };
  footer: {
    rights: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
};

export const translations: Record<Locale, TranslationSet> = {
  pl: {
    meta: {
      title: "Nebula Nexus Labs | Strony i produkty cyfrowe",
      description:
        "Projektujemy szybkie strony internetowe, landing page'e i doświadczenia cyfrowe dla firm, które chcą wyglądać nowocześnie i sprzedawać skuteczniej.",
    },
    brand: "Nebula Nexus Labs",
    nav: {
      links: [
        { label: "Start", href: "#home" },
        { label: "Usługi", href: "#services" },
        { label: "Projekty", href: "#projects" },
        { label: "O nas", href: "#about" },
      ],
      cta: "Umów konsultację",
      languageLabel: "Język",
    },
    hero: {
      badge: "Studio stron i produktów cyfrowych",
      words: ["Tworzymy", "strony", "które działają"],
      body:
        "Łączymy strategię, design i development, aby budować nowoczesne witryny dla marek, które chcą rosnąć szybciej i komunikować się wyraźniej.",
      primaryCta: "Porozmawiajmy",
      secondaryCta: "Zobacz realizacje",
      imageLabel: "Strategia, design i wdrożenie",
    },
    about: {
      eyebrow: "O nas",
      title: "Projektujemy doświadczenia cyfrowe, które wyglądają premium i pracują na wynik.",
      body:
        "Pomagamy firmom uporządkować komunikację, zbudować spójny wizerunek i wdrożyć stronę, która ładuje się szybko, wygląda nowocześnie i prowadzi użytkownika do działania.",
      stats: [
        { value: 147, suffix: "+", label: "zrealizowanych ekranów i sekcji" },
        { value: 98, suffix: "%", label: "projektów oddanych w terminie" },
        { value: 12, suffix: "", label: "lat doświadczenia zespołu łącznie" },
      ],
    },
    services: {
      eyebrow: "Nasze usługi",
      title: "Od pierwszego briefu do gotowego wdrożenia",
      items: [
        { num: "01.", name: "Landing page sprzedażowy", price: "od 2 500 PLN" },
        { num: "02.", name: "Strona firmowa premium", price: "od 4 000 PLN" },
        { num: "03.", name: "Redesign istniejącej witryny", price: "od 1 800 PLN" },
        { num: "04.", name: "UI dla produktu SaaS", price: "od 3 200 PLN" },
        { num: "05.", name: "Opieka i rozwój po wdrożeniu", price: "od 5 000 PLN" },
      ],
    },
    howWeWork: {
      eyebrow: "Jak pracujemy",
      title: "Przejrzysty proces, który daje tempo i kontrolę",
      link: "Zobacz etapy ↓",
      steps: [
        { num: "01.", title: "Brief i cel", desc: "Ustalamy priorytety biznesowe, odbiorców i zakres, zanim zaczniemy projektować." },
        { num: "02.", title: "Kierunek wizualny", desc: "Budujemy strukturę, copy i styl, który pasuje do marki oraz wspiera konwersję." },
        { num: "03.", title: "Projekt i development", desc: "Łączymy warstwę wizualną z szybkim, responsywnym wdrożeniem frontendu." },
        { num: "04.", title: "Publikacja i optymalizacja", desc: "Uruchamiamy stronę, testujemy ją i dopracowujemy na podstawie danych." },
      ],
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Wybrane realizacje",
      viewAll: "Zobacz wszystkie →",
      imageLabel: "Podgląd projektu",
      items: [
        { name: "Strona premium dla marki usługowej", tag: "Landing page" },
        { name: "Sklep z nową architekturą oferty", tag: "E-commerce" },
        { name: "Panel marketingowy dla produktu B2B", tag: "SaaS" },
      ],
    },
    whyUs: {
      eyebrow: "Dlaczego my",
      title: "Łączymy estetykę z odpowiedzialnym wykonaniem",
      items: [
        { title: "Jasny proces", desc: "Na każdym etapie wiesz, co robimy, po co to robimy i jaki będzie kolejny krok." },
        { title: "Szybkie wdrożenie", desc: "Projektujemy z myślą o realnym wdrożeniu, a nie tylko o ładnych makietach." },
        { title: "Partnerska współpraca", desc: "Doradzamy, upraszczamy decyzje i pilnujemy, by projekt dowoził wartość biznesową." },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Najczęstsze pytania",
      email: "yrasike60@gmail.com",
      phone: "+48 579 120 480",
      items: [
        {
          question: "Ile trwa przygotowanie strony internetowej?",
          answer: "Większość projektów landing page kończymy w 1-3 tygodnie. Bardziej rozbudowane strony firmowe lub produkty cyfrowe wymagają zwykle 3-6 tygodni pracy.",
        },
        {
          question: "Czy pomagacie także z treścią i strukturą strony?",
          answer: "Tak. Możemy pomóc w architekturze informacji, uproszczeniu komunikacji i przygotowaniu copy do kluczowych sekcji.",
        },
        {
          question: "Czy wdrożenie jest responsywne i szybkie?",
          answer: "Tak, projektujemy mobile first i dbamy o wydajność, czytelność oraz komfort korzystania na telefonie i desktopie.",
        },
        {
          question: "Czy mogę zlecić tylko redesign bez budowy od zera?",
          answer: "Oczywiście. Często pracujemy na istniejących materiałach i odświeżamy warstwę wizualną oraz UX bez pełnej przebudowy marki.",
        },
        {
          question: "Czy po publikacji możecie dalej rozwijać stronę?",
          answer: "Tak, możemy zapewnić dalsze iteracje, rozwój nowych sekcji, wsparcie techniczne i bieżące aktualizacje.",
        },
      ],
    },
    contact: {
      eyebrow: "Formularz",
      title: "Opowiedz nam o swoim projekcie",
      namePlaceholder: "Imię i nazwisko",
      emailPlaceholder: "Adres e-mail",
      messagePlaceholder: "Krótko opisz cele i zakres projektu",
      submit: "Wyślij wiadomość",
    },
    cta: {
      eyebrow: "Kontakt",
      title: "Potrzebujesz nowej strony albo odświeżenia obecnej?",
      body: "Przygotujemy kierunek, zakres i następne kroki bez zbędnego chaosu. Zacznijmy od krótkiej rozmowy.",
      button: "Umów rozmowę",
      availabilityTitle: "Odpowiadamy szybko",
      availabilityBody: "Napisz do nas mailowo lub zostaw zgłoszenie w formularzu, jeśli chcesz szybko omówić zakres, termin albo wstępny budżet.",
    },
    footer: {
      rights: "Wszelkie prawa zastrzeżone.",
    },
    notFound: {
      title: "Strona nie została znaleziona",
      body: "Wygląda na to, że ten adres nie istnieje lub został przeniesiony.",
      cta: "Wróć na stronę główną",
    },
  },
  en: {
    meta: {
      title: "Nebula Nexus Labs | Websites and digital products",
      description:
        "We design fast websites, landing pages and digital experiences for companies that want a modern presence and stronger conversion.",
    },
    brand: "Nebula Nexus Labs",
    nav: {
      links: [
        { label: "Home", href: "#home" },
        { label: "Services", href: "#services" },
        { label: "Projects", href: "#projects" },
        { label: "About", href: "#about" },
      ],
      cta: "Book a call",
      languageLabel: "Language",
    },
    hero: {
      badge: "Website and digital product studio",
      words: ["We build", "websites", "that perform"],
      body:
        "We combine strategy, design and development to create modern websites for brands that want to grow faster and communicate with clarity.",
      primaryCta: "Let's talk",
      secondaryCta: "See projects",
      imageLabel: "Strategy, design and delivery",
    },
    about: {
      eyebrow: "About us",
      title: "We design digital experiences that feel premium and support business goals.",
      body:
        "We help companies sharpen their message, build a cohesive visual language and launch websites that are fast, modern and built to guide users toward action.",
      stats: [
        { value: 147, suffix: "+", label: "screens and sections delivered" },
        { value: 98, suffix: "%", label: "projects delivered on time" },
        { value: 12, suffix: "", label: "years of combined team experience" },
      ],
    },
    services: {
      eyebrow: "Our services",
      title: "From first brief to launch-ready delivery",
      items: [
        { num: "01.", name: "Conversion-focused landing page", price: "from 2,500 PLN" },
        { num: "02.", name: "Premium company website", price: "from 4,000 PLN" },
        { num: "03.", name: "Existing website redesign", price: "from 1,800 PLN" },
        { num: "04.", name: "SaaS product UI design", price: "from 3,200 PLN" },
        { num: "05.", name: "Post-launch growth support", price: "from 5,000 PLN" },
      ],
    },
    howWeWork: {
      eyebrow: "How we work",
      title: "A clear process that keeps momentum and control",
      link: "See the steps ↓",
      steps: [
        { num: "01.", title: "Brief and goals", desc: "We define business priorities, audience needs and scope before design begins." },
        { num: "02.", title: "Creative direction", desc: "We shape structure, messaging and visual language that fit the brand and support conversion." },
        { num: "03.", title: "Design and development", desc: "We connect the visual layer with a fast, responsive frontend implementation." },
        { num: "04.", title: "Launch and iteration", desc: "We publish, test and refine the website based on feedback and performance data." },
      ],
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Selected work",
      viewAll: "See all →",
      imageLabel: "Project preview",
      items: [
        { name: "Premium website for a service brand", tag: "Landing page" },
        { name: "Storefront with a refreshed offer structure", tag: "E-commerce" },
        { name: "Marketing dashboard for a B2B product", tag: "SaaS" },
      ],
    },
    whyUs: {
      eyebrow: "Why us",
      title: "We balance strong aesthetics with reliable delivery",
      items: [
        { title: "Clear process", desc: "At every step you know what we are doing, why it matters and what comes next." },
        { title: "Fast implementation", desc: "We design with real delivery in mind, not just beautiful static mockups." },
        { title: "Collaborative mindset", desc: "We guide decisions, reduce noise and keep the project focused on business value." },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      email: "yrasike60@gmail.com",
      phone: "+48 579 120 480",
      items: [
        {
          question: "How long does a website project usually take?",
          answer: "Most landing pages are delivered within 1-3 weeks. More advanced company sites or digital products usually take around 3-6 weeks.",
        },
        {
          question: "Do you also help with content and page structure?",
          answer: "Yes. We can support information architecture, simplify messaging and prepare copy for key sections.",
        },
        {
          question: "Will the implementation be responsive and fast?",
          answer: "Yes, we design mobile first and pay close attention to performance, clarity and usability across devices.",
        },
        {
          question: "Can I hire you just for a redesign?",
          answer: "Absolutely. We often work with existing assets and refresh the visual layer and UX without rebuilding the whole brand from scratch.",
        },
        {
          question: "Can you continue improving the site after launch?",
          answer: "Yes, we can support future iterations, new sections, technical upkeep and ongoing updates after launch.",
        },
      ],
    },
    contact: {
      eyebrow: "Form",
      title: "Tell us about your project",
      namePlaceholder: "Full name",
      emailPlaceholder: "Email address",
      messagePlaceholder: "Briefly describe your goals and project scope",
      submit: "Send message",
    },
    cta: {
      eyebrow: "Contact",
      title: "Need a new website or a thoughtful redesign?",
      body: "We will help define the direction, scope and next steps without unnecessary chaos. Let's start with a short conversation.",
      button: "Book a call",
      availabilityTitle: "We reply fast",
      availabilityBody: "Email us or leave a request in the form if you want to quickly discuss scope, timing or a rough budget.",
    },
    footer: {
      rights: "All rights reserved.",
    },
    notFound: {
      title: "Page not found",
      body: "It looks like this address does not exist or has been moved.",
      cta: "Back to home",
    },
  },
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationSet;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "nebula-nexus-labs-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "pl";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "pl";
  });

  const t = translations[locale];

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.title = t.meta.title;

    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.meta.title);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", t.meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.meta.description);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", t.meta.description);
  }, [locale, t.meta.description, t.meta.title]);

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
