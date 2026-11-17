import { defineConfig } from "vitest/config";

// Tek kökten bütün birim testleri: packages/shared, web/src/core, web/src/data, web/src/services, worker, content/tools
export default defineConfig({
  test: {
    include: [
      "packages/*/src/**/*.test.ts",
      "web/src/**/*.test.ts",
      "worker/src/**/*.test.ts",
      "worker/test/**/*.test.ts",
      "content/tools/**/*.test.ts"
    ],
    environment: "node",
    setupFiles: ["./vitest.setup.ts"]
  },
  oxc: { jsx: { runtime: "automatic", importSource: "preact" } }
});
