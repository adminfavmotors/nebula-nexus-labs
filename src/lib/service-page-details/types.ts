export type ServicePageFeature = {
  title: string;
  body?: string;
};

export type ServicePageStep = {
  title: string;
  body?: string;
};

export type ServicePageDetail = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLead: string;
  heroCta: string;
  audienceTitle: string;
  audienceIntro: string[];
  audienceBullets: string[];
  deliverablesTitle: string;
  deliverablesItems: ServicePageFeature[];
  processTitle: string;
  processIntro: string[];
  processSteps: ServicePageStep[];
  processDuration: string;
  pricingTitle: string;
  pricingPrice: string;
  pricingBody: string[];
  closingTitle: string;
  closingBody: string[];
  closingPrimaryCta: string;
  closingSecondaryCta?: string;
};
