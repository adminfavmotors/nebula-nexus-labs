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
      metaTitle: "Polityka prywatności | NODE48",
      metaDescription: "Informacje o przetwarzaniu danych osobowych związanych z marką NODE48.",
      title: "Polityka prywatności",
      intro:
        "Poniżej opisujemy, jakie dane osobowe przetwarzamy w ramach tej strony, w jakich celach, na jakiej podstawie oraz jakie prawa przysługują osobom kontaktującym się z nami.",
      updatedAt: "23 marca 2026",
      sections: [
        {
          title: "1. Administrator danych",
          paragraphs: [
            `${siteConfig.dataControllerName}, działający pod marką ${siteConfig.brandName}, jest administratorem danych osobowych przetwarzanych w związku z korzystaniem z tej strony i formularza kontaktowego.`,
            `W sprawach dotyczących prywatności możesz skontaktować się z nami pod adresem ${siteConfig.contactEmail} lub telefonicznie: ${siteConfig.businessPhone}.`,
          ],
        },
        {
          title: "2. Jakie dane zbieramy",
          paragraphs: [
            "Przetwarzamy dane, które podajesz dobrowolnie w formularzu kontaktowym, w szczególności imię i nazwisko, adres e-mail oraz treść wiadomości.",
            "Technicznie zapisujemy również preferencję języka strony w pamięci przeglądarki, a po próbie wysłania formularza możemy tymczasowo zapisać krótki znacznik antyspamowy ograniczający automatyczne ponowne zgłoszenia.",
            "Jeżeli korzystasz ze strony z włączonymi skryptami analitycznymi, możemy również otrzymywać zagregowane informacje statystyczne o odsłonach, źródłach ruchu, urządzeniu, przeglądarce i przybliżonej lokalizacji, generowane przez Google Analytics.",
          ],
        },
        {
          title: "3. Cele i podstawy prawne",
          paragraphs: [
            "Dane z formularza przetwarzamy przede wszystkim w celu odpowiedzi na Twoją wiadomość, przygotowania wyceny, podjęcia działań przed zawarciem umowy albo prowadzenia dalszej korespondencji biznesowej.",
            "Podstawą prawną przetwarzania jest art. 6 ust. 1 lit. b RODO, gdy kontakt dotyczy usługi lub działań przedumownych podejmowanych na Twoje żądanie, oraz art. 6 ust. 1 lit. f RODO, czyli nasz prawnie uzasadniony interes polegający na obsłudze korespondencji i ochronie przed nadużyciami.",
            "W zakresie analityki internetowej podstawą przetwarzania jest Twoja zgoda na opcjonalne pliki cookies i technologie pomiarowe, zgodnie z art. 6 ust. 1 lit. a RODO.",
          ],
        },
        {
          title: "4. Odbiorcy danych i podmioty przetwarzające",
          paragraphs: [
            "Z danych mogą korzystać nasi dostawcy usług technicznych, hostingowych i pocztowych, wyłącznie w zakresie niezbędnym do działania strony i obsługi kontaktu.",
            "Wiadomości wysyłane przez formularz są technicznie przekazywane przez zewnętrznego operatora FormSubmit, który działa jako narzędzie do obsługi formularzy. Przed uruchomieniem strony produkcyjnie warto potwierdzić aktualne warunki przetwarzania danych i transferów u tego dostawcy.",
            "Jeżeli korzystamy z Google Analytics, odbiorcą części danych statystycznych może być również Google Ireland Limited oraz podmioty powiązane z Google odpowiedzialne za utrzymanie i rozwój usługi analitycznej.",
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
      metaTitle: "Polityka cookies | NODE48",
      metaDescription: "Informacje o cookies, pamięci przeglądarki i Google Analytics wykorzystywanych przez markę NODE48.",
      title: "Polityka cookies",
      intro:
        "Ta strona korzysta z niezbędnych mechanizmów technicznych oraz z Google Analytics do analizy ruchu i działania serwisu.",
      updatedAt: "23 marca 2026",
      sections: [
        {
          title: "1. Czego używa ta strona",
          paragraphs: [
            "Serwis zapisuje preferencję języka w pamięci przeglądarki (localStorage), aby po ponownej wizycie od razu wyświetlić wybraną wersję językową.",
            "Po próbie wysłania formularza kontaktowego strona może tymczasowo zapisać w sessionStorage krótki znacznik antyspamowy ograniczający bardzo szybkie, powtarzalne zgłoszenia wyglądające na automatyczne.",
            "Strona korzysta również z Google Analytics 4 (identyfikator pomiaru G-TKM0T56TB3), które może zapisywać analityczne pliki cookies i zbierać informacje statystyczne o korzystaniu z serwisu.",
          ],
          items: [
            "Klucz: node48-locale",
            "Cel: zapamiętanie preferowanego języka strony",
            "Zakres: wartość pl / en",
            "Czas działania: do momentu usunięcia przez użytkownika lub wyczyszczenia danych przeglądarki",
            "Klucz: node48-contact-cooldown",
            "Cel: ograniczenie automatycznych, seryjnych wysyłek formularza",
            "Zakres: znacznik czasu ostatniej próby wysłania formularza",
            "Czas działania: sesyjnie, do zamknięcia karty lub wyczyszczenia danych sesji",
            "Cookie: _ga",
            "Cel: rozróżnianie użytkowników na potrzeby statystyk Google Analytics",
            "Zakres: losowy identyfikator klienta",
            "Czas działania: zwykle do 2 lat",
            "Cookie: _ga_TKM0T56TB3",
            "Cel: utrzymanie stanu sesji i atrybucji pomiaru Google Analytics 4",
            "Zakres: identyfikator sesji i parametry pomiarowe",
            "Czas działania: zwykle do 2 lat",
          ],
        },
        {
          title: "2. Podstawa korzystania z pamięci przeglądarki",
          paragraphs: [
            "Niezbędne zapisy służą realizacji funkcji wybranej przez użytkownika oraz podstawowym zabezpieczeniom serwisu przed nadużyciami formularza kontaktowego.",
            "Analityczne pliki cookies Google Analytics służą mierzeniu ruchu, ocenie skuteczności treści i ulepszaniu serwisu.",
          ],
        },
        {
          title: "3. Zarządzanie ustawieniami",
          paragraphs: [
            "W każdej chwili możesz usunąć zapisane dane strony w ustawieniach przeglądarki albo wyczyścić localStorage i sessionStorage dla tej domeny. Po usunięciu preferencji językowej serwis wróci do domyślnej wersji językowej.",
            "Możesz także zablokować lub ograniczyć cookies analityczne Google w ustawieniach przeglądarki albo za pomocą narzędzi do blokowania skryptów śledzących.",
          ],
        },
        {
          title: "4. Zmiany w polityce cookies",
          paragraphs: [
            "Jeżeli zmieni się zakres wykorzystywanych technologii analitycznych lub marketingowych, zaktualizujemy tę politykę i odpowiednio opiszemy nowe narzędzia.",
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
      metaTitle: "Privacy Policy | NODE48",
      metaDescription: "Information about personal data processing related to the NODE48 brand.",
      title: "Privacy Policy",
      intro:
        "Below we explain what personal data we process through this website, why we process it, what legal bases apply and what rights are available to people who contact us.",
      updatedAt: "March 23, 2026",
      sections: [
        {
          title: "1. Data controller",
          paragraphs: [
            `${siteConfig.dataControllerName}, operating under the ${siteConfig.brandName} brand, is the controller of personal data processed in connection with this website and its contact form.`,
            `For privacy-related matters, you can contact us at ${siteConfig.contactEmail} or by phone at ${siteConfig.businessPhone}.`,
          ],
        },
        {
          title: "2. What data we collect",
          paragraphs: [
            "We process the data you voluntarily provide in the contact form, especially your name, email address and the content of your message.",
            "We also store your language preference in browser storage and may temporarily store a short anti-spam marker after a form attempt to limit automated repeat submissions.",
            "If you use the website with analytics enabled, we may also receive aggregated statistical information about page views, traffic sources, device type, browser and approximate location generated by Google Analytics.",
          ],
        },
        {
          title: "3. Purposes and legal bases",
          paragraphs: [
            "We process form data mainly to reply to your message, prepare a quote, take steps before entering into a contract or continue business correspondence with you.",
            "The legal basis is Article 6(1)(b) GDPR when your request concerns a service or pre-contractual steps taken at your request, and Article 6(1)(f) GDPR, our legitimate interest in handling correspondence and protecting against misuse.",
            "For website analytics, the legal basis is your consent to optional cookies and measurement technologies under Article 6(1)(a) GDPR.",
          ],
        },
        {
          title: "4. Recipients and processors",
          paragraphs: [
            "Your data may be processed by our technical, hosting and email service providers, but only to the extent necessary to operate the website and handle contact requests.",
            "Messages sent through the form are technically routed via FormSubmit, an external form handling tool. Before production use, it is worth confirming that provider's current data processing and transfer terms.",
            "If Google Analytics is active, some statistical data may also be received by Google Ireland Limited and related Google entities responsible for maintaining and operating the analytics service.",
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
      metaTitle: "Cookie Policy | NODE48",
      metaDescription: "Information about cookies, browser storage and Google Analytics used by the NODE48 brand.",
      title: "Cookie Policy",
      intro:
        "This website uses essential technical storage and Google Analytics to measure traffic and understand how the site performs.",
      updatedAt: "March 23, 2026",
      sections: [
        {
          title: "1. What this website uses",
          paragraphs: [
            "The site stores the chosen language in browser storage (localStorage) so that future visits can open in the preferred language.",
            "After a contact form attempt, the site may temporarily store a short anti-spam marker in sessionStorage to slow down very fast, repetitive submissions that look automated.",
            "The site also uses Google Analytics 4 (measurement ID G-TKM0T56TB3), which may place analytics cookies and collect statistical information about how visitors use the website.",
          ],
          items: [
            "Key: node48-locale",
            "Purpose: remember the preferred site language",
            "Scope: value pl / en",
            "Duration: until removed by the user or browser data is cleared",
            "Key: node48-contact-cooldown",
            "Purpose: limit automated repeat contact-form submissions",
            "Scope: timestamp of the latest form attempt",
            "Duration: session-based, until the tab is closed or session data is cleared",
            "Cookie: _ga",
            "Purpose: distinguish users for Google Analytics statistics",
            "Scope: random client identifier",
            "Duration: typically up to 2 years",
            "Cookie: _ga_TKM0T56TB3",
            "Purpose: maintain Google Analytics 4 session state and attribution",
            "Scope: session identifier and measurement parameters",
            "Duration: typically up to 2 years",
          ],
        },
        {
          title: "2. Legal basis for browser storage",
          paragraphs: [
            "Essential storage is used to deliver a function explicitly requested by the user and to provide basic protection against abuse of the contact form.",
            "Google Analytics cookies are used to measure traffic, understand content performance and improve the website.",
          ],
        },
        {
          title: "3. Managing settings",
          paragraphs: [
            "You can remove stored site data at any time in your browser settings or clear localStorage and sessionStorage for this domain. After removal, the site will return to the default language version.",
            "You can also block or limit Google analytics cookies in your browser settings or by using tools that block tracking scripts.",
          ],
        },
        {
          title: "4. Future changes",
          paragraphs: [
            "If the scope of analytics or marketing technologies changes in the future, we will update this policy and describe those tools accordingly.",
          ],
        },
      ],
    },
  },
};
