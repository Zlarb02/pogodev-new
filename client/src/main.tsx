import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Apply font family directly with styles
document.documentElement.style.setProperty('--font-sans', '"Inter", sans-serif');

createRoot(document.getElementById("root")!).render(<App />);
