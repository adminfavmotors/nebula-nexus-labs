import { forwardRef, useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { legalUiCopy } from "@/lib/legal-ui";
import { getLocalizedLegalPath } from "@/lib/locale-routes";
import { contactEmail, formEndpoint } from "@/lib/contact-config";
import { cx } from "@/lib/cx";
import { ActionButton } from "@/components/primitives/Actions";
import { FormInput, FormTextarea } from "@/components/primitives/FormFields";

const CONTACT_FORM_COOLDOWN_KEY = "node48-contact-cooldown";
const CONTACT_FORM_COOLDOWN_MS = 45_000;
const CONTACT_FORM_REQUEST_TIMEOUT_MS = 20_000;
const CONTACT_FORM_NAME_MAX_LENGTH = 120;
const CONTACT_FORM_EMAIL_MAX_LENGTH = 160;
const CONTACT_FORM_MESSAGE_MIN_LENGTH = 1;
const CONTACT_FORM_MESSAGE_MAX_LENGTH = 2_000;

type ContactFormStatus = "idle" | "submitting" | "success" | "error" | "timeout" | "cooldown" | "blocked" | "rateLimited";

function isSuccessfulFormSubmitResponse(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const success = (payload as { success?: unknown }).success;
  return success === true || success === "true";
}

function getContactFormCooldownSeconds() {
  try {
    const timestamp = Number(window.sessionStorage.getItem(CONTACT_FORM_COOLDOWN_KEY));
    const elapsed = Date.now() - timestamp;
    return Number.isFinite(timestamp) && timestamp > 0 && elapsed >= 0
      ? Math.max(0, Math.ceil((CONTACT_FORM_COOLDOWN_MS - elapsed) / 1000))
      : 0;
  } catch {
    // Storage is optional: privacy settings must not prevent an inquiry.
    return 0;
  }
}

function setContactFormCooldown(timestamp: number) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(CONTACT_FORM_COOLDOWN_KEY, String(timestamp));
  } catch {
    // A provider-confirmed success must remain a success if storage is unavailable.
  }
}

type ContactFormPanelProps = ComponentPropsWithoutRef<"form"> & {
  mode: "section" | "modal";
  autoFocus?: boolean;
  onSuccess?: () => void;
};

