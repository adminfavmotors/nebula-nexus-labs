import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ContactFormPanel from "@/components/contact/ContactFormPanel";
import { I18nProvider, translations } from "@/lib/i18n";
import { businessPhone, contactEmail, formEndpoint } from "@/lib/contact-config";

const acceptedResponse = { ok: true, status: 200, json: async () => ({ success: true }) };

function renderForm(mode: "section" | "modal" = "section", onSuccess?: () => void) {
  const view = render(
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <I18nProvider><ContactFormPanel mode={mode} onSuccess={onSuccess} /></I18nProvider>
    </BrowserRouter>,
  );
  const [name, email, message] = screen.getAllByRole("textbox") as [HTMLInputElement, HTMLInputElement, HTMLTextAreaElement];
  return { ...view, name, email, message, form: name.form! };
}

function fillForm(controls: ReturnType<typeof renderForm>, message = "Proszę o wycenę.") {
  fireEvent.input(controls.name, { target: { value: "Jan Kowalski" } });
  fireEvent.input(controls.email, { target: { value: "Jan+projekt@example.com" } });
  fireEvent.input(controls.message, { target: { value: message } });
}

describe("contact form delivery and validation", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    window.sessionStorage.clear();
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it.each([
    ["uppercase Polish", "PROSZĘ O WYCENĘ STRONY DLA FIRMY"],
    ["several reference links", "https://a.example https://b.example https://c.example www.d.example"],
    ["technical brief", "Proszę zmienić <header> i sprawdzić budżet < 1000 PLN."],
    ["repeated punctuation", "Potrzebuję separatora ------- w treści strony."],
    ["short Unicode text", "你好"],
  ])("accepts a legitimate %s without a waiting period", async (_kind, message) => {
    const fetchMock = vi.fn().mockResolvedValue(acceptedResponse);
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    fillForm(controls, message);
    fireEvent.submit(controls.form);
    expect(await screen.findByRole("status")).toHaveTextContent(translations.pl.contact.status.success);
    const payload = fetchMock.mock.calls[0][1].body as FormData;
    expect(payload.get("message")).toBe(message);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("accepts autofilled values without focus/change events and a one-character name", async () => {
    const fetchMock = vi.fn().mockResolvedValue(acceptedResponse);
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    controls.name.value = "李";
    controls.email.value = "Client+brief@example.com";
    controls.message.value = "Wycena";
    fireEvent.submit(controls.form);
    expect(await screen.findByRole("status")).toBeInTheDocument();
    expect((fetchMock.mock.calls[0][1].body as FormData).get("email")).toBe("Client+brief@example.com");
  });

  it.each(["name", "email", "message"] as const)("rejects a whitespace-only %s with a field explanation", (key) => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    fillForm(controls);
    controls[key].value = "   ";
    fireEvent.submit(controls.form);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(controls[key].validationMessage).toBe(translations.pl.contact.validation.required);
    fireEvent.input(controls[key], { target: { value: key === "email" ? "jan@example.com" : "Poprawione" } });
    expect(controls[key].validity.customError).toBe(false);
  });

  it.each([["name", 120], ["email", 160], ["message", 2000]] as const)("rejects an oversized %s without truncating it", (key, limit) => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    fillForm(controls);
    const value = "a".repeat(limit + 1);
    controls[key].value = value;
    fireEvent.submit(controls.form);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(controls[key].value).toBe(value);
    expect(controls[key].validationMessage).toContain(String(limit));
  });

  it("uses native email validation and allows correction", async () => {
    const fetchMock = vi.fn().mockResolvedValue(acceptedResponse);
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    fillForm(controls);
    controls.email.value = "not-an-email";
    fireEvent.submit(controls.form);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(controls.email.validity.typeMismatch).toBe(true);
    fireEvent.input(controls.email, { target: { value: "jan@example.com" } });
    fireEvent.submit(controls.form);
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("blocks a filled provider honeypot without pretending delivery succeeded", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    fillForm(controls);
    (controls.form.elements.namedItem("_honey") as HTMLInputElement).value = "bot";
    fireEvent.submit(controls.form);
    expect(await screen.findByRole("alert")).toHaveTextContent(translations.pl.contact.status.blocked);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    expect(controls.message.value).toBe("Proszę o wycenę.");
  });

  it("sends only approved fields and omits URL secrets and routing overrides", async () => {
    window.history.replaceState({}, "", "/?token=private#private-anchor");
    const fetchMock = vi.fn().mockResolvedValue(acceptedResponse);
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    fillForm(controls);
    controls.name.value = "  Jan Kowalski  ";
    const injected = document.createElement("input");
    injected.name = "_cc";
    injected.value = "other@example.com";
    controls.form.append(injected);
    fireEvent.submit(controls.form);
    await screen.findByRole("status");
    const payload = fetchMock.mock.calls[0][1].body as FormData;
    expect(fetchMock.mock.calls[0][0]).toBe(formEndpoint);
    expect(payload.get("name")).toBe("Jan Kowalski");
    expect(payload.get("_replyto")).toBe("Jan+projekt@example.com");
    expect(payload.get("pageUrl")).toBe(`${window.location.origin}/`);
    expect(payload.get("_url")).toBe(`${window.location.origin}/`);
    expect(Array.from(payload.keys()).sort()).toEqual(["name", "email", "message", "_honey", "_replyto", "_subject", "_template", "locale", "pageUrl", "_url"].sort());
  });

  it("prevents duplicate requests while sending and keeps submitted fields read-only", async () => {
    let resolve!: (response: typeof acceptedResponse) => void;
    const fetchMock = vi.fn(() => new Promise<typeof acceptedResponse>((done) => { resolve = done; }));
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    const emailLink = screen.getByRole("link", { name: `E-mail: ${contactEmail}` });
    const phoneLink = screen.getByRole("link", { name: `Telefon: ${businessPhone}` });
    fillForm(controls);
    fireEvent.submit(controls.form);
    fireEvent.submit(controls.form);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(controls.message.readOnly).toBe(true);
    expect(emailLink).toHaveAttribute("href", `mailto:${contactEmail}`);
    expect(phoneLink).toHaveAttribute("href", "tel:+48788554887");
    await act(async () => { resolve(acceptedResponse); });
    expect(screen.getByRole("status")).toHaveTextContent(translations.pl.contact.status.success);
    expect(controls.message.readOnly).toBe(false);
    expect(screen.getByRole("link", { name: `E-mail: ${contactEmail}` })).toBe(emailLink);
    expect(screen.getByRole("link", { name: `Telefon: ${businessPhone}` })).toBe(phoneLink);
  });

  it.each([
    ["provider rejection", { ok: true, status: 200, json: async () => ({ success: false, message: "<script>provider-secret</script>" }) }, "error"],
    ["HTTP failure", { ok: false, status: 500, json: async () => ({ success: true }) }, "error"],
    ["malformed response", { ok: true, status: 200, json: async () => { throw new Error("invalid JSON"); } }, "error"],
    ["rate limit", { ok: false, status: 429, json: async () => ({ success: false }) }, "rateLimited"],
  ] as const)("preserves the inquiry on %s and offers direct email", async (_kind, response, status) => {
    const fetchMock = vi.fn().mockResolvedValueOnce(response).mockResolvedValueOnce(acceptedResponse);
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    fillForm(controls);
    fireEvent.submit(controls.form);
    expect(await screen.findByRole("alert")).toHaveTextContent(translations.pl.contact.status[status]);
    expect(controls.message.value).toBe("Proszę o wycenę.");
    expect(screen.getByRole("link", { name: `E-mail: ${contactEmail}` })).toHaveAttribute("href", `mailto:${contactEmail}`);
    expect(screen.getByRole("link", { name: `Telefon: ${businessPhone}` })).toHaveAttribute("href", "tel:+48788554887");
    expect(document.body).not.toHaveTextContent("provider-secret");
    expect(window.sessionStorage.getItem("node48-contact-cooldown")).toBeNull();
    fireEvent.submit(controls.form);
    expect(await screen.findByRole("status")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("aborts a stalled request, retains text and never retries automatically", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn().mockImplementationOnce((_url, options: RequestInit) => new Promise((_resolve, reject) => {
      options.signal!.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    })).mockResolvedValue(acceptedResponse);
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    fillForm(controls);
    fireEvent.submit(controls.form);
    await act(async () => { vi.advanceTimersByTime(20_000); });
    expect(screen.getByRole("alert")).toHaveTextContent(translations.pl.contact.status.timeout);
    expect(controls.message.value).toBe("Proszę o wycenę.");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][1].signal.aborted).toBe(true);
    expect(screen.getByRole("button")).toBeEnabled();
    await act(async () => { fireEvent.submit(controls.form); });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("explains the post-success cooldown and accepts another inquiry after it expires", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(10_000);
    const fetchMock = vi.fn().mockResolvedValue(acceptedResponse);
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    fillForm(controls);
    await act(async () => { fireEvent.submit(controls.form); });
    expect(screen.getByRole("status")).toBeInTheDocument();
    fillForm(controls, "Drugie zgłoszenie");
    fireEvent.submit(controls.form);
    expect(screen.getByRole("alert")).toHaveTextContent("45 s");
    expect(screen.getByRole("link", { name: `Telefon: ${businessPhone}` })).toHaveAttribute("href", "tel:+48788554887");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(controls.message.value).toBe("Drugie zgłoszenie");
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByRole("alert")).toHaveTextContent("44 s");
    act(() => { vi.advanceTimersByTime(44_000); });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    await act(async () => { fireEvent.submit(controls.form); });
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("keeps delivery working when browser storage is unavailable", async () => {
    const fetchMock = vi.fn().mockResolvedValue(acceptedResponse);
    vi.stubGlobal("fetch", fetchMock);
    const controls = renderForm();
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new DOMException("Denied", "SecurityError"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new DOMException("Denied", "SecurityError"); });
    fillForm(controls);
    fireEvent.submit(controls.form);
    expect(await screen.findByRole("status")).toHaveTextContent(translations.pl.contact.status.success);
    expect(controls.message.value).toBe("");
  });

  it("shows localized English failure information in the modal without success", async () => {
    window.history.replaceState({}, "", "/en");
    const onSuccess = vi.fn();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Network error")));
    const controls = renderForm("modal", onSuccess);
    fillForm(controls);
    fireEvent.submit(controls.form);
    expect(await screen.findByRole("alert")).toHaveTextContent(translations.en.contact.status.error);
    expect(screen.getByRole("link", { name: `Email: ${contactEmail}` })).toHaveAttribute("href", `mailto:${contactEmail}`);
    expect(screen.getByRole("link", { name: `Phone: ${businessPhone}` })).toHaveAttribute("href", "tel:+48788554887");
    expect(onSuccess).not.toHaveBeenCalled();
    expect(controls.message.value).toBe("Proszę o wycenę.");
  });

  it("calls modal success only after a confirmed provider response", async () => {
    vi.useFakeTimers();
    const onSuccess = vi.fn();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(acceptedResponse));
    const controls = renderForm("modal", onSuccess);
    fillForm(controls);
    await act(async () => { fireEvent.submit(controls.form); });
    expect(onSuccess).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(220); });
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("aborts on unmount and does not report a late response as success", async () => {
    let resolve!: (response: typeof acceptedResponse) => void;
    const fetchMock = vi.fn(() => new Promise<typeof acceptedResponse>((done) => { resolve = done; }));
    vi.stubGlobal("fetch", fetchMock);
    const onSuccess = vi.fn();
    const controls = renderForm("modal", onSuccess);
    fillForm(controls);
    fireEvent.submit(controls.form);
    const signal = (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].signal!;
    controls.unmount();
    expect(signal.aborted).toBe(true);
    await act(async () => { resolve(acceptedResponse); });
    expect(onSuccess).not.toHaveBeenCalled();
    expect(window.sessionStorage.getItem("node48-contact-cooldown")).toBeNull();
  });
});
