import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: "/",
  root: path.resolve(__dirname, "client"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    assetsDir: "assets",
    emptyOutDir: true,
    assetsInlineLimit: 4096, // Inline petits assets
    cssCodeSplit: true, // Split CSS pour lazy loading
    sourcemap: false, // Désactiver sourcemaps en prod
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Chunking sécurisé : séparer uniquement les grosses libs
          if (id.includes('node_modules')) {
            // Three.js dans son propre chunk (459KB)
            if (id.includes('three')) {
              return 'three';
            }
            // Framer Motion dans son propre chunk (114KB)
            if (id.includes('framer-motion')) {
              return 'framer';
            }
            // Tout le reste des node_modules ensemble (incluant react/react-dom)
            // pour éviter les problèmes de dépendances
            return 'vendor';
          }
        },
        // Optimisation des noms de fichiers pour le cache
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    target: 'esnext',
    minify: 'esbuild', // esbuild est plus rapide et plus sûr avec React
    // terserOptions supprimées - esbuild gère la minification
    chunkSizeWarningLimit: 1000, // Augmenter la limite de warning
    reportCompressedSize: false, // Désactiver pour build plus rapide
  },
  // Optimisations de dev
  server: {
    hmr: {
      overlay: false,
    },
  },
});
