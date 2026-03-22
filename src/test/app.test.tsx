import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import { I18nProvider } from "@/lib/i18n";
import { formEndpoint } from "@/lib/site-config";

function renderWithI18n(component: React.ReactElement) {
  return render(<I18nProvider>{component}</I18nProvider>);
}

describe("critical user flows", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    document.head.innerHTML = '<meta name="description" content="" />';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("uses Polish by default and switches to English", async () => {
    renderWithI18n(<Navbar />);

    expect(screen.getAllByRole("link", { name: /us/i }).length).toBeGreaterThan(0);
    expect(document.documentElement.lang).toBe("pl");

    fireEvent.click(screen.getByRole("button", { name: "en" }));

    await waitFor(() => {
      expect(screen.getAllByText("Services").length).toBeGreaterThan(0);
    });

    expect(document.documentElement.lang).toBe("en");
    expect(window.localStorage.getItem("node48-locale")).toBe("en");
  });

  it("updates document metadata when locale changes", async () => {
    renderWithI18n(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: "en" }));

    await waitFor(() => {
      expect(document.title).toContain("Websites and digital products");
    });

    const description = document.querySelector('meta[name="description"]');
    expect(description?.getAttribute("content")).toContain("digital experiences");
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
