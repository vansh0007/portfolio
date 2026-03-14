import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // Needed for GitHub Pages repo deployment
    base: mode === "production" ? "/portfolio/" : "/",

    plugins: [react()],

    define: {
      __GEMINI_API_KEY__: JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },

    server: {
      // HMR disabled when DISABLE_HMR=true
      hmr: process.env.DISABLE_HMR !== "true",
    },

    build: {
      outDir: "dist",
      sourcemap: false,
    },
  };
});