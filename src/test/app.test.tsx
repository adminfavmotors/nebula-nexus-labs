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
    document.head.innerHTML = '<meta name="description" content="" />';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("uses Polish by default and switches to English", async () => {
    renderWithI18n(<Navbar />);

    expect(screen.getByText("Usługi")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("pl");

    fireEvent.click(screen.getByRole("button", { name: "en" }));

    await waitFor(() => {
      expect(screen.getByText("Services")).toBeInTheDocument();
    });

    expect(document.documentElement.lang).toBe("en");
    expect(window.localStorage.getItem("nebula-nexus-labs-locale")).toBe("en");
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

    fireEvent.change(screen.getByPlaceholderText("Imię i nazwisko"), {
      target: { value: "Jan Kowalski" },
    });
    fireEvent.change(screen.getByPlaceholderText("Adres e-mail"), {
      target: { value: "jan@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Krótko opisz cele i zakres projektu"), {
      target: { value: "Potrzebuję nowego landing page'a." },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Wyślij wiadomość" }).closest("form")!);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        formEndpoint,
        expect.objectContaining({
          method: "POST",
          headers: { Accept: "application/json" },
        }),
      );
    });

    expect(screen.getByText(/Zgłoszenie zostało wysłane pomyślnie/i)).toBeInTheDocument();
  });

  it("shows an error message when the contact form request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: "false" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    renderWithI18n(<ContactForm />);

    fireEvent.change(screen.getByLabelText("Imię i nazwisko"), {
      target: { value: "Jan Kowalski" },
    });
    fireEvent.change(screen.getByLabelText("Adres e-mail"), {
      target: { value: "jan@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Krótko opisz cele i zakres projektu"), {
      target: { value: "Potrzebuję nowego landing page'a." },
    });

    fireEvent.click(screen.getByRole("button", { name: "Wyślij wiadomość" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Nie udało się wysłać formularza");
  });
});
