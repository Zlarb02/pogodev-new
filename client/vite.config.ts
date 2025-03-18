import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Récupérer le nom du dépôt depuis package.json ou définir manuellement
// https://vitejs.dev/guide/static-deploy.html#github-pages
const repo = "pogodev-new"; // Vous pouvez aussi utiliser 'process.env.GITHUB_REPOSITORY?.split("/")[1] || "pogodev-new"'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base URL pour GitHub Pages
  base: process.env.NODE_ENV === "production" ? `/${repo}/` : "/",
  build: {
    // Assurons-nous que les assets sont générés avec les bons chemins
    assetsDir: "assets",
    // Assurons-nous que le HTML est généré avec les bons chemins relatifs
    emptyOutDir: true,
    // S'assurer que les chemins sont relatifs
    assetsInlineLimit: 0,
  },
});
