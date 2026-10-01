import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import Hero from "@/components/Hero";
import PortfolioCaseCard from "@/components/portfolio/PortfolioCaseCard";
import { loadGoogleTagManager } from "@/lib/analytics";
import { I18nContext } from "@/lib/i18n-context";
import { translations, type Locale } from "@/lib/i18n-data";
import { getProjectCases } from "@/lib/project-cases";
import { createSeoHeadMarkup, createSeoSnapshot } from "@/lib/seo";

vi.mock("@/lib/analytics", () => ({ loadGoogleTagManager: vi.fn() }));

const CONSENT_KEY = "node48-cookie-consent";

function withLocale(children: React.ReactNode, locale: Locale = "pl") {
  return (
    <I18nContext.Provider value={{ locale, setLocale: () => undefined, isTransitioningLocale: false, t: translations[locale] }}>
      <StaticRouter location={locale === "en" ? "/en" : "/"}>{children}</StaticRouter>
    </I18nContext.Provider>
  );
}

describe("prerender hydration and runtime compatibility", () => {
  let root: Root | undefined;
  let container: HTMLDivElement | undefined;

  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(loadGoogleTagManager).mockClear();
  });

  afterEach(() => {
    if (root) act(() => root!.unmount());
    root = undefined;
    container?.remove();
    container = undefined;
    cleanup();
    document.documentElement.style.removeProperty("--cookie-banner-offset");
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it.each((["pl", "en"] as const).flatMap((locale) =>
    [null, "denied", "granted", "unknown", "invalid"].map((consent) => ({ locale, consent })),
  ))("hydrates $locale with saved consent $consent without replacing HTML", async ({ locale, consent }) => {
    const tree = withLocale(<><p>Stable prerendered content</p><CookieConsentBanner /></>, locale);
    // Generate real server markup, where browser storage cannot be read.
    vi.stubGlobal("window", undefined);
    const html = renderToString(tree);
    vi.unstubAllGlobals();
    if (consent !== null) window.localStorage.setItem(CONSENT_KEY, consent);
    container = document.createElement("div");
    container.innerHTML = html;
    document.body.append(container);
    const originalContent = container.querySelector("p");
    expect(container.querySelector(".cookie-consent-layer")).toBeNull();
    expect(loadGoogleTagManager).not.toHaveBeenCalled();
    const recoverableError = vi.fn();
    const consoleError = vi.spyOn(console, "error");

    await act(async () => { root = hydrateRoot(container!, tree, { onRecoverableError: recoverableError }); });

    expect(recoverableError).not.toHaveBeenCalled();
    expect(consoleError).not.toHaveBeenCalled();
    expect(container.querySelector("p")).toBe(originalContent);
    const hasChoice = consent === "granted" || consent === "denied";
    expect(Boolean(container.querySelector(".cookie-consent-layer"))).toBe(!hasChoice);
    expect(loadGoogleTagManager).toHaveBeenCalledTimes(consent === "granted" ? 1 : 0);
    if (!hasChoice) expect(screen.getByRole("button", { name: locale === "en" ? "Decline" : "Odrzucam" })).toBeInTheDocument();
  });

  it.each(["granted", "denied"] as const)("respects a new %s choice when storage is unavailable", (choice) => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new DOMException("Denied", "SecurityError"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new DOMException("Denied", "SecurityError"); });
    render(withLocale(<CookieConsentBanner />));
    expect(loadGoogleTagManager).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: choice === "granted" ? "Akceptuję" : "Odrzucam" }));
    expect(document.querySelector(".cookie-consent-layer")).toBeNull();
    expect(loadGoogleTagManager).toHaveBeenCalledTimes(choice === "granted" ? 1 : 0);
  });

  it("measures the banner after intro blocking ends and cleans up the offset", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ height: 120 } as DOMRect);
    const view = render(withLocale(<CookieConsentBanner isBlocked />));
    expect(document.documentElement.style.getPropertyValue("--cookie-banner-offset")).toBe("0px");
    view.rerender(withLocale(<CookieConsentBanner isBlocked={false} />));
    expect(document.documentElement.style.getPropertyValue("--cookie-banner-offset")).toBe("136px");
    fireEvent.click(screen.getByRole("button", { name: "Odrzucam" }));
    expect(document.documentElement.style.getPropertyValue("--cookie-banner-offset")).toBe("0px");
    view.unmount();
    expect(document.documentElement.style.getPropertyValue("--cookie-banner-offset")).toBe("0px");
  });

  it("renders image priorities without React 18 unknown-property warnings", () => {
    const consoleError = vi.spyOn(console, "error");
    const item = getProjectCases("pl")[0];
    const view = render(withLocale(<><Hero /><PortfolioCaseCard item={item} openLabel="Open" shouldPreload /></>));
    expect(document.querySelector(".hero-visual-image")).toHaveAttribute("fetchpriority", "high");
    expect(document.querySelector(".portfolio-card__image")).toHaveAttribute("fetchpriority", "high");
    view.rerender(withLocale(<PortfolioCaseCard item={item} openLabel="Open" />));
    expect(document.querySelector(".portfolio-card__image")).toHaveAttribute("fetchpriority", "low");
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("preserves repeated SEO characters and prevents attribute or JSON-LD breakout", () => {
    const title = "A & B & C <header> <footer>";
    const description = '" onmouseover="bad & <img> " <img>';
    const schema = { text: '</script><script>alert("bad")</script><script>again</script>' };
    const id = 'one" two" <script>';
    const head = new DOMParser().parseFromString(createSeoHeadMarkup(createSeoSnapshot({ title, description, path: "/", structuredData: [{ id, schema }] })), "text/html").head;
    expect(head.querySelector("title")?.textContent).toBe(title);
    expect(head.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(description);
    expect(head.querySelector("[onmouseover], img")).toBeNull();
    const scripts = head.querySelectorAll("script");
    expect(scripts).toHaveLength(1);
    expect(scripts[0].getAttribute("data-structured-data-id")).toBe(id);
    expect(scripts[0].textContent).not.toContain("<");
    expect(JSON.parse(scripts[0].textContent!)).toEqual(schema);
  });
});
