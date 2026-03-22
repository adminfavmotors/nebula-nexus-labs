import { BrowserRouter, Route, Routes } from "react-router-dom";
import { I18nProvider, useI18n } from "@/lib/i18n";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const AppShell = () => {
  const { isTransitioningLocale } = useI18n();

  return (
    <BrowserRouter>
      <div className={`app-shell ${isTransitioningLocale ? "app-shell-transitioning" : ""}`}>
        <Routes>
          <Route path="/" element={<Index />} />
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
