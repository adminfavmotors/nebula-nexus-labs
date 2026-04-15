import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { ContactOverlayProvider } from "@/components/contact/ContactOverlay";
import Index from "@/pages/Index.tsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy.tsx";
import CookiePolicy from "@/pages/CookiePolicy.tsx";
import NotFound from "@/pages/NotFound.tsx";
import ServicePage from "@/pages/ServicePage.tsx";
import { I18nContext } from "@/lib/i18n-context";
import { getPathLocale } from "@/lib/locale-routes";
import { translations, type Locale } from "@/lib/i18n-data";

type PrerenderedAppProps = {
  pathname: string;
};

export default function PrerenderedApp({ pathname }: PrerenderedAppProps) {
  const locale = getPathLocale(pathname) as Locale;

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale: () => undefined,
        isTransitioningLocale: false,
        t: translations[locale],
      }}
    >
      <StaticRouter location={pathname}>
        <ContactOverlayProvider>
          <div className="app-shell">
            <Routes>
              <Route path="/" element={<Index heroReady useIntroTimings={false} />} />
              <Route path="/en" element={<Index heroReady useIntroTimings={false} />} />
              <Route path="/uslugi/:slug" element={<ServicePage />} />
              <Route path="/en/uslugi/:slug" element={<ServicePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/en/cookie-policy" element={<CookiePolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <CookieConsentBanner />
        </ContactOverlayProvider>
      </StaticRouter>
    </I18nContext.Provider>
  );
}
