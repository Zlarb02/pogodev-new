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
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'framer-motion': ['framer-motion'],
          'lucide-react': ['lucide-react'],
          'ui': [
            '@radix-ui/react-label',
            '@radix-ui/react-toast',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'tailwindcss-animate',
          ],
          'vendor': [
            'react',
            'react-dom',
            'wouter',
          ]
        }
      }
    },
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
