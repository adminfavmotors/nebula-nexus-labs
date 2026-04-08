import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ActionButton } from "@/components/primitives/Actions";
import { useI18n } from "@/lib/i18n";
import { loadGoogleTagManager } from "@/lib/analytics";

const COOKIE_CONSENT_STORAGE_KEY = "node48-cookie-consent";

type ConsentState = "unknown" | "granted" | "denied";
type CookieConsentBannerProps = {
  isBlocked?: boolean;
};

const consentCopy = {
  pl: {
    title: "Cookies analityczne",
    body: "Ładujemy Google Tag Manager i narzędzia analityczne dopiero po Twojej zgodzie. Dzięki temu możemy mierzyć ruch i ulepszać stronę bez domyślnego śledzenia.",
    accept: "Akceptuję",
    decline: "Odrzucam",
    policy: "Polityka cookies",
  },
  en: {
    title: "Analytics cookies",
    body: "We load Google Tag Manager and analytics tools only after your consent. This lets us measure traffic and improve the website without enabling tracking by default.",
    accept: "Accept",
    decline: "Decline",
    policy: "Cookie policy",
  },
} as const;

function readConsent(): ConsentState {
  if (typeof window === "undefined") {
    return "unknown";
  }

  const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

  if (storedConsent === "granted" || storedConsent === "denied") {
    return storedConsent;
  }

  return "unknown";
}

const CookieConsentBanner = ({ isBlocked = false }: CookieConsentBannerProps) => {
  const { locale } = useI18n();
  const copy = consentCopy[locale];
  const [consent, setConsent] = useState<ConsentState>(readConsent);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consent === "granted") {
      loadGoogleTagManager();
    }
  }, [consent]);

  useEffect(() => {
    const root = document.documentElement;

    if (consent !== "unknown") {
      root.style.setProperty("--cookie-banner-offset", "0px");
      return;
    }

    const updateOffset = () => {
      const height = bannerRef.current?.getBoundingClientRect().height ?? 0;
      const nextOffset = height > 0 ? `${Math.ceil(height + 16)}px` : "0px";
      root.style.setProperty("--cookie-banner-offset", nextOffset);
    };

    updateOffset();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            updateOffset();
          });

    if (resizeObserver && bannerRef.current) {
      resizeObserver.observe(bannerRef.current);
    }

    window.addEventListener("resize", updateOffset, { passive: true });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateOffset);
      root.style.setProperty("--cookie-banner-offset", "0px");
    };
  }, [consent]);

  const updateConsent = (nextConsent: Exclude<ConsentState, "unknown">) => {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, nextConsent);
    setConsent(nextConsent);
  };

  if (consent !== "unknown") {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      className="cookie-consent-layer cookie-consent-banner"
      aria-hidden={isBlocked || undefined}
      inert={isBlocked ? "" : undefined}
    >
      <div className="neon-frame-soft cookie-consent-panel">
        <p className="cookie-consent-title">
          {copy.title}
        </p>
        <p className="cookie-consent-copy">
          {copy.body}
        </p>
        <div className="cookie-consent-actions">
          <ActionButton type="button" className="cookie-consent-button" onClick={() => updateConsent("granted")}>
            {copy.accept}
          </ActionButton>
          <ActionButton type="button" variant="ghost" className="cookie-consent-button" onClick={() => updateConsent("denied")}>
            {copy.decline}
          </ActionButton>
          <Link
            to="/cookie-policy"
            className="cookie-consent-link"
          >
            {copy.policy}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
