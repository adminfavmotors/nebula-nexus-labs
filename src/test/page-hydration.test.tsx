import { act, cleanup, waitFor } from "@testing-library/react";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { hydrateRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import { BRAND_INTRO_STORAGE_KEY } from "@/lib/use-brand-intro";
import { getServicePageDetail } from "@/lib/service-page-details";
import { getCanonicalServiceSlugs } from "@/lib/service-catalog";
import { getLocalizedServicePath } from "@/lib/locale-routes";

vi.mock("@/lib/analytics", () => ({ loadGoogleTagManager: vi.fn() }));

const paths = ["/", "/en", "/uslugi/strona-firmowa", "/en/uslugi/strona-firmowa", "/privacy-policy", "/en/cookie-policy", "/404"];
for (const locale of ["pl", "en"] as const) {
  for (const slug of getCanonicalServiceSlugs()) {
    const path = getLocalizedServicePath(locale, slug);
    if (!paths.includes(path)) paths.push(path);
  }
}

describe("complete page hydration", () => {
  let root: Root | undefined;
  let container: HTMLDivElement | undefined;
  let serverMarkup: Record<string, string>;

  beforeAll(async () => {
    // SSR and the browser have separate React instances in production. Keep that
    // boundary here too, including lazy imports and Vite's actual SSR loader.
    const script = `
      import { createServer } from 'vite';
      const server = await createServer({ logLevel: 'silent', appType: 'custom', server: { middlewareMode: true } });
      try {
        const { renderPrerenderedRoute } = await server.ssrLoadModule('/src/prerender/render-app.tsx');
        const markup = {};
        for (const path of ${JSON.stringify(paths)}) markup[path] = await renderPrerenderedRoute(path);
        process.stdout.write(JSON.stringify(markup));
      } finally { await server.close(); }
    `;
    const { stdout } = await promisify(execFile)(process.execPath, ["--input-type=module", "--eval", script], { timeout: 30_000, maxBuffer: 2_000_000 });
    serverMarkup = JSON.parse(stdout) as Record<string, string>;
  }, 35_000);

  beforeEach(() => {
    window.localStorage.clear();
    document.title = "";
    window.sessionStorage.clear();
    window.sessionStorage.setItem(BRAND_INTRO_STORAGE_KEY, "1");
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
    vi.stubGlobal("ResizeObserver", class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    });
  });

  afterEach(() => {
    if (root) act(() => root!.unmount());
    root = undefined;
    container?.remove();
    container = undefined;
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it.each([
    ...paths.flatMap((path) =>
      [null, "denied", "granted"].map((consent) => ({ path, consent, hash: "" })),
    ),
    ...paths.slice(0, 4).map((path) => ({ path, consent: "denied", hash: "#%E0%A4%A" })),
  ])("keeps the $path$hash page and its form with consent $consent", async ({ path, consent, hash }) => {
    const html = serverMarkup[path];
    window.history.replaceState({}, "", `${path}${hash}`);
    if (consent !== null) window.localStorage.setItem("node48-cookie-consent", consent);
    container = document.createElement("div");
    container.innerHTML = html;
    document.body.append(container);
    const shell = container.querySelector(".app-shell");
    const heading = container.querySelector("h1");
    const name = container.querySelector<HTMLInputElement>("#section-contact-name");
    if (name) {
      name.value = "Autofilled before JavaScript";
      expect(name.form).toHaveAttribute("method", "post");
      expect(name.form?.querySelector('button[type="submit"]')).toBeDisabled();
      expect(name.form?.querySelector('a[href="mailto:contact@node48.pl"]')).not.toBeNull();
    }
    expect(heading).not.toBeNull();
    if (path.includes("/uslugi/")) {
      const slug = path.split("/").pop()!;
      const detail = getServicePageDetail(path.startsWith("/en/") ? "en" : "pl", slug)!;
      expect(heading?.textContent).toBe(detail.heroTitle);
      expect(container.querySelectorAll(".service-page-deliverable-card")).toHaveLength(detail.deliverablesItems.length);
      expect(container.querySelectorAll(".service-page-step-card")).toHaveLength(detail.processSteps.length);
      for (const text of [detail.processDuration, detail.pricingPrice, ...detail.deliverablesItems.map((item) => item.body!), ...detail.processSteps.map((step) => step.body!)]) {
        expect(container.textContent).toContain(text);
      }
    }
    expect(html).not.toContain("<!--$!-->");
    expect(html).not.toContain("projects-fallback");
    const recoverableError = vi.fn();
    const consoleError = vi.spyOn(console, "error");

    await act(async () => { root = hydrateRoot(container!, <App />, { onRecoverableError: recoverableError }); });
    // Lazy route boundaries hydrate later than the outer shell. Wait for the
    // route's SEO effect and form activation before asserting no replacements.
    await waitFor(() => { expect(document.title).not.toBe(""); });
    if (name) await waitFor(() => { expect(name.form?.querySelector('button[type="submit"]')).toBeEnabled(); });

    expect(recoverableError).not.toHaveBeenCalled();
    expect(consoleError).not.toHaveBeenCalled();
    expect(container.querySelector(".app-shell")).toBe(shell);
    expect(container.querySelector("h1")).toBe(heading);
    if (name) {
      expect(container.querySelector("#section-contact-name")).toBe(name);
      expect(name.value).toBe("Autofilled before JavaScript");
      expect(name.form?.querySelector('button[type="submit"]')).toBeEnabled();
    }
  });
});
