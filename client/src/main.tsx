import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";
import "./index.css";
import { ModalsProvider } from "@/contexts/ModalsContext";
import { AppModals } from "@/components/AppModals";

// Récupérer le nom du dépôt depuis vite.config.ts
const repo = "pogodev-new";

// Configuration du routeur avec la base URL correcte pour GitHub Pages
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    // Important pour GitHub Pages: base correcte
    basename: import.meta.env.PROD ? `/${repo}` : "/",
  }
);

// Apply font family directly with styles
document.documentElement.style.setProperty(
  "--font-sans",
  '"Inter", sans-serif'
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalsProvider>
      <RouterProvider router={router} />
      <AppModals />
    </ModalsProvider>
  </React.StrictMode>
);
