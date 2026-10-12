import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ActionButton } from "@/components/primitives/Actions";
import { useI18n } from "@/lib/i18n";
import { loadGoogleTagManager } from "@/lib/analytics";
import { getLocalizedLegalPath } from "@/lib/locale-routes";

const COOKIE_CONSENT_STORAGE_KEY = "node48-cookie-consent";

type ConsentState = "unknown" | "granted" | "denied";
type CookieConsentBannerProps = {
  isBlocked?: boolean;
};

const consentCopy = {
  pl: {
    title: "Cookies analityczne",
    body: "Opcjonalne cookies służą do analizy ruchu. Włączamy je tylko za Twoją zgodą.",
    accept: "Akceptuję",
    decline: "Odrzucam",
    policy: "Polityka cookies",
  },
  en: {
    title: "Analytics cookies",
    body: "Optional cookies help us measure traffic. We use them only with your consent.",
    accept: "Accept",
    decline: "Decline",
    policy: "Cookie policy",
  },
} as const;

function readConsent(): ConsentState {
  if (typeof window === "undefined") {
    return "unknown";
  }

  try {
    const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (storedConsent === "granted" || storedConsent === "denied") {
      return storedConsent;
    }
  } catch {
    // Unavailable storage is not consent to analytics.
  }

  return "unknown";
}

const CookieConsentBanner = ({ isBlocked = false }: CookieConsentBannerProps) => {
  const { locale } = useI18n();
  const copy = consentCopy[locale];
  // Prerender and the first hydration render must agree before reading browser storage.
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  useEffect(() => {
    if (consent === "granted") {
      loadGoogleTagManager();
    }
  }, [consent]);

  useEffect(() => {
    const root = document.documentElement;

    if (consent !== "unknown" || isBlocked) {
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
  }, [consent, isBlocked]);

  const updateConsent = (nextConsent: Exclude<ConsentState, "unknown">) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, nextConsent);
    } catch {
      // Respect the current choice even when it cannot be persisted.
    }
    setConsent(nextConsent);
  };

  if (consent !== "unknown" || isBlocked) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      className="cookie-consent-layer cookie-consent-banner"
      role="region"
      aria-labelledby="cookie-consent-title"
    >
      <div className="cookie-consent-panel">
        <p id="cookie-consent-title" className="cookie-consent-title">
          {copy.title}
        </p>
        <Link
          to={getLocalizedLegalPath(locale, "cookies")}
          className="cookie-consent-link"
        >
          {copy.policy}
        </Link>
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
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
