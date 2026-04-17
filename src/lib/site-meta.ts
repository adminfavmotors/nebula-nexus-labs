type SiteMetaLocale = "pl" | "en";

export const homePageMeta: Record<
  SiteMetaLocale,
  {
    title: string;
    description: string;
  }
> = {
  pl: {
    title: "Tworzenie stron internetowych dla firm | NODE48",
    description:
      "Projektujemy szybkie strony internetowe, landing page'e i doświadczenia cyfrowe dla firm, które chcą wyglądać nowocześnie i sprzedawać skuteczniej.",
  },
  en: {
    title: "NODE48 | Websites and digital products",
    description:
      "We design fast websites, landing pages and digital experiences for companies that want a modern presence and stronger conversion.",
  },
};
