import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { legalContent } from "@/lib/legal-content";
import { formEndpoint } from "@/lib/site-config";
import { Section, SectionTitle } from "@/components/primitives/Section";
import { ActionButton } from "@/components/primitives/Actions";
import { FormInput, FormTextarea } from "@/components/primitives/FormFields";

const ContactForm = () => {
  const ref = useScrollReveal(0.1);
  const { locale, t } = useI18n();
  const legal = legalContent[locale];
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
    <Section id="contact" tone="light" ref={ref} containerClassName="max-w-2xl">
      <SectionTitle tone="light" revealClassName="reveal-element" className="mb-10 text-center" delay="0.05">
        {t.contact.title}
      </SectionTitle>
      <form className="reveal-element space-y-5" data-delay="0.15" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="sr-only" htmlFor="contact-name">
            {t.contact.namePlaceholder}
          </label>
          <FormInput
            id="contact-name"
            name="name"
            type="text"
            placeholder={t.contact.namePlaceholder}
            aria-label={t.contact.namePlaceholder}
            autoComplete="name"
            required
          />
          <label className="sr-only" htmlFor="contact-email">
            {t.contact.emailPlaceholder}
          </label>
          <FormInput
            id="contact-email"
            name="email"
            type="email"
            placeholder={t.contact.emailPlaceholder}
            aria-label={t.contact.emailPlaceholder}
            autoComplete="email"
            required
          />
        </div>
        <label className="sr-only" htmlFor="contact-message">
          {t.contact.messagePlaceholder}
        </label>
        <FormTextarea
          id="contact-message"
          name="message"
          placeholder={t.contact.messagePlaceholder}
          aria-label={t.contact.messagePlaceholder}
          rows={5}
          required
        />
        <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
        <ActionButton type="submit" className="w-full sm:w-auto" disabled={status === "submitting"}>
          {status === "submitting" ? t.contact.status.submitting : t.contact.submit}
        </ActionButton>
        <p className="font-body text-sm leading-6 text-[#4a5568]">
          {legal.formNotice.prefix}{" "}
          <a href="/privacy-policy" className="text-[#0059ff] underline underline-offset-4 transition-opacity hover:opacity-75">
            {legal.formNotice.linkLabel}
          </a>{" "}
          {legal.formNotice.suffix}
        </p>
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
    </Section>
  );
};

export default ContactForm;
