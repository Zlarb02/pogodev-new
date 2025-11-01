import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// Il est préférable de garder les imports avec @ pour la cohérence du projet
import { ModalsProvider } from "@/contexts/ModalsContext";
import { AppModals } from "@/components/AppModals";

// Ajouter ce code au début de votre fichier main.tsx
// Vérifier si une redirection a été stockée dans sessionStorage
const redirect = sessionStorage.getItem("redirect");
if (redirect) {
  sessionStorage.removeItem("redirect");
  // Utiliser history.replaceState pour restaurer le chemin sans causer un rechargement
  const basePath = import.meta.env.BASE_URL || "/";
  history.replaceState(null, "", basePath + redirect.replace(/^\//, ""));
}

// Apply font family directly with styles
document.documentElement.style.setProperty(
  "--font-sans",
  '"Inter", sans-serif'
);

// Récupérer la base URL injectée par Vite lors du build
const baseUrl = (window.__BASE_URL__ || "/") as string;

// Console temporaire pour aider au debug
console.log("Base URL détectée:", baseUrl);

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
