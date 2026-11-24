import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import type { Plugin } from "vite";
import { fileURLToPath } from "node:url";

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

/**
 * Paket inceltme (PM-124 md. 4.2; yalnız derleme, geliştirme sunucusu ve birim testleri etkilenmez):
 *  - zod'un JSON şeması üreticisi (`to-json-schema.js`, `json-schema-processors.js`) → `build/zod-json-sema-yok.js`. Uygulama
 *    JSON şeması üretmez; doğrulama aynı.
 *  - Dexie: paketin içe aktarma sarmalayıcısı UMD derlemesini sarar; aynı sürümün resmî modern ESM derlemesi küçük
 *    (sarmalayıcının "iki kopya" denetimi tek kopyalı pakette gereksiz). Sürüm `package-lock.json`'daki.
 */
function paketInceltme(): Plugin {
  const zodYok = fileURLToPath(new URL("./build/zod-json-sema-yok.js", import.meta.url));
  return {
    name: "dw-paket-inceltme",
    apply: "build",
    enforce: "pre",
    async resolveId(id, importer) {
      if (importer && /[\\/]node_modules[\\/]zod[\\/]v4[\\/]/.test(importer) && /(^|\/)(to-json-schema|json-schema-processors)\.js$/.test(id)) return zodYok;
      if (id === "dexie") { const r = await this.resolve("dexie/dist/modern/dexie.mjs", importer, { skipSelf: true }); return r?.id ?? null; }
      return null;
    }
  };
}

// base "./": uygulama hangi alt yolda yayınlanırsa yayınlansın çalışır (hash yönlendirme)
export default defineConfig({
  base: "./",
  plugins: [paketInceltme(), preact(), swAssets()],
  define: { __BUILD__: JSON.stringify(BUILD) },
  build: {
    target: "es2022", sourcemap: true, chunkSizeWarningLimit: 900,
    // İlk açılışın bütün modülleri tek parçada (PM-124 md. 4.2): tembel ekranlar (Akış, Seviye, Sınav) ana paketle ortak modülleri
    // buradan alır. Grup olmadan paketleyici ortak modülleri ilk açılıştan ayrı parçalara bölüyordu (ilk açılış 3 dosya, toplam +6,7 KB).
    rolldownOptions: { output: { codeSplitting: { groups: [{ name: "app", tags: ["$initial"] }, { name: "seviye", test: /[\\/]src[\\/](screens[\\/](Seviye|Sinav)\.tsx|ui[\\/]denemeMadde\.tsx)$/ }] } } }
  },
  server: { port: 5173 },
  preview: { port: 4173 }
});
