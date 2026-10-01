import type { Locale } from "@/lib/i18n-data";
import { getServiceBySlug, type ServiceKey } from "@/lib/service-pages";
import { companyWebsiteDetail } from "./company-website";
import { corporateWebsiteDetail } from "./corporate-website";
import { landingPageDetail } from "./landing-page";
import { onePageDetail } from "./one-page";
import { redesignDetail } from "./redesign";
import { technicalSupportDetail } from "./technical-support";
import type { LocalizedServicePageDetail, ServicePageDetail } from "./types";

const details: Record<ServiceKey, LocalizedServicePageDetail> = {
  "one-page": onePageDetail,
  "landing-page": landingPageDetail,
  "company-website": companyWebsiteDetail,
  "corporate-website": corporateWebsiteDetail,
  redesign: redesignDetail,
  "technical-support": technicalSupportDetail,
};

export function getServicePageDetail(locale: Locale, slug: string): ServicePageDetail | null {
  const service = getServiceBySlug(locale, slug);

  if (!service) {
    return null;
  }

  return details[service.key][locale];
}
