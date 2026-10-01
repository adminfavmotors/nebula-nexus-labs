import { describe, expect, it } from "vitest";
import { getServicePageDetail } from "@/lib/service-page-details";
import { serviceCatalogEntries } from "@/lib/service-catalog";
import { getServicePageSeo } from "@/lib/seo-routes";

describe("complete service translations", () => {
  it.each(serviceCatalogEntries)("keeps the full $key offer in both languages", ({ slug }) => {
    const pl = getServicePageDetail("pl", slug)!;
    const en = getServicePageDetail("en", slug)!;
    expect(en.deliverablesItems).toHaveLength(pl.deliverablesItems.length);
    expect(en.processSteps).toHaveLength(pl.processSteps.length);
    for (const field of ["audienceIntro", "audienceBullets", "processIntro", "pricingBody", "closingBody"] as const) {
      expect(en[field]).toHaveLength(pl[field].length);
      expect(en[field].every((text) => text.trim().length > 0)).toBe(true);
    }
    for (const item of [...en.deliverablesItems, ...en.processSteps]) {
      expect(item.title.trim()).not.toBe("");
      expect(item.body?.trim()).toBeTruthy();
    }
    expect(Boolean(en.closingSecondaryCta)).toBe(Boolean(pl.closingSecondaryCta));
    expect(en.processDuration.match(/\d+/g)).toEqual(pl.processDuration.match(/\d+/g));
    expect(en.pricingPrice.replace(/\D/g, "")).toBe(pl.pricingPrice.replace(/\D/g, ""));
    if (pl.pricingPrice.includes("netto")) expect(en.pricingPrice).toMatch(/\bnet\b/i);
    if (pl.pricingPrice.includes("miesiąc")) expect(en.pricingPrice).toMatch(/month/i);
    expect(en.processDuration).not.toContain("short scope discussion");
  });

  it.each([
    { slug: "strona-wizytowka", lastStep: /online|internet/i },
    { slug: "landing-page", lastStep: /ads|campaigns/i },
    { slug: "strona-firmowa", lastStep: /work.*you/i },
    { slug: "strona-premium-dla-wymagajacych-firm", lastStep: /devices.*control/i },
    { slug: "redesign-strony", lastStep: /old.*new.*online/i },
    { slug: "opieka-techniczna", lastStep: /priority/i },
  ])("describes the actual final stage for $slug", ({ slug, lastStep }) => {
    const steps = getServicePageDetail("en", slug)!.processSteps;
    expect(steps[steps.length - 1]?.body).toMatch(lastStep);
  });

  it.each(serviceCatalogEntries)("uses the same $key detail for aliases and SEO", ({ slug, aliases }) => {
    for (const locale of ["pl", "en"] as const) {
      const detail = getServicePageDetail(locale, slug)!;
      const seo = getServicePageSeo(locale, slug)!;
      expect(seo.title).toBe(detail.metaTitle);
      expect(seo.description).toBe(detail.metaDescription);
      for (const alias of aliases ?? []) {
        expect(getServicePageDetail(locale, alias)).toEqual(detail);
        expect(getServicePageSeo(locale, alias)?.path).toBe(seo.path);
      }
    }
  });

  it("keeps unknown services outside the offer", () => {
    for (const locale of ["pl", "en"] as const) {
      expect(getServicePageDetail(locale, "unknown-service")).toBeNull();
      expect(getServicePageSeo(locale, "unknown-service")).toBeNull();
    }
  });
});
