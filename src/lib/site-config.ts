export const siteConfig = {
  brandName: "Nebula Nexus Labs",
  businessPhone: "+48 579 120 480",
  currentYear: 2026,
  formRecipient: "yrasike60@gmail.com",
} as const;

export const formEndpoint = `https://formsubmit.co/ajax/${siteConfig.formRecipient}`;
