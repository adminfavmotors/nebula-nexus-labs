import { createRoot } from "react-dom/client";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import App from "./App.tsx";
import "./index.css";
import "./styles/home.css";
import "./styles/shell.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")!).render(<App />);
