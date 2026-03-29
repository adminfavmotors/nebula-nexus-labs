export type Locale = "pl" | "en";

type NavLink = { label: string; href: string };
type Service = { num: string; name: string; price: string };
type ProcessStep = { num: string; title: string; desc: string };
type Benefit = { title: string; desc: string };
type FaqItem = { question: string; answer: string };
type AboutThesis = { num: string; text: string };
type TrustStripItem = { value: string; label: string };

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
  trustStrip: {
    eyebrow: string;
    title: string;
    items: TrustStripItem[];
  };
  about: {
    titleLine1: string;
    titleLine2start: string;
    titleLine2accent: string;
    titleLine2end: string;
    titleLine3: string;
    theses: AboutThesis[];
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
    collectionLabel: string;
    liveLabel: string;
    openLabel: string;
    previousLabel: string;
    nextLabel: string;
  };
  whyUs: {
    title: string;
    items: Benefit[];
  };
  faq: {
    title: string;
    email: string;
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
      title: "NODE48 | Strony i produkty cyfrowe",
      description:
        "Projektujemy szybkie strony internetowe, landing page'e i doL�wiadczenia cyfrowe dla firm, ktAlre chcą wyglądać nowoczeL�nie i sprzedawać skuteczniej.",
    },
    nav: {
      links: [
        { label: "Start", href: "#home" },
        { label: "UsL�ugi", href: "#services" },
        { label: "Projekty", href: "#projects" },
        { label: "O nas", href: "#about" },
      ],
      cta: "UmAlw konsultację",
      languageLabel: "Język",
      openMenuLabel: "OtwAlrz menu",
      closeMenuLabel: "Zamknij menu",
    },
    hero: {
      badge: "Studio stron i produktAlw cyfrowych",
      words: ["Tworzymy", "strony", "ktAlre dziaL�ają"],
      body:
        "L�ączymy strategię, design i development, aby budować nowoczesne witryny dla marek, ktAlre chcą rosnąć szybciej i komunikować się wyraLsniej.",
      primaryCta: "Porozmawiajmy",
      secondaryCta: "Zobacz realizacje",
      imageLabel: "Strategia, design i wdroLLenie",
    },
    about: {
      titleLine1: "Budujemy obecnoL�ć online,",
      titleLine2start: "ktAlra wyrAlLLnia ",
      titleLine2accent: "Twoją markę",
      titleLine2end: "",
      titleLine3: "i zamienia odwiedziny w klientAlw.",
      theses: [
        { num: "01.", text: "Strona to narzędzie sprzedaLLy, nie tylko wizytAlwka." },
        { num: "02.", text: "Pomagamy rosnąć firmom, ktAlre chcą być zauwaLLone." },
        { num: "03.", text: "Od strategii po wdroLLenie, z myL�lą o Twoim wyniku." },
      ],
    },
    services: {
      title: "Od pierwszego briefu do gotowego wdroLLenia",
      items: [
        { num: "01.", name: "Strona wizytAlwka", price: "od 1 490 zL�" },
        { num: "02.", name: "Landing page", price: "od 1 790 zL�" },
        { num: "03.", name: "Strona firmowa", price: "od 2 990 zL�" },
        { num: "04.", name: "Redesign strony", price: "od 1 690 zL�" },
        { num: "05.", name: "Opieka techniczna", price: "od 149 zL� / miesiąc" },
        { num: "06.", name: "Strona premium dla wymagających firm", price: "wycena indywidualna" },
      ],
    },
    howWeWork: {
      title: "Przejrzysty proces, ktAlry daje tempo i kontrolę",
      link: "Zobacz etapy ↓",
      steps: [
        { num: "01.", title: "Brief i cel", desc: "Ustalamy priorytety biznesowe, odbiorcAlw i zakres, zanim zaczniemy projektować." },
        { num: "02.", title: "Kierunek wizualny", desc: "Budujemy strukturę, copy i styl, ktAlry pasuje do marki oraz wspiera konwersję." },
        { num: "03.", title: "Projekt i development", desc: "L�ączymy warstwę wizualną z szybkim, responsywnym wdroLLeniem frontendu." },
        { num: "04.", title: "Publikacja i optymalizacja", desc: "Uruchamiamy stronę, testujemy ją i dopracowujemy na podstawie danych." },
      ],
    },
    projects: {
      title: "Wybrane realizacje",
      collectionLabel: "6 realizacji online",
      liveLabel: "Strona live",
      openLabel: "OtwAlrz projekt",
      previousLabel: "Poprzedni projekt",
      nextLabel: "Następny projekt",
    },
    whyUs: {
      title: "L�ączymy estetykę z odpowiedzialnym wykonaniem",
      items: [
        { title: "Jasny proces", desc: "Na kaLLdym etapie wiesz, co robimy, po co to robimy i jaki będzie kolejny krok." },
        { title: "Szybkie wdroLLenie", desc: "Projektujemy z myL�lą o realnym wdroLLeniu, a nie tylko o L�adnych makietach." },
        { title: "Partnerska wspAlL�praca", desc: "Doradzamy, upraszczamy decyzje i pilnujemy, by projekt dowoziL� wartoL�ć biznesową." },
      ],
    },
    faq: {
      title: "Najczęstsze pytania",
      email: "Skorzystaj z formularza kontaktowego poniLLej.",
      items: [
        {
          question: "Ile trwa przygotowanie strony internetowej?",
          answer: "WiększoL�ć projektAlw landing page koL�czymy w 1-3 tygodnie. Bardziej rozbudowane strony firmowe lub produkty cyfrowe wymagają zwykle 3-6 tygodni pracy.",
        },
        {
          question: "Czy pomagacie takLLe z treL�cią i strukturą strony?",
          answer: "Tak. MoLLemy pomAlc w architekturze informacji, uproszczeniu komunikacji i przygotowaniu copy do kluczowych sekcji.",
        },
        {
          question: "Czy wdroLLenie jest responsywne i szybkie?",
          answer: "Tak, projektujemy mobile first i dbamy o wydajnoL�ć, czytelnoL�ć oraz komfort korzystania na telefonie i desktopie.",
        },
        {
          question: "Czy mogę zlecić tylko redesign bez budowy od zera?",
          answer: "OczywiL�cie. Często pracujemy na istniejących materiaL�ach i odL�wieLLamy warstwę wizualną oraz UX bez peL�nej przebudowy marki.",
        },
        {
          question: "Czy po publikacji moLLecie dalej rozwijać stronę?",
          answer: "Tak, moLLemy zapewnić dalsze iteracje, rozwAlj nowych sekcji, wsparcie techniczne i bieLLące aktualizacje.",
        },
      ],
    },
    contact: {
      title: "Opowiedz nam o swoim projekcie",
      namePlaceholder: "Imię i nazwisko",
      emailPlaceholder: "Adres e-mail",
      messagePlaceholder: "KrAltko opisz cele i zakres projektu",
      submit: "WyL�lij wiadomoL�ć",
      status: {
        submitting: "WysyL�amy zgL�oszenie...",
        success: "Dziękujemy. ZgL�oszenie zostaL�o wysL�ane pomyL�lnie.",
        error: "Nie udaL�o się wysL�ać formularza. SprAlbuj ponownie za chwilę.",
      },
    },
    cta: {
      title: "Potrzebujesz nowej strony albo odL�wieLLenia obecnej?",
      body: "Przygotujemy kierunek, zakres i następne kroki bez zbędnego chaosu. Zacznijmy od krAltkiej rozmowy.",
      button: "UmAlw rozmowę",
      availabilityTitle: "Odpowiadamy szybko",
      availabilityBody: "Napisz do nas mailowo lub zostaw zgL�oszenie w formularzu, jeL�li chcesz szybko omAlwić zakres, termin albo wstępny budLLet.",
      quickActions: {
        form: "PrzejdLs do formularza",
        faq: "Zobacz FAQ",
      },
    },
    footer: {
      rights: "Wszelkie prawa zastrzeLLone.",
    },
    notFound: {
      title: "Strona nie zostaL�a znaleziona",
      body: "Wygląda na to, LLe ten adres nie istnieje lub zostaL� przeniesiony.",
      cta: "WrAlć na stronę gL�Alwną",
    },
  },
  en: {
    meta: {
      title: "NODE48 | Websites and digital products",
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
    },
    services: {
      title: "From first brief to launch-ready delivery",
      items: [
        { num: "01.", name: "Business card website", price: "from 1,490 PLN" },
        { num: "02.", name: "Landing page", price: "from 1,790 PLN" },
        { num: "03.", name: "Company website", price: "from 2,990 PLN" },
        { num: "04.", name: "Website redesign", price: "from 1,690 PLN" },
        { num: "05.", name: "Technical support", price: "from 149 PLN / month" },
        { num: "06.", name: "Premium website for demanding companies", price: "custom quote" },
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
      collectionLabel: "6 live projects",
      liveLabel: "Live website",
      openLabel: "Open project",
      previousLabel: "Previous project",
      nextLabel: "Next project",
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

export const STORAGE_KEY = "node48-locale";


