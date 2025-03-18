import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import React from "react";

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

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
