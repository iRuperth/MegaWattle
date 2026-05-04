import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5050",
      "/fuentes": "http://localhost:5050",
      "/healthz": "http://localhost:5050",
    },
  },
  build: {
    outDir: "../static/dist",
    emptyOutDir: true,
    assetsDir: "assets",
  },
});
