import type { Locale } from "@/lib/i18n-data";
import { getServiceBySlug, type ServiceKey } from "@/lib/service-pages";
import { companyWebsiteDetail } from "./company-website";
import { corporateWebsiteDetail } from "./corporate-website";
import { landingPageDetail } from "./landing-page";
import { onePageDetail } from "./one-page";
import { redesignDetail } from "./redesign";
import { technicalSupportDetail } from "./technical-support";
import type { ServicePageDetail } from "./types";

const plDetails: Record<ServiceKey, ServicePageDetail> = {
  "one-page": onePageDetail,
  "landing-page": landingPageDetail,
  "company-website": companyWebsiteDetail,
  "corporate-website": corporateWebsiteDetail,
  redesign: redesignDetail,
  "technical-support": technicalSupportDetail,
};

function buildFallbackDetail(locale: Locale, slug: string): ServicePageDetail | null {
  const service = getServiceBySlug(locale, slug);

  if (!service) {
    return null;
  }

  return {
    metaTitle: service.metaTitle,
    metaDescription: service.metaDescription,
    heroTitle: service.heroTitle,
    heroLead: service.heroLead,
    heroCta: locale === "pl" ? "Przejdź do formularza" : "Open contact form",
    audienceTitle: service.idealForTitle,
    audienceIntro: [service.intro],
    audienceBullets: service.idealForItems,
    deliverablesTitle: service.scopeTitle,
    deliverablesItems: service.scopeItems.map((item) => ({ title: item })),
    processTitle: locale === "pl" ? "Jak wygląda współpraca?" : "How the process works",
    processIntro: [],
    processSteps: [
      {
        title: locale === "pl" ? "Brief i zakres" : "Brief and scope",
        body: service.intro,
      },
      {
        title: locale === "pl" ? "Projekt i wdrożenie" : "Design and implementation",
        body: service.scopeItems[0],
      },
      {
        title: locale === "pl" ? "Publikacja" : "Launch",
        body: service.scopeItems[service.scopeItems.length - 1],
      },
    ],
    processDuration: locale === "pl" ? "Termin ustalamy po krótkiej rozmowie o zakresie." : "Timeline is confirmed after a short scope discussion.",
    pricingTitle: service.pricingTitle,
    pricingPrice: service.priceFrom,
    pricingBody: service.pricingItems,
    closingTitle:
      locale === "pl"
        ? "Napisz do mnie i sprawdźmy, czy ta usługa jest dobrym wyborem dla Twojej firmy."
        : "Get in touch and let’s check whether this service is the right fit for your business.",
    closingBody: [
      locale === "pl"
        ? "Po krótkiej rozmowie dostaniesz jasny zakres i konkretną wycenę."
        : "After a short conversation you will get a clear scope and a specific estimate.",
    ],
    closingPrimaryCta: locale === "pl" ? "Zamów wycenę" : "Request a quote",
  };
}

export function getServicePageDetail(locale: Locale, slug: string): ServicePageDetail | null {
  const service = getServiceBySlug(locale, slug);

  if (!service) {
    return null;
  }

  if (locale === "pl") {
    return plDetails[service.key] ?? buildFallbackDetail(locale, slug);
  }

  return buildFallbackDetail(locale, slug);
}
