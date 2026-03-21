import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { formEndpoint } from "@/lib/site-config";

const ContactForm = () => {
  const ref = useScrollReveal(0.1);
  const { locale, t } = useI18n();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const statusMessages = {
    pl: {
      submitting: "Wysyłamy zgłoszenie...",
      success: "Dziękujemy. Zgłoszenie zostało wysłane pomyślnie.",
      error: "Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.",
    },
    en: {
      submitting: "Sending your request...",
      success: "Thanks. Your request has been sent successfully.",
      error: "We could not send the form. Please try again in a moment.",
    },
  } as const;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("_replyto", String(formData.get("email") ?? ""));
    formData.append("_subject", `Nebula Nexus Labs inquiry (${locale.toUpperCase()})`);
    formData.append("_template", "table");
    formData.append("_captcha", "false");
    formData.append("locale", locale);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-light py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 max-w-2xl">
        <span className="reveal-element section-label block mb-4 text-center" data-delay="0">{t.contact.eyebrow}</span>
        <h2 className="reveal-element font-display text-[44px] text-foreground text-center mb-10 font-bold" data-delay="0.05">
          {t.contact.title}
        </h2>
        <form className="reveal-element space-y-5" data-delay="0.15" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="sr-only" htmlFor="contact-name">
              {t.contact.namePlaceholder}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder={t.contact.namePlaceholder}
              aria-label={t.contact.namePlaceholder}
              autoComplete="name"
              required
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-blue-100 text-gray-900 font-body text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all duration-300"
            />
            <label className="sr-only" htmlFor="contact-email">
              {t.contact.emailPlaceholder}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder={t.contact.emailPlaceholder}
              aria-label={t.contact.emailPlaceholder}
              autoComplete="email"
              required
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-blue-100 text-gray-900 font-body text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all duration-300"
            />
          </div>
          <label className="sr-only" htmlFor="contact-message">
            {t.contact.messagePlaceholder}
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder={t.contact.messagePlaceholder}
            aria-label={t.contact.messagePlaceholder}
            rows={5}
            required
            className="w-full px-5 py-3.5 rounded-xl bg-white border border-blue-100 text-gray-900 font-body text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all duration-300 resize-none"
          />
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "submitting"}>
            {status === "submitting" ? statusMessages[locale].submitting : t.contact.submit}
          </button>
          {status !== "idle" ? (
            <p
              aria-live="polite"
              role={status === "error" ? "alert" : "status"}
              className="text-sm font-body"
              style={{ color: status === "success" ? "#0f7b0f" : status === "error" ? "#b42318" : "#4a5568" }}
            >
              {statusMessages[locale][status]}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