const ContactFormPanel = forwardRef<HTMLFormElement, ContactFormPanelProps>(function ContactFormPanel({
  mode,
  autoFocus = false,
  onSuccess,
  className,
  ...props
}, ref) {
  const { locale, t } = useI18n();
  const legal = legalUiCopy[locale];
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const requestRef = useRef<AbortController | null>(null);
  const successTimeoutRef = useRef<number | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isError = status !== "idle" && status !== "submitting" && status !== "success";

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => () => {
    requestRef.current?.abort();
    requestRef.current = null;
    if (successTimeoutRef.current !== null) {
      window.clearTimeout(successTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (status !== "cooldown") {
      return;
    }

    const intervalId = window.setInterval(() => {
      const seconds = getContactFormCooldownSeconds();
      setCooldownSeconds(seconds);
      if (seconds === 0) {
        setStatus("idle");
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [status]);

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

    // State updates are asynchronous; this also covers repeated submit events.
    if (requestRef.current) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const honeyValue = String(formData.get("_honey") ?? "").trim();

    const fields = [
      { key: "name", value: name, maxLength: CONTACT_FORM_NAME_MAX_LENGTH },
      { key: "email", value: email, maxLength: CONTACT_FORM_EMAIL_MAX_LENGTH },
      { key: "message", value: message, maxLength: CONTACT_FORM_MESSAGE_MAX_LENGTH },
    ];
    for (const field of fields) {
      const input = form.elements.namedItem(field.key) as HTMLInputElement | HTMLTextAreaElement;
      input.setCustomValidity(
        !field.value
          ? t.contact.validation.required
          : field.value.length > field.maxLength
            ? t.contact.validation.tooLong.replace("{limit}", String(field.maxLength))
            : "",
      );
    }
    if (!form.reportValidity()) {
      setStatus("idle");
      return;
    }

    // Only a filled provider honeypot blocks preflight. Writing style is not a bot signal.
    if (honeyValue.length > 0) {
      setStatus("blocked");
      return;
    }

    const remainingSeconds = getContactFormCooldownSeconds();
    if (remainingSeconds > 0) {
      setCooldownSeconds(remainingSeconds);
      setStatus("cooldown");
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), CONTACT_FORM_REQUEST_TIMEOUT_MS);
    setStatus("submitting");

    // Explicit payload: do not forward arbitrary fields or provider routing overrides.
    const payload = new FormData();
    payload.set("name", name);
    payload.set("email", email);
    payload.set("message", message);
    payload.set("_honey", "");
    payload.set("_replyto", email);
    payload.set("_subject", `NODE48 inquiry (${locale.toUpperCase()})`);
    payload.set("_template", "table");
    payload.set("locale", locale);
    // Query strings and hashes can contain private information unrelated to the inquiry.
    const pageUrl = `${window.location.origin}${window.location.pathname}`;
    payload.set("pageUrl", pageUrl);
    payload.set("_url", pageUrl);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        credentials: "omit",
        body: payload,
        signal: controller.signal,
      });

      const responsePayload = await response.json().catch(() => null);

      if (requestRef.current !== controller) {
        return;
      }

      if (response.status === 429) {
        setStatus("rateLimited");
        return;
      }

      if (!response.ok || !isSuccessfulFormSubmitResponse(responsePayload)) {
        throw new Error("Form submission was not accepted");
      }

      setContactFormCooldown(Date.now());
      form.reset();
      setStatus("success");

      if (mode === "modal") {
        successTimeoutRef.current = window.setTimeout(() => {
          setStatus("idle");
          onSuccess?.();
        }, 220);
      }
    } catch {
      if (requestRef.current === controller) {
        // An interrupted response cannot prove whether the provider accepted the request.
        setStatus(controller.signal.aborted ? "timeout" : "error");
      }
    } finally {
      window.clearTimeout(timeoutId);
      if (requestRef.current === controller) {
        requestRef.current = null;
      }
    }
  };

  return (
    <form
      ref={ref}
      method="post"
      className={cx("contact-form-panel", mode === "section" ? "contact-form-panel-section" : "contact-form-panel-modal", className)}
      onSubmit={handleSubmit}
      onInputCapture={(event) => {
        const input = event.target;
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
          input.setCustomValidity("");
        }
        if (status !== "submitting") {
          setStatus("idle");
        }
      }}
      aria-busy={status === "submitting"}
      {...props}
    >
      <div className="contact-form-grid">
        <label className="visually-hidden" htmlFor={`${mode}-contact-name`}>
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
          minLength={1}
          readOnly={status === "submitting"}
          required
        />
        <label className="visually-hidden" htmlFor={`${mode}-contact-email`}>
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
          readOnly={status === "submitting"}
          required
        />
      </div>

      <label className="visually-hidden" htmlFor={`${mode}-contact-message`}>
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
        readOnly={status === "submitting"}
        required
      />

      <div className="contact-form-honeypot" aria-hidden="true">
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form-actions">
        <ActionButton
          type="submit"
          className={cx(mode === "modal" ? "contact-form-submit-modal" : "contact-form-submit-section")}
          disabled={!isReady || status === "submitting"}
        >
          {status === "submitting" ? t.contact.status.submitting : t.contact.submit}
        </ActionButton>

        <p className={cx(mode === "modal" ? "contact-overlay-legal" : "contact-form-legal-copy-section")}>
          {legal.formNotice.prefix}{" "}
          <Link to={getLocalizedLegalPath(locale, "privacy")} className="contact-form-legal-link">
            {legal.formNotice.linkLabel}
          </Link>{" "}
          {legal.formNotice.suffix}
        </p>
      </div>

      {!isReady ? (
        <p className={mode === "modal" ? "contact-overlay-legal" : "contact-form-legal-copy-section"}>
          {t.contact.emailFallback}{" "}
          <a href={`mailto:${contactEmail}`} className="contact-form-legal-link">{contactEmail}</a>
        </p>
      ) : null}

      {status !== "idle" && !(mode === "modal" && status === "success") ? (
        <p
          aria-live="polite"
          role={isError ? "alert" : "status"}
          className={cx(
            "contact-form-status",
            status === "success"
              ? "contact-form-status-success"
              : isError
                ? mode === "modal"
                  ? "contact-form-status-error-modal"
                  : "contact-form-status-error"
                : mode === "modal"
                  ? "contact-form-status-submitting-modal"
                  : "contact-form-status-submitting",
          )}
        >
          {status === "cooldown"
            ? t.contact.status.cooldown.replace("{seconds}", String(cooldownSeconds))
            : t.contact.status[status]}
          {isError && status !== "cooldown" ? (
            <>
              {" "}{t.contact.emailFallback}{" "}
              <a href={`mailto:${contactEmail}`} className="contact-form-legal-link">{contactEmail}</a>
            </>
          ) : null}
        </p>
      ) : null}
    </form>
  );
});

export default ContactFormPanel;
