import { businessPhone, contactEmail } from "@/lib/contact-config";
import type { Locale } from "@/lib/i18n-data";

type LegalUiCopy = {
  common: {
    updatedLabel: string;
    backHome: string;
    contactLabel: string;
  };
  footer: {
    privacy: string;
    cookies: string;
  };
  formNotice: {
    prefix: string;
    linkLabel: string;
    suffix: string;
  };
};

export const legalUiCopy: Record<Locale, LegalUiCopy> = {
  pl: {
    common: {
      updatedLabel: "Aktualizacja",
      backHome: "Wroc na strone glowna",
      contactLabel: `Kontakt: ${contactEmail} | ${businessPhone}`,
    },
    footer: {
      privacy: "Polityka prywatnosci",
      cookies: "Polityka cookies",
    },
    formNotice: {
      prefix: "Wysylajac formularz, potwierdzasz, ze zapoznales sie z nasza",
      linkLabel: "polityka prywatnosci",
      suffix: "i rozumiesz, ze wiadomosc jest przekazywana przez zewnetrzny procesor formularzy.",
    },
  },
  en: {
    common: {
      updatedLabel: "Last updated",
      backHome: "Back to home",
      contactLabel: `Contact: ${contactEmail} | ${businessPhone}`,
    },
    footer: {
      privacy: "Privacy policy",
      cookies: "Cookie policy",
    },
    formNotice: {
      prefix: "By sending the form, you confirm that you have read our",
      linkLabel: "privacy policy",
      suffix: "and understand that your message is delivered through an external form processor.",
    },
  },
};
