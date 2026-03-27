import { BrowserRouter, Route, Routes } from "react-router-dom";
import { I18nProvider, useI18n } from "@/lib/i18n";
import Index from "./pages/Index.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import CookiePolicy from "./pages/CookiePolicy.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const AppShell = () => {
  const { isTransitioningLocale } = useI18n();

  return (
    <BrowserRouter>
      <div className={`app-shell ${isTransitioningLocale ? "app-shell-transitioning" : ""}`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/uslugi/:slug" element={<ServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const App = () => (
  <I18nProvider>
    <AppShell />
  </I18nProvider>
);

export default App;
