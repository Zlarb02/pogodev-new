import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ModalsProvider } from "@/contexts/ModalsContext";
import { AppModals } from "@/components/AppModals";

// Apply font family directly with styles
document.documentElement.style.setProperty(
  "--font-sans",
  '"Inter", sans-serif'
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalsProvider>
      <App />
      <AppModals />
    </ModalsProvider>
  </React.StrictMode>
);
