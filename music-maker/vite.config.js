import { defineConfig } from "vite";

export default defineConfig({
  base: "/musicMaker.js/",
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
