export const siteConfig = {
  brandName: "NODE48",
  siteUrl: "https://node48.pl",
  dataControllerName: "Yury Luzhkouski",
  businessPhone: "+48 788 554 887",
  currentYear: 2026,
  contactEmail: "contact@node48.pl",
  contactCcEmails: ["yl21d@icloud.com"],
} as const;

export const formEndpoint = `https://formsubmit.co/ajax/${siteConfig.contactEmail}`;
