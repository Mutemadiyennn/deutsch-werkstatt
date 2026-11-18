import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import type { Plugin } from "vite";

const BUILD = Date.now().toString(36);

/** Servis işçisinin kabuk listesi (D-096): derlemenin bütün dosyaları; dinamik yüklenen parçalar (Firebase) dahil, haritalar hariç */
function swAssets(): Plugin {
  return {
    name: "dw-sw-assets",
    apply: "build",
    generateBundle(_o, bundle) {
      const files = Object.keys(bundle).filter((f) => !f.endsWith(".map") && f !== "index.html").sort();
      this.emitFile({ type: "asset", fileName: "sw-assets.json", source: JSON.stringify({ build: BUILD, files }) });
    }
  };
}

// base "./": uygulama hangi alt yolda yayınlanırsa yayınlansın çalışır (hash yönlendirme)
export default defineConfig({
  base: "./",
  plugins: [preact(), swAssets()],
  define: { __BUILD__: JSON.stringify(BUILD) },
  build: { target: "es2022", sourcemap: true, chunkSizeWarningLimit: 900 },
  server: { port: 5173 },
  preview: { port: 4173 }
});
