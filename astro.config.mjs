import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://nkahale.github.io",
  base: "/cv-spec",
  outDir: "dist",
  build: {
    format: "file",
  },
});
