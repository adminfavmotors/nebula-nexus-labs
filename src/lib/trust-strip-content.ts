import type { Locale } from "@/lib/i18n";

export type TrustStripCopy = {
  eyebrow: string;
  title: string;
  items: Array<{
    value: string;
    label: string;
  }>;
};

export const trustStripContent: Record<Locale, TrustStripCopy> = {
  pl: {
    eyebrow: "Dlaczego NODE48",
    title: "Jeden partner od kierunku po wdrożenie",
    items: [
      { value: "Strategia + design + development", label: "jeden proces zamiast rozproszonej współpracy" },
      { value: "Responsywność i szybkość", label: "spokojne działanie na mobile, laptopie i desktopie" },
      { value: "SEO-ready foundation", label: "poprawna struktura pod dalszą widoczność i rozwój" },
      { value: "Jasny zakres i tempo", label: "konkretne etapy, terminy i komunikacja bez chaosu" },
    ],
  },
  en: {
    eyebrow: "Why NODE48",
    title: "One partner from direction to launch",
    items: [
      { value: "Strategy + design + development", label: "one process instead of fragmented handoffs" },
      { value: "Responsive and fast", label: "stable experience across mobile, laptop and desktop" },
      { value: "SEO-ready foundation", label: "clean structure prepared for visibility and growth" },
      { value: "Clear scope and pace", label: "defined stages, timing and communication without noise" },
    ],
  },
};
