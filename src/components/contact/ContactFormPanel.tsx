import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { useI18n } from "@/lib/i18n";
import { legalContent } from "@/lib/legal-content";
import { formEndpoint } from "@/lib/site-config";
import { cx } from "@/lib/cx";
import { ActionButton } from "@/components/primitives/Actions";
import { FormInput, FormTextarea } from "@/components/primitives/FormFields";

const CONTACT_FORM_COOLDOWN_KEY = "node48-contact-cooldown";
const CONTACT_FORM_COOLDOWN_MS = 45_000;
const CONTACT_FORM_MIN_COMPLETION_MS = 2_200;
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

function hasTooManyUppercase(value: string) {
  const letters = value.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, "");

  if (letters.length < 12) {
    return false;
  }

  const uppercaseLetters = letters.replace(/[^A-ZĄĆĘŁŃÓŚŹŻ]/g, "");
  return uppercaseLetters.length / letters.length > 0.7;
}

type ContactFormPanelProps = ComponentPropsWithoutRef<"form"> & {
  mode: "section" | "modal";
  autoFocus?: boolean;
  onSuccess?: () => void;
};

export default function ContactFormPanel({
  mode,
  autoFocus = false,
  onSuccess,
  className,
  ...props
}: ContactFormPanelProps) {
  const { locale, t } = useI18n();
  const legal = legalContent[locale];
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [hasInteracted, setHasInteracted] = useState(false);
  const startedAtRef = useRef(Date.now());
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 220);

    return () => window.clearTimeout(timeoutId);
  }, [autoFocus]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const message = String(formData.get("message") ?? "").trim();
    const honeyValue = String(formData.get("_honey") ?? "").trim();
    const websiteValue = String(formData.get("website") ?? "").trim();
    const companyValue = String(formData.get("company") ?? "").trim();
    const startedAt = Number(formData.get("_startedAt") ?? startedAtRef.current);
    const lastAttemptAt =
      typeof window === "undefined" ? 0 : Number(window.sessionStorage.getItem(CONTACT_FORM_COOLDOWN_KEY) ?? 0);
    const isCoolingDown = lastAttemptAt > 0 && Date.now() - lastAttemptAt < CONTACT_FORM_COOLDOWN_MS;
    const isTooFast = Number.isFinite(startedAt) && Date.now() - startedAt < CONTACT_FORM_MIN_COMPLETION_MS;
    const looksSuspicious =
      !hasInteracted ||
      honeyValue.length > 0 ||
      websiteValue.length > 0 ||
      companyValue.length > 0 ||
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
      repeatedCharPattern.test(message) ||
      hasTooManyUppercase(message);

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

      if (mode === "modal") {
        window.setTimeout(() => {
          setStatus("idle");
          onSuccess?.();
        }, 220);
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      className={cx(mode === "section" ? "space-y-6" : "space-y-5", className)}
      onSubmit={handleSubmit}
      onChangeCapture={() => setHasInteracted(true)}
      onFocusCapture={() => setHasInteracted(true)}
      aria-busy={status === "submitting"}
      {...props}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="sr-only" htmlFor={`${mode}-contact-name`}>
          {t.contact.namePlaceholder}
        </label>
        <FormInput
          ref={nameInputRef}
          id={`${mode}-contact-name`}
          name="name"
          type="text"
          className={mode === "modal" ? "contact-overlay-field" : undefined}
          placeholder={t.contact.namePlaceholder}
          aria-label={t.contact.namePlaceholder}
          autoComplete="name"
          maxLength={CONTACT_FORM_NAME_MAX_LENGTH}
          minLength={2}
          required
        />
        <label className="sr-only" htmlFor={`${mode}-contact-email`}>
          {t.contact.emailPlaceholder}
        </label>
        <FormInput
          id={`${mode}-contact-email`}
          name="email"
          type="email"
          className={mode === "modal" ? "contact-overlay-field" : undefined}
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

      <label className="sr-only" htmlFor={`${mode}-contact-message`}>
        {t.contact.messagePlaceholder}
      </label>
      <FormTextarea
        id={`${mode}-contact-message`}
        name="message"
        className={mode === "modal" ? "contact-overlay-field contact-overlay-textarea" : undefined}
        placeholder={t.contact.messagePlaceholder}
        aria-label={t.contact.messagePlaceholder}
        maxLength={CONTACT_FORM_MESSAGE_MAX_LENGTH}
        minLength={CONTACT_FORM_MESSAGE_MIN_LENGTH}
        rows={mode === "modal" ? 6 : 5}
        required
      />

      <input type="hidden" name="_startedAt" defaultValue={String(startedAtRef.current)} />

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor={`${mode}-contact-website`}>Website</label>
        <input id={`${mode}-contact-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor={`${mode}-contact-company`}>Company</label>
        <input id={`${mode}-contact-company`} type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ActionButton
          type="submit"
          className={cx(mode === "modal" ? "w-full justify-center sm:w-auto" : "w-full sm:w-auto")}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? t.contact.status.submitting : t.contact.submit}
        </ActionButton>

        <p className={cx(mode === "modal" ? "contact-overlay-legal" : "section-copy-light measure-copy-wide")}>
          {legal.formNotice.prefix}{" "}
          <a href="/privacy-policy" className="text-[#7eb2ff] underline underline-offset-4 transition-opacity hover:opacity-75">
            {legal.formNotice.linkLabel}
          </a>{" "}
          {legal.formNotice.suffix}
        </p>
      </div>

      {status !== "idle" && !(mode === "modal" && status === "success") ? (
        <p
          aria-live="polite"
          role={status === "error" ? "alert" : "status"}
          className={cx(
            "text-[0.95rem] font-body leading-7",
            status === "success"
              ? "text-[#0f7b0f]"
              : status === "error"
                ? mode === "modal"
                  ? "text-[#ffc2bd]"
                  : "text-[#b42318]"
                : mode === "modal"
                  ? "text-[#dbe8ff]"
                  : "text-[#42526b]",
          )}
        >
          {t.contact.status[status]}
        </p>
      ) : null}
    </form>
  );
}
