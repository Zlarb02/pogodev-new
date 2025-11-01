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
  base: "/",

  // Configuration des alias - CRITIQUE pour résoudre les imports @/
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
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
    // Optimisations pour réduire la taille du bundle et améliorer le chargement
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer Three.js dans son propre chunk (117 KB)
          'three': ['three'],
          // Séparer Framer Motion (chunk séparé)
          'framer-motion': ['framer-motion'],
          // Séparer Lucide icons (lazy loaded)
          'lucide': ['lucide-react'],
          // Séparer les UI components shadcn
          'ui-components': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-toast',
          ],
          // Vendor chunk pour React et autres dépendances stables
          'vendor': ['react', 'react-dom', 'wouter'],
        },
      },
    },
    // Minification avancée
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer les console.log en production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    // Optimiser la taille des chunks
    chunkSizeWarningLimit: 600,
  },
});
