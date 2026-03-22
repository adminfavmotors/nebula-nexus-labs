const contactEmailUser = ["yrasike", "60"].join("");
const contactEmailDomain = ["gmail", "com"].join(".");
const businessPhoneParts = ["+48", "579", "120", "480"] as const;

export const siteConfig = {
  brandName: "Nebula Nexus Labs",
  businessPhone: businessPhoneParts.join(" "),
  currentYear: 2026,
  contactEmail: `${contactEmailUser}@${contactEmailDomain}`,
} as const;

export const formEndpoint = `https://formsubmit.co/ajax/${siteConfig.contactEmail}`;
