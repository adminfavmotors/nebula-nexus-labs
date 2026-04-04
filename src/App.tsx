import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import BrandIntroOverlay from "@/components/BrandIntroOverlay";
import { ContactOverlayProvider } from "@/components/contact/ContactOverlay";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { useBrandIntro } from "@/lib/use-brand-intro";
import Index from "./pages/Index.tsx";

const ServicePage = lazy(() => import("./pages/ServicePage.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const HASH_SCROLL_RETRY_LIMIT = 12;
const HASH_SCROLL_RETRY_DELAY_MS = 120;

const RouteHashScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
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
  }, [location.hash, location.pathname]);

  return null;
};

const AppFrame = () => {
  const location = useLocation();
  const { isTransitioningLocale } = useI18n();
  const { didPlayIntro, heroReady, overlayPhase } = useBrandIntro(location.pathname);

  return (
    <>
      <RouteHashScrollManager />
      <ContactOverlayProvider>
        <div
          className={`app-shell ${isTransitioningLocale ? "app-shell-transitioning" : ""} ${
            overlayPhase ? "app-shell-intro-active" : ""
          }`}
        >
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index heroReady={heroReady} useIntroTimings={didPlayIntro} />} />
              <Route path="/uslugi/:slug" element={<ServicePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        {overlayPhase ? <BrandIntroOverlay phase={overlayPhase} /> : null}
        <CookieConsentBanner />
      </ContactOverlayProvider>
    </>
  );
};

const AppShell = () => (
  <BrowserRouter>
    <AppFrame />
  </BrowserRouter>
);

const App = () => (
  <I18nProvider>
    <AppShell />
  </I18nProvider>
);

export default App;
