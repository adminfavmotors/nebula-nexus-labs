export const siteConfig = {
  brandName: "NODE48",
  dataControllerName: "Yury Luzhkouski",
  businessPhone: "+48 788 554 887",
  currentYear: 2026,
  contactEmail: "contact@node48.pl",
} as const;

export const formEndpoint = `https://formsubmit.co/ajax/${siteConfig.contactEmail}`;
