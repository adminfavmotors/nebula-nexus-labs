import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BrandIntroOverlay from "@/components/BrandIntroOverlay";
import ContactForm from "@/components/ContactForm";
import { ContactOverlayProvider } from "@/components/contact/ContactOverlay";
import { useContactOverlay } from "@/components/contact/contact-overlay-context";
import App from "@/App";
import { I18nProvider } from "@/lib/i18n";
import { brandIntroMotionTimings } from "@/lib/motion";
import { formEndpoint } from "@/lib/contact-config";
import { BRAND_INTRO_STORAGE_KEY, useBrandIntro } from "@/lib/use-brand-intro";

const COOKIE_CONSENT_KEY = "node48-cookie-consent";
const BRAND_INTRO_DIALOG_NAME = /node48.*intro|intro.*node48/i;
const ROUTER_FUTURE_FLAGS = {
  v7_relativeSplatPath: true,
  v7_startTransition: true,
} as const;

function renderWithI18n(component: React.ReactElement) {
  return render(<I18nProvider>{component}</I18nProvider>);
}

function renderApp() {
  return render(<App />);
}

function ContactOverlayScrollLockHarness() {
  const { overlayPhase } = useBrandIntro("/");
  const { openContactOverlay } = useContactOverlay();

  return (
    <>
      {overlayPhase ? <BrandIntroOverlay phase={overlayPhase} /> : null}
      <button type="button" onClick={openContactOverlay}>
        Open contact overlay
      </button>
    </>
  );
}

function renderContactOverlayScrollLockHarness() {
  return render(
    <I18nProvider>
      <BrowserRouter future={ROUTER_FUTURE_FLAGS}>
        <ContactOverlayProvider>
          <ContactOverlayScrollLockHarness />
        </ContactOverlayProvider>
      </BrowserRouter>
    </I18nProvider>,
  );
}

function setScrollPosition(value: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value,
    writable: true,
  });
}

function removeAnalyticsArtifacts() {
  document.getElementById("node48-gtm-script")?.remove();
  document.getElementById("node48-gtm-noscript")?.remove();
}

function resetDocumentFonts() {
  Object.defineProperty(document, "fonts", {
    configurable: true,
    writable: true,
    value: {
      ready: Promise.resolve(undefined),
      load: () => Promise.resolve([]),
      check: () => true,
    },
  });
}

function createDeferredPromise<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  const promise = new Promise<T>((nextResolve) => {
    resolve = nextResolve;
  });

  return { promise, resolve };
}

function finishBrandIntro() {
  act(() => {
    vi.advanceTimersByTime(brandIntroMotionTimings.totalDurationMs);
  });
}

