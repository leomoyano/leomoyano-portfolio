import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  build: {
    rollupOptions: {
      output: {
        // Keep rarely-changing libraries in their own long-cacheable chunks.
        manualChunks: {
          react: ["react", "react-dom", "react-dom/client"],
          gsap: ["gsap", "gsap/ScrollTrigger", "@gsap/react"],
          i18n: ["i18next", "react-i18next", "i18next-browser-languagedetector"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
