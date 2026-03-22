import { siteConfig } from "@/lib/site-config";

export type Locale = "pl" | "en";

type NavLink = { label: string; href: string };
type Stat = { value: number; suffix: string; label: string };
type Service = { num: string; name: string; price: string };
type ProcessStep = { num: string; title: string; desc: string };
type Project = { name: string; tag: string };
type Benefit = { title: string; desc: string };
type FaqItem = { question: string; answer: string };
type AboutThesis = { num: string; text: string };

export type TranslationSet = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    links: NavLink[];
    cta: string;
    languageLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
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
    titleLine1: string;
    titleLine2start: string;
    titleLine2accent: string;
    titleLine2end: string;
    titleLine3: string;
    theses: AboutThesis[];
    stats: Stat[];
  };
  services: {
    title: string;
    items: Service[];
  };
  howWeWork: {
    title: string;
    link: string;
    steps: ProcessStep[];
  };
  projects: {
    title: string;
    viewAll: string;
    imageLabel: string;
    previousLabel: string;
    nextLabel: string;
    items: Project[];
  };
  whyUs: {
    title: string;
    items: Benefit[];
  };
  faq: {
    title: string;
    email: string;
    phone: string;
    items: FaqItem[];
  };
  contact: {
    title: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    status: {
      submitting: string;
      success: string;
      error: string;
    };
  };
  cta: {
    title: string;
    body: string;
    button: string;
    availabilityTitle: string;
    availabilityBody: string;
    quickActions: {
      form: string;
      faq: string;
    };
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

export const translations = {
  pl: {
    meta: {
      title: "Nebula Nexus Labs | Strony i produkty cyfrowe",
      description:
        "Projektujemy szybkie strony internetowe, landing page'e i doświadczenia cyfrowe dla firm, które chcą wyglądać nowocześnie i sprzedawać skuteczniej.",
    },
    nav: {
      links: [
        { label: "Start", href: "#home" },
        { label: "Usługi", href: "#services" },
        { label: "Projekty", href: "#projects" },
        { label: "O nas", href: "#about" },
      ],
      cta: "Umów konsultację",
      languageLabel: "Język",
      openMenuLabel: "Otwórz menu",
      closeMenuLabel: "Zamknij menu",
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
      titleLine1: "Budujemy obecność online,",
      titleLine2start: "która wyróżnia ",
      titleLine2accent: "Twoją markę",
      titleLine2end: "",
      titleLine3: "i zamienia odwiedziny w klientów.",
      theses: [
        { num: "01.", text: "Strona to narzędzie sprzedaży, nie tylko wizytówka." },
        { num: "02.", text: "Pomagamy rosnąć firmom, które chcą być zauważone." },
        { num: "03.", text: "Od strategii po wdrożenie, z myślą o Twoim wyniku." },
      ],
      stats: [
        { value: 147, suffix: "+", label: "zrealizowanych ekranów i sekcji" },
        { value: 98, suffix: "%", label: "projektów oddanych w terminie" },
        { value: 12, suffix: "", label: "lat doświadczenia zespołu łącznie" },
      ],
    },
    services: {
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
      title: "Wybrane realizacje",
      viewAll: "Zobacz wszystkie →",
      imageLabel: "Podgląd projektu",
      previousLabel: "Poprzedni projekt",
      nextLabel: "Następny projekt",
      items: [
        { name: "Strona premium dla marki usługowej", tag: "Landing page" },
        { name: "Sklep z nową architekturą oferty", tag: "E-commerce" },
        { name: "Panel marketingowy dla produktu B2B", tag: "SaaS" },
      ],
    },
    whyUs: {
      title: "Łączymy estetykę z odpowiedzialnym wykonaniem",
      items: [
        { title: "Jasny proces", desc: "Na każdym etapie wiesz, co robimy, po co to robimy i jaki będzie kolejny krok." },
        { title: "Szybkie wdrożenie", desc: "Projektujemy z myślą o realnym wdrożeniu, a nie tylko o ładnych makietach." },
        { title: "Partnerska współpraca", desc: "Doradzamy, upraszczamy decyzje i pilnujemy, by projekt dowoził wartość biznesową." },
      ],
    },
    faq: {
      title: "Najczęstsze pytania",
      email: "Skorzystaj z formularza kontaktowego poniżej.",
      phone: siteConfig.businessPhone,
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
      title: "Opowiedz nam o swoim projekcie",
      namePlaceholder: "Imię i nazwisko",
      emailPlaceholder: "Adres e-mail",
      messagePlaceholder: "Krótko opisz cele i zakres projektu",
      submit: "Wyślij wiadomość",
      status: {
        submitting: "Wysyłamy zgłoszenie...",
        success: "Dziękujemy. Zgłoszenie zostało wysłane pomyślnie.",
        error: "Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.",
      },
    },
    cta: {
      title: "Potrzebujesz nowej strony albo odświeżenia obecnej?",
      body: "Przygotujemy kierunek, zakres i następne kroki bez zbędnego chaosu. Zacznijmy od krótkiej rozmowy.",
      button: "Umów rozmowę",
      availabilityTitle: "Odpowiadamy szybko",
      availabilityBody: "Napisz do nas mailowo lub zostaw zgłoszenie w formularzu, jeśli chcesz szybko omówić zakres, termin albo wstępny budżet.",
      quickActions: {
        form: "Przejdź do formularza",
        faq: "Zobacz FAQ",
      },
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
    nav: {
      links: [
        { label: "Home", href: "#home" },
        { label: "Services", href: "#services" },
        { label: "Projects", href: "#projects" },
        { label: "About", href: "#about" },
      ],
      cta: "Book a call",
      languageLabel: "Language",
      openMenuLabel: "Open menu",
      closeMenuLabel: "Close menu",
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
      titleLine1: "We build an online presence,",
      titleLine2start: "that makes ",
      titleLine2accent: "your brand stand out",
      titleLine2end: "",
      titleLine3: "and turns visitors into customers.",
      theses: [
        { num: "01.", text: "A website should work as a sales tool, not just a business card." },
        { num: "02.", text: "We help ambitious companies grow and become easier to notice." },
        { num: "03.", text: "From strategy to launch, we keep the end result tied to your goals." },
      ],
      stats: [
        { value: 147, suffix: "+", label: "screens and sections delivered" },
        { value: 98, suffix: "%", label: "projects delivered on time" },
        { value: 12, suffix: "", label: "years of combined team experience" },
      ],
    },
    services: {
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
      title: "Selected work",
      viewAll: "See all →",
      imageLabel: "Project preview",
      previousLabel: "Previous project",
      nextLabel: "Next project",
      items: [
        { name: "Premium website for a service brand", tag: "Landing page" },
        { name: "Storefront with a refreshed offer structure", tag: "E-commerce" },
        { name: "Marketing dashboard for a B2B product", tag: "SaaS" },
      ],
    },
    whyUs: {
      title: "We balance strong aesthetics with reliable delivery",
      items: [
        { title: "Clear process", desc: "At every step you know what we are doing, why it matters and what comes next." },
        { title: "Fast implementation", desc: "We design with real delivery in mind, not just beautiful static mockups." },
        { title: "Collaborative mindset", desc: "We guide decisions, reduce noise and keep the project focused on business value." },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      email: "Use the contact form below.",
      phone: siteConfig.businessPhone,
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
      title: "Tell us about your project",
      namePlaceholder: "Full name",
      emailPlaceholder: "Email address",
      messagePlaceholder: "Briefly describe your goals and project scope",
      submit: "Send message",
      status: {
        submitting: "Sending your request...",
        success: "Thanks. Your request has been sent successfully.",
        error: "We could not send the form. Please try again in a moment.",
      },
    },
    cta: {
      title: "Need a new website or a thoughtful redesign?",
      body: "We will help define the direction, scope and next steps without unnecessary chaos. Let's start with a short conversation.",
      button: "Book a call",
      availabilityTitle: "We reply fast",
      availabilityBody: "Email us or leave a request in the form if you want to quickly discuss scope, timing or a rough budget.",
      quickActions: {
        form: "Open the form",
        faq: "See FAQ",
      },
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
} satisfies Record<Locale, TranslationSet>;

export const STORAGE_KEY = "nebula-nexus-labs-locale";
