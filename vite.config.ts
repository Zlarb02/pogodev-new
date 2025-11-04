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
          // Optimisation du chunking pour meilleur cache
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'three';
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('lucide-react')) return 'lucide';
            if (id.includes('@radix-ui')) return 'radix';
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Multiple passes pour meilleure compression
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false, // Supprimer tous les commentaires
      },
    },
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
