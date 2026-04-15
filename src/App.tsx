import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import BrandIntroOverlay from "@/components/BrandIntroOverlay";
import { ContactOverlayProvider } from "@/components/contact/ContactOverlay";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { useBrandIntro } from "@/lib/use-brand-intro";
import Index from "./pages/Index.tsx";

const ROUTER_FUTURE_FLAGS = {
  v7_relativeSplatPath: true,
  v7_startTransition: true,
} as const;
const BRAND_INTRO_PENDING_ATTRIBUTE = "data-brand-intro-pending";

const ServicePage = lazy(() => import("./pages/ServicePage.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const HASH_SCROLL_RETRY_LIMIT = 12;
const HASH_SCROLL_RETRY_DELAY_MS = 120;

const RouteHashScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousPathnameRef = useRef(location.pathname);

  useEffect(() => {
    const pathnameChanged = previousPathnameRef.current !== location.pathname;
    previousPathnameRef.current = location.pathname;

    if (!location.hash) {
      if (pathnameChanged && navigationType !== "POP") {
        window.scrollTo({ top: 0, behavior: "auto" });
      }

      return;
    }

    const hashId = decodeURIComponent(location.hash.slice(1));

    if (!hashId) {
      return;
    }

    let attempts = 0;
    let timeoutId: number | null = null;

    const scrollToHashTarget = () => {
      const target =
        hashId === "home" ? document.documentElement : document.getElementById(hashId);

      if (target) {
        if (hashId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      attempts += 1;
      if (attempts >= HASH_SCROLL_RETRY_LIMIT) {
        return;
      }

      timeoutId = window.setTimeout(scrollToHashTarget, HASH_SCROLL_RETRY_DELAY_MS);
    };

    scrollToHashTarget();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [location.hash, location.pathname, navigationType]);

  return null;
};

const AppFrame = () => {
  const location = useLocation();
  const { isTransitioningLocale } = useI18n();
  const { didPlayIntro, heroReady, overlayPhase } = useBrandIntro(location.pathname);
  const appShellRef = useRef<HTMLDivElement>(null);
  const introBlocking = overlayPhase === "preparing" || overlayPhase === "running";

  useLayoutEffect(() => {
    const shellElement = appShellRef.current;

    if (!shellElement) {
      return;
    }

    if (introBlocking) {
      shellElement.setAttribute("inert", "");
      return;
    }

    shellElement.removeAttribute("inert");
  }, [introBlocking]);

  useLayoutEffect(() => {
    if (introBlocking) {
      document.documentElement.setAttribute(BRAND_INTRO_PENDING_ATTRIBUTE, "");
      return;
    }

    document.documentElement.removeAttribute(BRAND_INTRO_PENDING_ATTRIBUTE);
  }, [introBlocking]);

  return (
    <>
      <RouteHashScrollManager />
      <ContactOverlayProvider>
        <div
          ref={appShellRef}
          className={`app-shell ${isTransitioningLocale ? "app-shell-transitioning" : ""} ${
            introBlocking ? "app-shell-intro-blocked" : ""
          }`}
          aria-hidden={introBlocking || undefined}
        >
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index heroReady={heroReady} useIntroTimings={didPlayIntro} />} />
              <Route path="/en" element={<Index heroReady={heroReady} useIntroTimings={didPlayIntro} />} />
              <Route path="/uslugi/:slug" element={<ServicePage />} />
              <Route path="/en/uslugi/:slug" element={<ServicePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/en/cookie-policy" element={<CookiePolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        {overlayPhase ? <BrandIntroOverlay phase={overlayPhase} /> : null}
        <CookieConsentBanner isBlocked={introBlocking} />
      </ContactOverlayProvider>
    </>
  );
};

const App = () => (
  <BrowserRouter future={ROUTER_FUTURE_FLAGS}>
    <I18nProvider>
      <AppFrame />
    </I18nProvider>
  </BrowserRouter>
);

export default App;
