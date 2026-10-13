import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/fonts.css";
import "./index.css";
import "./styles/home.css";
import "./styles/shell.css";
import "./styles/responsive.css";
// Prerendered content needs its CSS before lazy JavaScript loads or hydrates.
import "./styles/service-page.css";
import "./styles/service-page-responsive.css";
import "./components/portfolio/portfolio-carousel.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container was not found.");
}

// First visits keep the same prerendered page as repeat visits. Optional intro
// playback starts after hydration, never by replacing visible static content.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
