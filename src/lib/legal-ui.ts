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
      backHome: "Wróć na stronę główną",
      contactLabel: `Kontakt: ${contactEmail} | ${businessPhone}`,
    },
    footer: {
      privacy: "Polityka prywatności",
      cookies: "Polityka cookies",
    },
    formNotice: {
      prefix: "Wysyłając formularz, potwierdzasz, że zapoznałeś się z naszą",
      linkLabel: "polityką prywatności",
      suffix: "i rozumiesz, że wiadomość jest przekazywana przez zewnętrzny formularz kontaktowy.",
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
