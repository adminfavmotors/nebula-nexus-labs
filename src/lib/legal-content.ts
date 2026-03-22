import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n-data";

type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

type LegalDocument = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
};

type LegalContent = {
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
  privacy: LegalDocument;
  cookies: LegalDocument;
};

export const legalContent: Record<Locale, LegalContent> = {
  pl: {
    common: {
      updatedLabel: "Aktualizacja",
      backHome: "Wróć na stronę główną",
      contactLabel: `Kontakt: ${siteConfig.contactEmail} | ${siteConfig.businessPhone}`,
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
    privacy: {
      metaTitle: "Polityka prywatności | Nebula Nexus Labs",
      metaDescription: "Informacje o przetwarzaniu danych osobowych przez Nebula Nexus Labs.",
      title: "Polityka prywatności",
      intro:
        "Poniżej opisujemy, jakie dane osobowe przetwarzamy w ramach tej strony, w jakich celach, na jakiej podstawie oraz jakie prawa przysługują osobom kontaktującym się z nami.",
      updatedAt: "22 marca 2026",
      sections: [
        {
          title: "1. Administrator danych",
          paragraphs: [
            `${siteConfig.brandName} jest administratorem danych osobowych przetwarzanych w związku z korzystaniem z tej strony i formularza kontaktowego.`,
            `W sprawach dotyczących prywatności możesz skontaktować się z nami pod adresem ${siteConfig.contactEmail} lub telefonicznie: ${siteConfig.businessPhone}.`,
          ],
        },
        {
          title: "2. Jakie dane zbieramy",
          paragraphs: [
            "Przetwarzamy dane, które podajesz dobrowolnie w formularzu kontaktowym, w szczególności imię i nazwisko, adres e-mail oraz treść wiadomości.",
            "Technicznie zapisujemy również preferencję języka strony w pamięci przeglądarki, aby serwis mógł wyświetlać właściwą wersję językową przy kolejnych odwiedzinach.",
          ],
        },
        {
          title: "3. Cele i podstawy prawne",
          paragraphs: [
            "Dane z formularza przetwarzamy przede wszystkim w celu odpowiedzi na Twoją wiadomość, przygotowania wyceny, podjęcia działań przed zawarciem umowy albo prowadzenia dalszej korespondencji biznesowej.",
            "Podstawą prawną przetwarzania jest art. 6 ust. 1 lit. b RODO, gdy kontakt dotyczy usługi lub działań przedumownych podejmowanych na Twoje żądanie, oraz art. 6 ust. 1 lit. f RODO, czyli nasz prawnie uzasadniony interes polegający na obsłudze korespondencji i ochronie przed nadużyciami.",
          ],
        },
        {
          title: "4. Odbiorcy danych i podmioty przetwarzające",
          paragraphs: [
            "Z danych mogą korzystać nasi dostawcy usług technicznych, hostingowych i pocztowych, wyłącznie w zakresie niezbędnym do działania strony i obsługi kontaktu.",
            "Wiadomości wysyłane przez formularz są technicznie przekazywane przez zewnętrznego operatora FormSubmit, który działa jako narzędzie do obsługi formularzy. Przed uruchomieniem strony produkcyjnie warto potwierdzić aktualne warunki przetwarzania danych i transferów u tego dostawcy.",
          ],
        },
        {
          title: "5. Okres przechowywania",
          paragraphs: [
            "Dane z korespondencji przechowujemy przez czas potrzebny do obsługi sprawy, a następnie do czasu przedawnienia ewentualnych roszczeń lub do chwili, gdy dalsze przechowywanie przestanie być uzasadnione.",
            "Jeżeli kontakt doprowadzi do zawarcia umowy, dane mogą być przechowywane dłużej w zakresie wymaganym przez przepisy prawa lub potrzebnym do realizacji współpracy.",
          ],
        },
        {
          title: "6. Twoje prawa",
          paragraphs: [
            "Masz prawo żądać dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia danych oraz wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie.",
            "Jeżeli uznasz, że przetwarzanie narusza przepisy, masz również prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych.",
          ],
        },
        {
          title: "7. Dobrowolność podania danych",
          paragraphs: [
            "Podanie danych w formularzu jest dobrowolne, ale bez podstawowych danych kontaktowych nie będziemy w stanie odpowiedzieć na wiadomość ani przygotować odpowiedzi na zapytanie.",
          ],
        },
        {
          title: "8. Zautomatyzowane decyzje",
          paragraphs: [
            "Dane przesyłane przez formularz nie służą do podejmowania wobec Ciebie zautomatyzowanych decyzji ani do profilowania w rozumieniu RODO.",
          ],
        },
      ],
    },
    cookies: {
      metaTitle: "Polityka cookies | Nebula Nexus Labs",
      metaDescription: "Informacje o cookies i local storage wykorzystywanych przez Nebula Nexus Labs.",
      title: "Polityka cookies",
      intro:
        "Ta strona nie korzysta obecnie z marketingowych ani analitycznych cookies. Używamy wyłącznie minimalnych mechanizmów technicznych potrzebnych do działania wybranych funkcji serwisu.",
      updatedAt: "22 marca 2026",
      sections: [
        {
          title: "1. Czego używa ta strona",
          paragraphs: [
            "Serwis zapisuje preferencję języka w pamięci przeglądarki (localStorage), aby po ponownej wizycie od razu wyświetlić wybraną wersję językową.",
            "Nie wykorzystujemy obecnie narzędzi reklamowych, pikseli marketingowych ani analityki, które wymagałyby osobnego banera zgody na opcjonalne cookies.",
          ],
          items: [
            "Klucz: nebula-nexus-labs-locale",
            "Cel: zapamiętanie preferowanego języka strony",
            "Zakres: wartość pl / en",
            "Czas działania: do momentu usunięcia przez użytkownika lub wyczyszczenia danych przeglądarki",
          ],
        },
        {
          title: "2. Podstawa korzystania z pamięci przeglądarki",
          paragraphs: [
            "Taki zapis służy wyłącznie realizacji funkcji wybranej przez użytkownika, czyli zapamiętaniu preferencji językowej przy kolejnych odwiedzinach.",
          ],
        },
        {
          title: "3. Zarządzanie ustawieniami",
          paragraphs: [
            "W każdej chwili możesz usunąć zapisane dane strony w ustawieniach przeglądarki lub wyczyścić localStorage dla tej domeny. Po usunięciu preferencji językowej serwis wróci do domyślnej wersji językowej.",
          ],
        },
        {
          title: "4. Zmiany w polityce cookies",
          paragraphs: [
            "Jeżeli w przyszłości wdrożymy opcjonalne narzędzia analityczne lub marketingowe, zaktualizujemy tę politykę i dodamy odpowiedni mechanizm zgody przed ich uruchomieniem.",
          ],
        },
      ],
    },
  },
  en: {
    common: {
      updatedLabel: "Last updated",
      backHome: "Back to home",
      contactLabel: `Contact: ${siteConfig.contactEmail} | ${siteConfig.businessPhone}`,
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
    privacy: {
      metaTitle: "Privacy Policy | Nebula Nexus Labs",
      metaDescription: "Information about how Nebula Nexus Labs processes personal data.",
      title: "Privacy Policy",
      intro:
        "Below we explain what personal data we process through this website, why we process it, what legal bases apply and what rights are available to people who contact us.",
      updatedAt: "March 22, 2026",
      sections: [
        {
          title: "1. Data controller",
          paragraphs: [
            `${siteConfig.brandName} is the controller of personal data processed in connection with this website and its contact form.`,
            `For privacy-related matters, you can contact us at ${siteConfig.contactEmail} or by phone at ${siteConfig.businessPhone}.`,
          ],
        },
        {
          title: "2. What data we collect",
          paragraphs: [
            "We process the data you voluntarily provide in the contact form, especially your name, email address and the content of your message.",
            "We also store your language preference in browser storage so the website can display the selected language on future visits.",
          ],
        },
        {
          title: "3. Purposes and legal bases",
          paragraphs: [
            "We process form data mainly to reply to your message, prepare a quote, take steps before entering into a contract or continue business correspondence with you.",
            "The legal basis is Article 6(1)(b) GDPR when your request concerns a service or pre-contractual steps taken at your request, and Article 6(1)(f) GDPR, our legitimate interest in handling correspondence and protecting against misuse.",
          ],
        },
        {
          title: "4. Recipients and processors",
          paragraphs: [
            "Your data may be processed by our technical, hosting and email service providers, but only to the extent necessary to operate the website and handle contact requests.",
            "Messages sent through the form are technically routed via FormSubmit, an external form handling tool. Before production use, it is worth confirming that provider's current data processing and transfer terms.",
          ],
        },
        {
          title: "5. Storage period",
          paragraphs: [
            "We keep correspondence data for as long as needed to handle the matter and then for the period necessary to defend against potential claims or until further retention is no longer justified.",
            "If the contact leads to a contract, the data may be stored longer to the extent required by law or necessary for the cooperation.",
          ],
        },
        {
          title: "6. Your rights",
          paragraphs: [
            "You have the right to request access to your data, rectification, erasure, restriction of processing, data portability and to object to processing based on legitimate interests.",
            "If you believe the processing violates applicable law, you also have the right to lodge a complaint with the Polish data protection authority, the President of the Personal Data Protection Office.",
          ],
        },
        {
          title: "7. Voluntary provision of data",
          paragraphs: [
            "Providing your data in the form is voluntary, but without basic contact details we may not be able to reply to your message or prepare a response to your enquiry.",
          ],
        },
        {
          title: "8. Automated decision-making",
          paragraphs: [
            "Data sent through the form is not used for automated decision-making or profiling within the meaning of the GDPR.",
          ],
        },
      ],
    },
    cookies: {
      metaTitle: "Cookie Policy | Nebula Nexus Labs",
      metaDescription: "Information about cookies and browser storage used by Nebula Nexus Labs.",
      title: "Cookie Policy",
      intro:
        "This website currently does not use marketing or analytics cookies. We only rely on minimal technical browser storage required for selected site functions.",
      updatedAt: "March 22, 2026",
      sections: [
        {
          title: "1. What this website uses",
          paragraphs: [
            "The site stores the chosen language in browser storage (localStorage) so that future visits can open in the preferred language.",
            "We do not currently use advertising tools, marketing pixels or analytics that would require a separate consent banner for optional cookies.",
          ],
          items: [
            "Key: nebula-nexus-labs-locale",
            "Purpose: remember the preferred site language",
            "Scope: value pl / en",
            "Duration: until removed by the user or browser data is cleared",
          ],
        },
        {
          title: "2. Legal basis for browser storage",
          paragraphs: [
            "This storage is used only to deliver a function explicitly requested by the user, namely remembering the language preference across visits.",
          ],
        },
        {
          title: "3. Managing settings",
          paragraphs: [
            "You can remove stored site data at any time in your browser settings or clear localStorage for this domain. After removal, the site will return to the default language version.",
          ],
        },
        {
          title: "4. Future changes",
          paragraphs: [
            "If we introduce optional analytics or marketing tools in the future, we will update this policy and add an appropriate consent mechanism before they start operating.",
          ],
        },
      ],
    },
  },
};
