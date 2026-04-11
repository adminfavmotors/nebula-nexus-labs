import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { STORAGE_KEY } from "@/lib/i18n-data";
import { BRAND_INTRO_STORAGE_KEY } from "@/lib/use-brand-intro";
import "./styles/fonts.css";
import "./index.css";
import "./styles/home.css";
import "./styles/shell.css";
import "./styles/responsive.css";

const BRAND_INTRO_PENDING_ATTRIBUTE = "data-brand-intro-pending";

function shouldPlayBrandIntroOnBoot() {
  const pathname = window.location.pathname;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasPlayedIntro = window.sessionStorage.getItem(BRAND_INTRO_STORAGE_KEY) === "1";

  return pathname === "/" && !prefersReducedMotion && !hasPlayedIntro;
}

function shouldHydratePrerenderedMarkup() {
  const storedLocale = window.localStorage.getItem(STORAGE_KEY);
  const shouldPlayIntro = shouldPlayBrandIntroOnBoot();

  return storedLocale !== "en" && !shouldPlayIntro;
}

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container was not found.");
}

if (shouldPlayBrandIntroOnBoot()) {
  document.documentElement.setAttribute(BRAND_INTRO_PENDING_ATTRIBUTE, "");
}

if (container.hasChildNodes() && shouldHydratePrerenderedMarkup()) {
  hydrateRoot(container, <App />);
} else {
  container.innerHTML = "";
  createRoot(container).render(<App />);
}
