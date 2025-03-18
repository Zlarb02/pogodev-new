import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import React, { useEffect } from "react";

// Utiliser le BASE_URL défini dans main.tsx
const base = window.BASE_URL || "/";

// Hook personnalisé pour wouter qui tient compte du basename
const useHashLocation = (): [string, (to: string, ...args: any[]) => void] => {
  const [loc, setLoc] = React.useState(
    window.location.pathname.replace(new RegExp(`^${base}`), "/")
  );

  React.useEffect(() => {
    const handler = () => {
      const path = window.location.pathname.replace(
        new RegExp(`^${base}`),
        "/"
      );
      setLoc(path);
    };

    window.addEventListener("popstate", handler);
    window.addEventListener("pushstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
      window.removeEventListener("pushstate", handler);
    };
  }, []);

  const navigate = (to: string, ...args: any[]): void => {
    window.history.pushState(null, "", `${base}${to.replace(/^\//, "")}`);
    setLoc(to);
  };

  return [loc, navigate];
};

// Composant pour la page d'erreur 404
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background">
      <img src="/assets/logo.svg" alt="Logo" className="w-20 mb-8" />
      <h1 className="text-4xl font-bold text-white mb-4 font-poppins">
        Page non trouvée
      </h1>
      <p className="text-xl mb-8 max-w-md">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-accent text-white rounded-lg font-semibold transition-colors hover:bg-accent/80"
      >
        Retour à l'accueil
      </a>
    </div>
  );
}

export default function App() {
  // Récupérer et réinitialiser la redirection stockée dans sessionStorage
  useEffect(() => {
    const redirectPath = sessionStorage.redirect;
    if (redirectPath) {
      // Supprimer la redirection pour ne pas la réutiliser
      delete sessionStorage.redirect;

      // Extraire le chemin de la redirection et naviguer
      const path =
        new URL(redirectPath).pathname.replace(new RegExp(`^${base}`), "/") ||
        "/";
      window.history.replaceState(
        null,
        "",
        `${base}${path.replace(/^\//, "")}`
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
