import { Route, Switch, Router } from "wouter";
import { useState, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";
import NotFoundPage from "./pages/not-found";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Hook pour gérer la base URL (nécessaire pour GitHub Pages)
const useBasePath = () => {
  const basePath = window.location.hostname === "pogodev.com" ? "" : "/";
  return basePath;
};

export const useHashLocation = (): [
  string,
  (to: string, ...args: any[]) => void
] => {
  const [loc, setLoc] = useState(window.location.hash.substring(1) || "/");
  const basePath = useBasePath();

  useEffect(() => {
    const handler = () => {
      const path = window.location.hash.substring(1) || "/";
      setLoc(path);
    };

    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return [
    loc,
    (to: string) => {
      window.location.hash = to;
    },
  ];
};

export default function App() {
  // Déterminer si nous sommes sur la page 404
  const [is404Redirect, setIs404Redirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si on vient d'une redirection 404
    const redirect = sessionStorage.getItem("redirect");
    if (redirect) {
      setIs404Redirect(true);
      // On ne supprime pas le redirect ici pour permettre au Header/Footer de le détecter
    }

    // Masquer l'écran de chargement après un court délai
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Masquer l'élément loader du DOM
      const loader = document.getElementById("loader");
      if (loader) {
        loader.style.display = "none";
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Sur la page 404 récupérée par redirect, on n'affiche pas le layout
  if (is404Redirect) {
    return (
      <div className="min-h-screen bg-background">
        <NotFoundPage />
      </div>
    );
  }

  return (
    <Router hook={useHashLocation}>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
