import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll("\\", "/");

          if (normalizedId.includes("/node_modules/react-router") || normalizedId.includes("/node_modules/@remix-run/router")) {
            return "router-vendor";
          }

          if (
            normalizedId.includes("/node_modules/react/") ||
            normalizedId.includes("/node_modules/react-dom/") ||
            normalizedId.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }

          if (
            normalizedId.includes("/src/lib/home-page-seo.ts") ||
            normalizedId.includes("/src/lib/service-catalog.ts") ||
            normalizedId.includes("/src/lib/site-meta.ts") ||
            normalizedId.includes("/src/lib/site-identity.ts") ||
            normalizedId.includes("/src/lib/contact-config.ts") ||
            normalizedId.includes("/src/lib/legal-ui.ts") ||
            normalizedId.includes("/src/lib/analytics-config.ts")
          ) {
            return "home-data";
          }

          if (
            normalizedId.includes("/src/lib/legal-content.ts") ||
            normalizedId.includes("/src/lib/seo-routes.ts") ||
            normalizedId.includes("/src/lib/service-pages.ts") ||
            normalizedId.includes("/src/lib/service-page-seo.ts") ||
            normalizedId.includes("/src/lib/service-page-details/")
          ) {
            return "route-data";
          }
        },
      },
    },
  },
}));
