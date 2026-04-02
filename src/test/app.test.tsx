import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ContactForm from "@/components/ContactForm";
import App from "@/App";
import { I18nProvider } from "@/lib/i18n";
import { formEndpoint } from "@/lib/site-config";

function renderWithI18n(component: React.ReactElement) {
  return render(<I18nProvider>{component}</I18nProvider>);
}

function renderApp() {
  return render(<App />);
}

function setScrollPosition(value: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value,
    writable: true,
  });
}

describe("critical user flows", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    window.localStorage.clear();
    window.sessionStorage.clear();
    document.head.innerHTML = '<meta name="description" content="" />';
    vi.stubGlobal(
      "ResizeObserver",
      class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    window.scrollTo = vi.fn();
    setScrollPosition(0);
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
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

  it("opens the mobile navigation menu", async () => {
    renderApp();

    const menuButton = document.querySelector('[aria-controls="mobile-navigation-panel"]');
    expect(menuButton).toBeInstanceOf(HTMLButtonElement);

    fireEvent.click(menuButton as HTMLButtonElement);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    const mobileLinks = document.querySelectorAll(".header-mobile-link.translate-x-0.opacity-100");
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

    vi.stubGlobal("fetch", fetchMock);

    renderWithI18n(<ContactForm />);

    const textboxes = screen.getAllByRole("textbox");
    fireEvent.change(textboxes[0], { target: { value: "Jan Kowalski" } });
    fireEvent.change(textboxes[1], { target: { value: "jan@example.com" } });
    fireEvent.change(textboxes[2], { target: { value: "Potrzebuje nowego landing page." } });
    const startedAtInput = document.querySelector('input[name="_startedAt"]') as HTMLInputElement;
    startedAtInput.value = String(Date.now() - 5_000);

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

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("shows an error message when the contact form request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: "false" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    renderWithI18n(<ContactForm />);

    const textboxes = screen.getAllByRole("textbox");
    fireEvent.change(textboxes[0], { target: { value: "Jan Kowalski" } });
    fireEvent.change(textboxes[1], { target: { value: "jan@example.com" } });
    fireEvent.change(textboxes[2], { target: { value: "Potrzebuje nowego landing page." } });
    const startedAtInput = document.querySelector('input[name="_startedAt"]') as HTMLInputElement;
    startedAtInput.value = String(Date.now() - 5_000);

    fireEvent.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
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
});
