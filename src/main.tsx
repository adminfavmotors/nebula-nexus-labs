import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/home.css";
import "./styles/shell.css";
import "./styles/service-page.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")!).render(<App />);
