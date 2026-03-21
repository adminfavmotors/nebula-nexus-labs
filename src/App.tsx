import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider, useI18n } from "@/lib/i18n";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const AppShell = () => {
  const { isTransitioningLocale } = useI18n();

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div
          style={{
            opacity: isTransitioningLocale ? 0.82 : 1,
            filter: isTransitioningLocale ? "blur(8px)" : "blur(0px)",
            transform: isTransitioningLocale ? "translateY(4px) scale(0.995)" : "translateY(0) scale(1)",
            transition:
              "opacity 0.28s cubic-bezier(0.16,1,0.3,1), filter 0.34s cubic-bezier(0.16,1,0.3,1), transform 0.34s cubic-bezier(0.16,1,0.3,1)",
            willChange: "opacity, filter, transform",
          }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <I18nProvider>
    <AppShell />
  </I18nProvider>
);

export default App;
