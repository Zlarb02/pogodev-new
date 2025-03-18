import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// Utiliser des chemins relatifs pour le développement
import { ModalsProvider } from "./contexts/ModalsContext";
import { AppModals } from "./components/AppModals";

// Apply font family directly with styles
document.documentElement.style.setProperty(
  "--font-sans",
  '"Inter", sans-serif'
);

// Récupérer la base URL injectée par Vite lors du build
// __BASE_URL__ est défini dans vite.config.ts
const baseUrl = (window.__BASE_URL__ || "/") as string;

// Définir la base URL pour le routage
window.BASE_URL = baseUrl;

// Fonction pour détecter si nous sommes sur un domaine personnalisé
const detectCustomDomain = () => {
  const { hostname } = window.location;
  return !hostname.includes("github.io") && hostname !== "localhost";
};

// Si nous détectons un domaine personnalisé mais que la base URL contient encore un sous-chemin,
// nous sommes probablement dans une situation où le CNAME a été ajouté après le build
if (detectCustomDomain() && baseUrl !== "/") {
  console.info(
    "Domaine personnalisé détecté, mais le build a été fait pour GitHub Pages. Les chemins de navigation seront ajustés automatiquement."
  );
  window.BASE_URL = "/";
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalsProvider>
      <App />
      <AppModals />
    </ModalsProvider>
  </React.StrictMode>
);