describe("critical user flows", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem(BRAND_INTRO_STORAGE_KEY, "1");
    resetDocumentFonts();
    removeAnalyticsArtifacts();
    document.head.innerHTML = '<meta name="description" content="" />';
    vi.stubGlobal(
      "ResizeObserver",
      class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    if (typeof HTMLDialogElement !== "undefined") {
      HTMLDialogElement.prototype.showModal ??= function showModal() {
        this.setAttribute("open", "");
      };
      HTMLDialogElement.prototype.close ??= function close() {
        this.removeAttribute("open");
        this.dispatchEvent(new Event("close"));
      };
    }
    window.scrollTo = vi.fn();
    setScrollPosition(0);
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    removeAnalyticsArtifacts();
    document.documentElement.style.removeProperty("--cookie-banner-offset");
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders the homepage intro immediately and makes the app shell inert", () => {
    window.sessionStorage.removeItem(BRAND_INTRO_STORAGE_KEY);

    renderApp();

    const introDialog = screen.getByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME });
    const appShell = document.querySelector(".app-shell");

    expect(introDialog).toBeInTheDocument();
    expect(introDialog).toHaveFocus();
    expect(appShell).toHaveAttribute("aria-hidden", "true");
    expect(appShell).toHaveAttribute("inert");
  });

  it("waits for the wordmark font before starting the homepage intro timers", async () => {
    vi.useFakeTimers();
    window.sessionStorage.removeItem(BRAND_INTRO_STORAGE_KEY);
    const loadDeferred = createDeferredPromise<unknown[]>();
    const readyDeferred = createDeferredPromise<unknown>();

    Object.defineProperty(document, "fonts", {
      configurable: true,
      writable: true,
      value: {
        ready: readyDeferred.promise,
        load: () => loadDeferred.promise,
        check: () => false,
      },
    });

    renderApp();

    act(() => {
      vi.advanceTimersByTime(brandIntroMotionTimings.totalDurationMs);
    });

    expect(screen.getByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).toBeInTheDocument();

    await act(async () => {
      loadDeferred.resolve([]);
      readyDeferred.resolve(undefined);
      await Promise.resolve();
    });

    act(() => {
      vi.advanceTimersByTime(brandIntroMotionTimings.totalDurationMs);
    });

    expect(screen.queryByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).not.toBeInTheDocument();
  });

  it("falls back to starting the homepage intro when font readiness takes too long", async () => {
    vi.useFakeTimers();
    window.sessionStorage.removeItem(BRAND_INTRO_STORAGE_KEY);
    const never = new Promise<unknown>(() => {});

    Object.defineProperty(document, "fonts", {
      configurable: true,
      writable: true,
      value: {
        ready: never,
        load: () => never,
        check: () => false,
      },
    });

    renderApp();

    act(() => {
      vi.advanceTimersByTime(brandIntroMotionTimings.totalDurationMs);
    });

    expect(screen.getByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(brandIntroMotionTimings.fontReadyTimeoutMs);
      await Promise.resolve();
    });

    act(() => {
      vi.advanceTimersByTime(brandIntroMotionTimings.totalDurationMs);
    });

    expect(screen.queryByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).not.toBeInTheDocument();
  });

  it("restores app shell access after the homepage intro finishes", () => {
    vi.useFakeTimers();
    window.sessionStorage.removeItem(BRAND_INTRO_STORAGE_KEY);

    renderApp();

    const appShell = document.querySelector(".app-shell");
    expect(appShell).toHaveAttribute("inert");

    act(() => {
      vi.advanceTimersByTime(brandIntroMotionTimings.totalDurationMs);
    });

    expect(screen.queryByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).not.toBeInTheDocument();
    expect(appShell).not.toHaveAttribute("aria-hidden");
    expect(appShell).not.toHaveAttribute("inert");
  });

  it("skips the homepage intro when reduced motion is preferred", () => {
    window.sessionStorage.removeItem(BRAND_INTRO_STORAGE_KEY);
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      })),
    );

    renderApp();

    const appShell = document.querySelector(".app-shell");

    expect(screen.queryByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).not.toBeInTheDocument();
    expect(appShell).not.toHaveAttribute("aria-hidden");
    expect(appShell).not.toHaveAttribute("inert");
  });

  it("shows the homepage intro only on the root route", () => {
    window.history.pushState({}, "", "/uslugi/strona-wizytowka");
    window.sessionStorage.removeItem(BRAND_INTRO_STORAGE_KEY);

    renderApp();

    const appShell = document.querySelector(".app-shell");

    expect(screen.queryByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).not.toBeInTheDocument();
    expect(appShell).not.toHaveAttribute("aria-hidden");
    expect(appShell).not.toHaveAttribute("inert");
  });

  it("does not replay the homepage intro within the same session", () => {
    vi.useFakeTimers();
    window.sessionStorage.removeItem(BRAND_INTRO_STORAGE_KEY);

    const firstRender = renderApp();

    expect(screen.getByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).toBeInTheDocument();

    finishBrandIntro();

    expect(window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY)).toBe("1");

    firstRender.unmount();
    renderApp();

    expect(screen.queryByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).not.toBeInTheDocument();
  });

  it("keeps the cookie consent banner inert while the homepage intro is active", () => {
    vi.useFakeTimers();
    window.localStorage.removeItem(COOKIE_CONSENT_KEY);
    window.sessionStorage.removeItem(BRAND_INTRO_STORAGE_KEY);

    renderApp();

    const cookieBanner = document.querySelector(".cookie-consent-layer");

    expect(screen.getByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).toBeInTheDocument();
    expect(cookieBanner).toHaveAttribute("aria-hidden", "true");
    expect(cookieBanner).toHaveAttribute("inert");

    finishBrandIntro();

    expect(screen.queryByRole("dialog", { name: BRAND_INTRO_DIALOG_NAME })).not.toBeInTheDocument();
    expect(cookieBanner).not.toHaveAttribute("aria-hidden");
    expect(cookieBanner).not.toHaveAttribute("inert");
  });

  it("keeps scroll locking correct when the contact overlay opens after the homepage intro", async () => {
    vi.useFakeTimers();
    window.localStorage.removeItem(COOKIE_CONSENT_KEY);
    window.sessionStorage.removeItem(BRAND_INTRO_STORAGE_KEY);

    renderContactOverlayScrollLockHarness();

    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");

    finishBrandIntro();
    vi.useRealTimers();

    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");

    fireEvent.click(screen.getByRole("button", { name: /open contact overlay/i }));

    await waitFor(() => {
      expect(document.querySelector(".contact-overlay-root-open")).toBeInstanceOf(HTMLDivElement);
      expect(document.querySelector(".contact-overlay-panel-open")).toBeInstanceOf(HTMLDivElement);
      expect(document.documentElement.style.overflow).toBe("hidden");
      expect(document.body.style.overflow).toBe("hidden");
    });

    fireEvent.click(screen.getAllByRole("button", { name: /zamknij okno kontaktowe|close contact dialog/i })[0]);

    await waitFor(() => {
      expect(document.querySelector(".contact-overlay-root-open")).toBeNull();
      expect(document.querySelector(".contact-overlay-panel-open")).toBeNull();
      expect(document.documentElement.style.overflow).toBe("");
      expect(document.body.style.overflow).toBe("");
    });
  });

  it("uses Polish by default and switches to English", async () => {
    renderApp();

    expect(screen.getAllByRole("link", { name: /us/i }).length).toBeGreaterThan(0);
    expect(document.documentElement.lang).toBe("pl");

    fireEvent.click(screen.getByRole("button", { name: "en" }));

    await waitFor(() => {
      expect(document.documentElement.lang).toBe("en");
      expect(window.localStorage.getItem("node48-locale")).toBe("en");
    });

    expect(screen.getAllByRole("link", { name: /services/i }).length).toBeGreaterThan(0);
  });

  it("updates document metadata when locale changes", async () => {
    renderApp();

    fireEvent.click(screen.getByRole("button", { name: "en" }));

    await waitFor(() => {
      expect(document.title).toContain("Websites and digital products");
    });

    const description = document.querySelector('meta[name="description"]');
    expect(description?.getAttribute("content")).toContain("digital experiences");
  });

  it("loads analytics only after cookie consent is accepted", async () => {
    renderApp();

    expect(document.getElementById("node48-gtm-script")).toBeNull();
    expect(window.localStorage.getItem(COOKIE_CONSENT_KEY)).toBeNull();
    expect(screen.getByText(/Ładujemy Google Tag Manager/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Akceptuję" }));

    await waitFor(() => {
      expect(document.getElementById("node48-gtm-script")).toBeInstanceOf(HTMLScriptElement);
    });

    expect(window.localStorage.getItem(COOKIE_CONSENT_KEY)).toBe("granted");
    expect(document.getElementById("node48-gtm-noscript")).toBeInstanceOf(HTMLElement);
    expect(document.documentElement.style.getPropertyValue("--cookie-banner-offset")).toBe("0px");
  });

  it("keeps analytics disabled when cookie consent is declined", async () => {
    renderApp();

    fireEvent.click(screen.getByRole("button", { name: "Odrzucam" }));

    await waitFor(() => {
      expect(window.localStorage.getItem(COOKIE_CONSENT_KEY)).toBe("denied");
    });

    expect(document.getElementById("node48-gtm-script")).toBeNull();
    expect(document.getElementById("node48-gtm-noscript")).toBeNull();
  });

  it("opens the mobile navigation menu", async () => {
    renderApp();

    const menuButton = document.querySelector('[aria-controls="mobile-navigation-panel"]');
    expect(menuButton).toBeInstanceOf(HTMLButtonElement);

    fireEvent.click(menuButton as HTMLButtonElement);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    const mobileLinks = document.querySelectorAll(".header-mobile-link.header-mobile-link-open");
    expect(mobileLinks).toHaveLength(4);
  });

  it("closes the mobile navigation menu when Escape is pressed", async () => {
    renderApp();

    const menuButton = document.querySelector('[aria-controls="mobile-navigation-panel"]');
    expect(menuButton).toBeInstanceOf(HTMLButtonElement);

    fireEvent.click(menuButton as HTMLButtonElement);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("scrolls to the requested section when the route contains a hash", async () => {
    window.history.pushState({}, "", "/#services");

    renderApp();

    await waitFor(() => {
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  it("navigates from a service page back to the services section without a full reload", async () => {
    window.history.pushState({}, "", "/uslugi/strona-wizytowka");

    renderApp();

    await waitFor(() => {
      expect(document.querySelector('a[href="/#services"]')).toBeInstanceOf(HTMLAnchorElement);
    });

    const servicesLink = document.querySelector('a[href="/#services"]');
    expect(servicesLink).toBeInstanceOf(HTMLAnchorElement);

    fireEvent.click(servicesLink as HTMLAnchorElement);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
      expect(window.location.hash).toBe("#services");
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  it("scrolls to top from the shared route manager when navigating between service pages", async () => {
    window.history.pushState({}, "", "/uslugi/strona-wizytowka");

    renderApp();

    await waitFor(() => {
      expect(document.querySelectorAll('a[href^="/uslugi/"]').length).toBeGreaterThan(1);
    });

    const relatedServiceLink = Array.from(document.querySelectorAll('a[href^="/uslugi/"]')).find(
      (link) => (link as HTMLAnchorElement).getAttribute("href") !== "/uslugi/strona-wizytowka",
    );

    expect(relatedServiceLink).toBeInstanceOf(HTMLAnchorElement);

    fireEvent.click(relatedServiceLink as HTMLAnchorElement);

    await waitFor(() => {
      expect(window.location.pathname).not.toBe("/uslugi/strona-wizytowka");
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
    });
  });

  it("hides the header on downward scroll and reveals it on upward scroll", async () => {
    renderApp();

    const header = screen.getByRole("navigation");

    setScrollPosition(180);
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(header).toHaveAttribute("data-header-visibility", "hidden");
    });

    setScrollPosition(60);
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(header).toHaveAttribute("data-header-visibility", "visible");
    });
  });

  it("submits the contact form to the configured email endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: "true" }),
    });
    const nowSpy = vi.spyOn(Date, "now");

    vi.stubGlobal("fetch", fetchMock);
    nowSpy.mockReturnValue(10_000);

    renderWithI18n(<ContactForm />);

    const textboxes = screen.getAllByRole("textbox");
    fireEvent.change(textboxes[0], { target: { value: "Jan Kowalski" } });
    fireEvent.change(textboxes[1], { target: { value: "jan@example.com" } });
    fireEvent.change(textboxes[2], { target: { value: "Potrzebuje nowego landing page." } });
    nowSpy.mockReturnValue(15_000);

    fireEvent.submit(screen.getByRole("button").closest("form")!);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        formEndpoint,
        expect.objectContaining({
          method: "POST",
          headers: { Accept: "application/json" },
        }),
      );
    });

    const requestConfig = fetchMock.mock.calls[0]?.[1];
    const submittedFormData = requestConfig?.body as FormData;

    expect(submittedFormData.get("_replyto")).toBe("jan@example.com");
    expect(submittedFormData.get("_template")).toBe("table");
    expect(submittedFormData.get("_captcha")).toBeNull();
    expect(submittedFormData.get("_cc")).toBeNull();
    expect(submittedFormData.get("_honey")).toBe("");

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("shows an error message when the contact form request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: "false" }),
    });
    const nowSpy = vi.spyOn(Date, "now");

    vi.stubGlobal("fetch", fetchMock);
    nowSpy.mockReturnValue(20_000);

    renderWithI18n(<ContactForm />);

    const textboxes = screen.getAllByRole("textbox");
    fireEvent.change(textboxes[0], { target: { value: "Jan Kowalski" } });
    fireEvent.change(textboxes[1], { target: { value: "jan@example.com" } });
    fireEvent.change(textboxes[2], { target: { value: "Potrzebuje nowego landing page." } });
    nowSpy.mockReturnValue(25_000);

    fireEvent.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("allows retrying immediately after a failed contact form request", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ success: "false" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: "true" }),
      });
    const nowSpy = vi.spyOn(Date, "now");

    vi.stubGlobal("fetch", fetchMock);
    nowSpy.mockReturnValue(30_000);

    renderWithI18n(<ContactForm />);

    const textboxes = screen.getAllByRole("textbox");
    fireEvent.change(textboxes[0], { target: { value: "Jan Kowalski" } });
    fireEvent.change(textboxes[1], { target: { value: "jan@example.com" } });
    fireEvent.change(textboxes[2], { target: { value: "Potrzebuje nowego landing page." } });
    nowSpy.mockReturnValue(35_000);

    fireEvent.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();

    nowSpy.mockReturnValue(35_500);
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("blocks suspicious form submissions before the network request is sent", async () => {
    const fetchMock = vi.fn();

    vi.stubGlobal("fetch", fetchMock);

    renderWithI18n(<ContactForm />);

    const textboxes = screen.getAllByRole("textbox");
    fireEvent.change(textboxes[0], { target: { value: "Jan Kowalski" } });
    fireEvent.change(textboxes[1], { target: { value: "jan@example.com" } });
    fireEvent.change(textboxes[2], { target: { value: "https://spam.example www.example spam spam spam" } });
    const trapInput = document.querySelector('input[name="website"]') as HTMLInputElement;
    trapInput.value = "https://bot.example";

    fireEvent.submit(screen.getByRole("button").closest("form")!);

    await waitFor(() => {
      expect(fetchMock).not.toHaveBeenCalled();
    });

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("blocks uppercase-heavy submissions with Polish diacritics before the network request is sent", async () => {
    const fetchMock = vi.fn();
    const nowSpy = vi.spyOn(Date, "now");

    vi.stubGlobal("fetch", fetchMock);
    nowSpy.mockReturnValue(40_000);

    renderWithI18n(<ContactForm />);

    const textboxes = screen.getAllByRole("textbox");
    fireEvent.change(textboxes[0], { target: { value: "Jan Kowalski" } });
    fireEvent.change(textboxes[1], { target: { value: "jan@example.com" } });
    fireEvent.change(textboxes[2], {
      target: { value: "ZAŻÓŁĆ GĘŚLĄ JAŹŃ I KRZYKLIWE OFERTY CZEKAJĄ TERAZ NATYCHMIAST" },
    });
    nowSpy.mockReturnValue(45_000);

    fireEvent.submit(screen.getByRole("button").closest("form")!);

    await waitFor(() => {
      expect(fetchMock).not.toHaveBeenCalled();
    });

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });
});
