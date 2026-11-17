import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// base "./": uygulama hangi alt yolda yayınlanırsa yayınlansın çalışır (hash yönlendirme)
export default defineConfig({
  base: "./",
  plugins: [preact()],
  build: { target: "es2022", sourcemap: true, chunkSizeWarningLimit: 900 },
  server: { port: 5173 },
  preview: { port: 4173 }
});
