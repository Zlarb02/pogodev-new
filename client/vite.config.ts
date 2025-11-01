import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement
  const env = loadEnv(mode, process.cwd());

  const getBaseUrl = () => {
    return "/";
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
      // Optimisation du code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Séparer les dépendances lourdes
            'three': ['three'],
            'framer-motion': ['framer-motion'],
            'lucide-react': ['lucide-react'],
            // Regrouper les composants UI
            'ui': [
              '@radix-ui/react-label',
              '@radix-ui/react-toast',
              'class-variance-authority',
              'clsx',
              'tailwind-merge',
              'tailwindcss-animate',
            ],
            // Regrouper les utilitaires
            'vendor': [
              'react',
              'react-dom',
              'wouter',
            ]
          }
        }
      },
      // Optimisations pour les performances
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      // Configuration pour gérer les redirections SPA en développement
      proxy: {}, // Add actual proxy configuration if needed
      // historyApiFallback is not available in Vite, it uses this by default
    },
  };
});
