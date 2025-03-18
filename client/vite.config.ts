import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Si un CNAME existe (domaine personnalisé), on utilise "/" comme base
  // Sinon, on utilise le nom du dépôt pour les builds de production
  // En développement local, on utilise toujours "/"
  const getBaseUrl = () => {
    // Pour le développement local
    if (mode !== "production") return "/";

    // Pour les domaines personnalisés (quand vous ajoutez un CNAME)
    if (process.env.USE_CUSTOM_DOMAIN === "true") return "/";

    // Pour les déploiements GitHub Pages standards
    const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "pogodev-new";
    return `/${repo}/`;
  };

  const baseUrl = getBaseUrl();

  return {
    plugins: [react()],
    // Base URL dynamique
    base: baseUrl,
    define: {
      // Exposer la base URL à l'application
      __BASE_URL__: JSON.stringify(baseUrl),
    },
    // Ajout de la configuration des alias pour résoudre les imports @/
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@shared": path.resolve(__dirname, "..", "shared"),
      },
    },
    build: {
      assetsDir: "assets",
      emptyOutDir: true,
      assetsInlineLimit: 0,
    },
  };
});
