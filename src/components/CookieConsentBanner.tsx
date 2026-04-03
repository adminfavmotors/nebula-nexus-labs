import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ActionButton } from "@/components/primitives/Actions";
import { useI18n } from "@/lib/i18n";
import { loadGoogleTagManager } from "@/lib/analytics";

const COOKIE_CONSENT_STORAGE_KEY = "node48-cookie-consent";

type ConsentState = "unknown" | "granted" | "denied";

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

const CookieConsentBanner = () => {
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
      className="fixed inset-x-4 bottom-[var(--floating-layer-bottom)] z-[80] sm:inset-x-auto sm:right-5 sm:w-[min(30rem,calc(100vw-2.5rem))]"
    >
      <div className="neon-frame-soft overflow-hidden rounded-[1.5rem] border border-[rgba(132,184,255,0.18)] bg-[linear-gradient(180deg,rgba(8,20,62,0.96),rgba(4,12,40,0.99))] p-5 shadow-[0_24px_70px_rgba(0,10,34,0.42)] backdrop-blur-xl">
        <p className="mb-2 font-display text-[1.2rem] font-bold tracking-[-0.03em] text-white">
          {copy.title}
        </p>
        <p className="section-copy-dark mb-4 max-w-[44ch] text-[0.95rem] leading-7">
          {copy.body}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <ActionButton type="button" className="justify-center" onClick={() => updateConsent("granted")}>
            {copy.accept}
          </ActionButton>
          <ActionButton type="button" variant="ghost" className="justify-center" onClick={() => updateConsent("denied")}>
            {copy.decline}
          </ActionButton>
          <Link
            to="/cookie-policy"
            className="text-center font-body text-[0.92rem] font-medium text-[#8fb4ff] underline underline-offset-4 transition-opacity hover:opacity-80 sm:ml-auto"
          >
            {copy.policy}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
