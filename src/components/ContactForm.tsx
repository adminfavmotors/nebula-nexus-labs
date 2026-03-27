import { useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useI18n } from "@/lib/i18n";
import { legalContent } from "@/lib/legal-content";
import { formEndpoint } from "@/lib/site-config";
import { Section, SectionTitle } from "@/components/primitives/Section";
import { ActionButton } from "@/components/primitives/Actions";
import { FormInput, FormTextarea } from "@/components/primitives/FormFields";

const CONTACT_FORM_COOLDOWN_KEY = "node48-contact-cooldown";
const CONTACT_FORM_COOLDOWN_MS = 45_000;
const CONTACT_FORM_MIN_COMPLETION_MS = 1_800;
const CONTACT_FORM_MAX_LINKS = 2;
const CONTACT_FORM_NAME_MAX_LENGTH = 120;
const CONTACT_FORM_EMAIL_MAX_LENGTH = 160;
const CONTACT_FORM_MESSAGE_MIN_LENGTH = 20;
const CONTACT_FORM_MESSAGE_MAX_LENGTH = 2_000;

const markupPattern = /<[^>]+>/;
const repeatedCharPattern = /(.)\1{6,}/;

function countLinks(value: string) {
  return (value.match(/https?:\/\/|www\./gi) ?? []).length;
}

const ContactForm = () => {
  const ref = useScrollReveal(0.1);
  const { locale, t } = useI18n();
  const legal = legalContent[locale];
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [hasInteracted, setHasInteracted] = useState(false);
  const startedAtRef = useRef(Date.now());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const message = String(formData.get("message") ?? "").trim();
    const honeyValue = String(formData.get("_honey") ?? "").trim();
    const websiteValue = String(formData.get("website") ?? "").trim();
    const startedAt = Number(formData.get("_startedAt") ?? startedAtRef.current);
    const lastAttemptAt =
      typeof window === "undefined" ? 0 : Number(window.sessionStorage.getItem(CONTACT_FORM_COOLDOWN_KEY) ?? 0);
    const isCoolingDown = lastAttemptAt > 0 && Date.now() - lastAttemptAt < CONTACT_FORM_COOLDOWN_MS;
    const isTooFast = Number.isFinite(startedAt) && Date.now() - startedAt < CONTACT_FORM_MIN_COMPLETION_MS;
    const looksSuspicious =
      !hasInteracted ||
      honeyValue.length > 0 ||
      websiteValue.length > 0 ||
      isTooFast ||
      name.length < 2 ||
      name.length > CONTACT_FORM_NAME_MAX_LENGTH ||
      email.length === 0 ||
      email.length > CONTACT_FORM_EMAIL_MAX_LENGTH ||
      message.length < CONTACT_FORM_MESSAGE_MIN_LENGTH ||
      message.length > CONTACT_FORM_MESSAGE_MAX_LENGTH ||
      countLinks(message) > CONTACT_FORM_MAX_LINKS ||
      markupPattern.test(name) ||
      markupPattern.test(message) ||
      repeatedCharPattern.test(message);

    if (isCoolingDown || looksSuspicious) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    formData.append("_replyto", String(formData.get("email") ?? ""));
    formData.append("_subject", `NODE48 inquiry (${locale.toUpperCase()})`);
    formData.append("_template", "table");
    formData.append("_captcha", "false");
    formData.append("locale", locale);

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(CONTACT_FORM_COOLDOWN_KEY, String(Date.now()));
    }

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        credentials: "omit",
        referrerPolicy: "no-referrer",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      startedAtRef.current = Date.now();
      setHasInteracted(false);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" tone="light" ref={ref} containerClassName="max-w-2xl">
      <SectionTitle tone="light" revealClassName="reveal-element" className="mb-12 text-center md:mb-14" delay="0.05">
        {t.contact.title}
      </SectionTitle>
      <form
        className="reveal-element space-y-6"
        data-delay="0.15"
        onSubmit={handleSubmit}
        onChangeCapture={() => setHasInteracted(true)}
        aria-busy={status === "submitting"}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
            maxLength={CONTACT_FORM_NAME_MAX_LENGTH}
            minLength={2}
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
            autoCapitalize="off"
            inputMode="email"
            maxLength={CONTACT_FORM_EMAIL_MAX_LENGTH}
            spellCheck={false}
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
          maxLength={CONTACT_FORM_MESSAGE_MAX_LENGTH}
          minLength={CONTACT_FORM_MESSAGE_MIN_LENGTH}
          rows={5}
          required
        />
        <input type="hidden" name="_startedAt" defaultValue={String(startedAtRef.current)} />
        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
        <ActionButton type="submit" className="w-full sm:w-auto" disabled={status === "submitting"}>
          {status === "submitting" ? t.contact.status.submitting : t.contact.submit}
        </ActionButton>
        <p className="section-copy-light">
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
            className={`text-[0.95rem] font-body leading-7 ${
              status === "success" ? "text-[#0f7b0f]" : status === "error" ? "text-[#b42318]" : "text-[#42526b]"
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
