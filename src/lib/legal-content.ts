import { businessPhone, contactEmail, dataControllerName } from "@/lib/contact-config";
import type { Locale } from "@/lib/i18n-data";
import { brandName } from "@/lib/site-identity";

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
    privacy: {
      metaTitle: "Polityka prywatnosci | NODE48",
      metaDescription: "Informacje o przetwarzaniu danych osobowych zwiazanych z marka NODE48.",
      title: "Polityka prywatnosci",
      intro:
        "Ponizej opisujemy, jakie dane osobowe przetwarzamy w ramach tej strony, w jakich celach, na jakiej podstawie oraz jakie prawa przysluguja osobom kontaktujacym sie z nami.",
      updatedAt: "16 kwietnia 2026",
      sections: [
        {
          title: "1. Administrator danych",
          paragraphs: [
            `${dataControllerName}, dzialajacy pod marka ${brandName}, jest administratorem danych osobowych przetwarzanych w zwiazku z korzystaniem z tej strony i formularza kontaktowego.`,
            `W sprawach dotyczacych prywatnosci mozesz skontaktowac sie z nami pod adresem ${contactEmail} lub telefonicznie: ${businessPhone}.`,
          ],
        },
        {
          title: "2. Jakie dane zbieramy",
          paragraphs: [
            "Przetwarzamy dane, ktore podajesz dobrowolnie w formularzu kontaktowym, w szczegolnosci imie i nazwisko, adres e-mail oraz tresc wiadomosci.",
            "Technicznie zapisujemy rowniez preferencje jezyka strony w pamieci przegladarki, a po probie wyslania formularza mozemy tymczasowo zapisac krotki znacznik antyspamowy ograniczajacy automatyczne ponowne zgloszenia.",
            "Jezeli korzystasz ze strony z wlaczonymi skryptami analitycznymi, mozemy rowniez otrzymywac zagregowane informacje statystyczne o odslonach, zrodlach ruchu, urzadzeniu, przegladarce i przyblizonej lokalizacji generowane przez Google Analytics.",
          ],
        },
        {
          title: "3. Cele i podstawy prawne",
          paragraphs: [
            "Dane z formularza przetwarzamy przede wszystkim w celu odpowiedzi na Twoja wiadomosc, przygotowania wyceny, podjecia dzialan przed zawarciem umowy albo prowadzenia dalszej korespondencji biznesowej.",
            "Podstawa prawna przetwarzania jest art. 6 ust. 1 lit. b RODO, gdy kontakt dotyczy uslugi lub dzialan przedumownych podejmowanych na Twoje zadanie, oraz art. 6 ust. 1 lit. f RODO, czyli nasz prawnie uzasadniony interes polegajacy na obsludze korespondencji i ochronie przed naduzyciami.",
            "W zakresie analityki internetowej podstawa przetwarzania jest Twoja zgoda na opcjonalne pliki cookies i technologie pomiarowe zgodnie z art. 6 ust. 1 lit. a RODO.",
          ],
        },
        {
          title: "4. Odbiorcy danych i podmioty przetwarzajace",
          paragraphs: [
            "Z danych moga korzystac nasi dostawcy uslug technicznych, hostingowych i pocztowych, wylacznie w zakresie niezbednym do dzialania strony i obslugi kontaktu.",
            "Wiadomosci wysylane przez formularz sa technicznie przekazywane przez zewnetrznego operatora FormSubmit, ktory dziala jako narzedzie do obslugi formularzy.",
            "Jezeli korzystamy z Google Analytics, odbiorca czesci danych statystycznych moze byc rowniez Google Ireland Limited oraz podmioty powiazane z Google odpowiedzialne za utrzymanie i rozwoj uslugi analitycznej.",
          ],
        },
        {
          title: "5. Okres przechowywania",
          paragraphs: [
            "Dane z korespondencji przechowujemy przez czas potrzebny do obslugi sprawy, a nastepnie do czasu przedawnienia ewentualnych roszczen lub do chwili, gdy dalsze przechowywanie przestanie byc uzasadnione.",
            "Jezeli kontakt doprowadzi do zawarcia umowy, dane moga byc przechowywane dluzej w zakresie wymaganym przez przepisy prawa lub potrzebnym do realizacji wspolpracy.",
          ],
        },
        {
          title: "6. Twoje prawa",
          paragraphs: [
            "Masz prawo zadac dostepu do danych, ich sprostowania, usuniecia, ograniczenia przetwarzania, przeniesienia danych oraz wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie.",
            "Jezeli uznasz, ze przetwarzanie narusza przepisy, masz rowniez prawo zlozyc skarge do Prezesa Urzedu Ochrony Danych Osobowych.",
          ],
        },
        {
          title: "7. Dobrowolnosc podania danych",
          paragraphs: [
            "Podanie danych w formularzu jest dobrowolne, ale bez podstawowych danych kontaktowych nie bedziemy w stanie odpowiedziec na wiadomosc ani przygotowac odpowiedzi na zapytanie.",
          ],
        },
        {
          title: "8. Zautomatyzowane decyzje",
          paragraphs: [
            "Dane przesylane przez formularz nie sluza do podejmowania wobec Ciebie zautomatyzowanych decyzji ani do profilowania w rozumieniu RODO.",
          ],
        },
      ],
    },
    cookies: {
      metaTitle: "Polityka cookies | NODE48",
      metaDescription: "Informacje o cookies, pamieci przegladarki i Google Analytics wykorzystywanych przez marke NODE48.",
      title: "Polityka cookies",
      intro: "Ta strona korzysta z niezbednych mechanizmow technicznych oraz z Google Analytics do analizy ruchu i dzialania serwisu.",
      updatedAt: "16 kwietnia 2026",
      sections: [
        {
          title: "1. Czego uzywa ta strona",
          paragraphs: [
            "Serwis zapisuje preferencje jezyka w pamieci przegladarki (localStorage), aby po ponownej wizycie od razu wyswietlic wybrana wersje jezykowa.",
            "Po probie wyslania formularza kontaktowego strona moze tymczasowo zapisac w sessionStorage krotki znacznik antyspamowy ograniczajacy bardzo szybkie, powtarzalne zgloszenia wygladajace na automatyczne.",
            "Strona korzysta rowniez z Google Analytics 4 (identyfikator pomiaru G-TKM0T56TB3), ktore moze zapisywac analityczne pliki cookies i zbierac informacje statystyczne o korzystaniu z serwisu.",
          ],
          items: [
            "Klucz: node48-locale",
            "Cel: zapamietanie preferowanego jezyka strony",
            "Zakres: wartosc pl / en",
            "Czas dzialania: do momentu usuniecia przez uzytkownika lub wyczyszczenia danych przegladarki",
            "Klucz: node48-contact-cooldown",
            "Cel: ograniczenie automatycznych, seryjnych wysylek formularza",
            "Zakres: znacznik czasu ostatniej proby wyslania formularza",
            "Czas dzialania: sesyjnie, do zamkniecia karty lub wyczyszczenia danych sesji",
            "Cookie: _ga",
            "Cel: rozroznianie uzytkownikow na potrzeby statystyk Google Analytics",
            "Zakres: losowy identyfikator klienta",
            "Czas dzialania: zwykle do 2 lat",
            "Cookie: _ga_TKM0T56TB3",
            "Cel: utrzymanie stanu sesji i atrybucji pomiaru Google Analytics 4",
            "Zakres: identyfikator sesji i parametry pomiarowe",
            "Czas dzialania: zwykle do 2 lat",
          ],
        },
        {
          title: "2. Podstawa korzystania z pamieci przegladarki",
          paragraphs: [
            "Niezbedne zapisy sluza realizacji funkcji wybranej przez uzytkownika oraz podstawowym zabezpieczeniom serwisu przed naduzyciami formularza kontaktowego.",
            "Analityczne pliki cookies Google Analytics sluza mierzeniu ruchu, ocenie skutecznosci tresci i ulepszaniu serwisu.",
          ],
        },
        {
          title: "3. Zarzadzanie ustawieniami",
          paragraphs: [
            "W kazdej chwili mozesz usunac zapisane dane strony w ustawieniach przegladarki albo wyczyscic localStorage i sessionStorage dla tej domeny. Po usunieciu preferencji jezykowej serwis wroci do domyslnej wersji jezykowej.",
            "Mozesz takze zablokowac lub ograniczyc cookies analityczne Google w ustawieniach przegladarki albo za pomoca narzedzi do blokowania skryptow sledzacych.",
          ],
        },
        {
          title: "4. Zmiany w polityce cookies",
          paragraphs: [
            "Jezeli zmieni sie zakres wykorzystywanych technologii analitycznych lub marketingowych, zaktualizujemy te polityke i odpowiednio opiszemy nowe narzedzia.",
          ],
        },
      ],
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
    privacy: {
      metaTitle: "Privacy Policy | NODE48",
      metaDescription: "Information about personal data processing related to the NODE48 brand.",
      title: "Privacy Policy",
      intro:
        "Below we explain what personal data we process through this website, why we process it, what legal bases apply and what rights are available to people who contact us.",
      updatedAt: "April 16, 2026",
      sections: [
        {
          title: "1. Data controller",
          paragraphs: [
            `${dataControllerName}, operating under the ${brandName} brand, is the controller of personal data processed in connection with this website and its contact form.`,
            `For privacy-related matters, you can contact us at ${contactEmail} or by phone at ${businessPhone}.`,
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
            "Messages sent through the form are technically routed via FormSubmit, an external form handling tool.",
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
      intro: "This website uses essential technical storage and Google Analytics to measure traffic and understand how the site performs.",
      updatedAt: "April 16, 2026",
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
