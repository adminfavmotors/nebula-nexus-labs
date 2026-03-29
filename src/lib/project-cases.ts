import type { Locale } from "@/lib/i18n-data";

type LocalizedProjectCase = {
  name: string;
  tag: string;
  summary: string;
  location: string;
};

type ProjectCaseEntry = {
  href: string;
  preview: {
    src: string;
    objectPosition?: string;
  };
  palette: {
    from: string;
    to: string;
    accent: string;
  };
  content: Record<Locale, LocalizedProjectCase>;
};

export type ProjectCase = {
  href: string;
  domain: string;
  preview: {
    src: string;
    objectPosition?: string;
  };
  palette: {
    from: string;
    to: string;
    accent: string;
  };
  name: string;
  tag: string;
  summary: string;
  location: string;
};

const projectCases: ProjectCaseEntry[] = [
  {
    href: "https://nexar-garage-wroc-aw.vercel.app/",
    preview: {
      src: "/project-previews/nexar-garage.jpg",
      objectPosition: "center top",
    },
    palette: {
      from: "#0b1637",
      to: "#081126",
      accent: "#4c9eff",
    },
    content: {
      pl: {
        name: "Nexar Garage",
        tag: "Motoryzacja",
        summary: "Nowoczesna strona warsztatu premium z mocnym hero, klarowną ofertą i wyraźnym CTA.",
        location: "Wrocław",
      },
      en: {
        name: "Nexar Garage",
        tag: "Automotive",
        summary: "Modern premium garage website with a strong hero, clear offer structure and direct CTA.",
        location: "Wroclaw",
      },
    },
  },
  {
    href: "https://serwis01.vercel.app/",
    preview: {
      src: "/project-previews/motofix-serwis.jpg",
      objectPosition: "center top",
    },
    palette: {
      from: "#1d1110",
      to: "#12090b",
      accent: "#ff7a45",
    },
    content: {
      pl: {
        name: "MotoFix Serwis",
        tag: "Warsztat",
        summary: "Lokalna strona serwisowa z czytelnym układem usług i szybkim wejściem do kontaktu.",
        location: "Kraków",
      },
      en: {
        name: "MotoFix Serwis",
        tag: "Workshop",
        summary: "Local service website with a clear service structure and fast contact entry points.",
        location: "Krakow",
      },
    },
  },
  {
    href: "https://wodnystart.vercel.app/",
    preview: {
      src: "/project-previews/wodny-start.jpg",
      objectPosition: "center top",
    },
    palette: {
      from: "#081f31",
      to: "#061520",
      accent: "#46c8ff",
    },
    content: {
      pl: {
        name: "Wodny Start",
        tag: "Instalacje",
        summary: "Techniczna strona usługowa dla marki od systemów grzewczych i nowoczesnych instalacji.",
        location: "Polska",
      },
      en: {
        name: "Wodny Start",
        tag: "Installations",
        summary: "Technical service website for a brand focused on heating systems and modern installations.",
        location: "Poland",
      },
    },
  },
  {
    href: "https://smile-art-digital.vercel.app/",
    preview: {
      src: "/project-previews/smile-art-digital.jpg",
      objectPosition: "center top",
    },
    palette: {
      from: "#13233b",
      to: "#0a1424",
      accent: "#7aa8ff",
    },
    content: {
      pl: {
        name: "Smile Art Digital",
        tag: "Stomatologia",
        summary: "Elegancka strona kliniki stomatologicznej z premium prezentacją i spokojną typografią.",
        location: "Kraków",
      },
      en: {
        name: "Smile Art Digital",
        tag: "Dental",
        summary: "Elegant dental clinic website with premium presentation and calm typography.",
        location: "Krakow",
      },
    },
  },
  {
    href: "https://teal-and-tale-aesthetics-demo.vercel.app/pl/",
    preview: {
      src: "/project-previews/teal-and-tale.jpg",
      objectPosition: "center top",
    },
    palette: {
      from: "#102725",
      to: "#081816",
      accent: "#65d4c2",
    },
    content: {
      pl: {
        name: "Teal & Tale Aesthetics",
        tag: "Beauty",
        summary: "Lifestyle'owa strona salonu beauty z miękkim klimatem premium i wyważonym UX.",
        location: "Kraków",
      },
      en: {
        name: "Teal & Tale Aesthetics",
        tag: "Beauty",
        summary: "Lifestyle beauty salon website with a soft premium feel and balanced UX.",
        location: "Krakow",
      },
    },
  },
  {
    href: "https://dentacare-smile-studio.vercel.app/",
    preview: {
      src: "/project-previews/dentacare-smile-studio.jpg",
      objectPosition: "center top",
    },
    palette: {
      from: "#1a1f36",
      to: "#0b1122",
      accent: "#88a7ff",
    },
    content: {
      pl: {
        name: "DentaCare Smile Studio",
        tag: "Klinika",
        summary: "Strona medyczna z lokalnym pozycjonowaniem, czytelną nawigacją i prezentacją wysokiego zaufania.",
        location: "Kraków",
      },
      en: {
        name: "DentaCare Smile Studio",
        tag: "Clinic",
        summary: "Medical website with local SEO focus, clear navigation and high-trust presentation.",
        location: "Krakow",
      },
    },
  },
];

export function getProjectCases(locale: Locale): ProjectCase[] {
  return projectCases.map((project) => {
    const url = new URL(project.href);

    return {
      href: project.href,
      domain: url.hostname.replace(/^www\./, ""),
      preview: project.preview,
      palette: project.palette,
      ...project.content[locale],
    };
  });
}
