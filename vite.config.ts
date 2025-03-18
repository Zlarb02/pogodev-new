import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration Vite pour le développement et le build
export default defineConfig({
  plugins: [react()],

  // Base URL pour GitHub Pages
  base: "/pogodev-new/",

  // Configuration des alias - CRITIQUE pour résoudre les imports @/
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },

  // Définir le répertoire racine pour le client
  root: path.resolve(__dirname, "client"),

  // Configuration de build
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    assetsDir: "assets",
    assetsInlineLimit: 0,
  },
});
