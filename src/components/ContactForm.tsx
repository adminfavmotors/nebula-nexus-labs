import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { formEndpoint } from "@/lib/site-config";

const ContactForm = () => {
  const ref = useScrollReveal(0.1);
  const { locale, t } = useI18n();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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
    <section id="contact" className="section-light section-spacing" ref={ref}>
      <div className="container mx-auto max-w-2xl px-6">
        <h2 className="section-title-light reveal-element mb-10 text-center" data-delay="0.05">
          {t.contact.title}
        </h2>
        <form className="reveal-element space-y-5" data-delay="0.15" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              className="form-field"
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
              className="form-field"
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
            className="form-field resize-none"
          />
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "submitting"}>
            {status === "submitting" ? t.contact.status.submitting : t.contact.submit}
          </button>
          {status !== "idle" ? (
            <p
              aria-live="polite"
              role={status === "error" ? "alert" : "status"}
              className={`font-body text-sm ${
                status === "success" ? "text-[#0f7b0f]" : status === "error" ? "text-[#b42318]" : "text-[#4a5568]"
              }`}
            >
              {t.contact.status[status]}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
