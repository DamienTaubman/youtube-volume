import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        contentScript: resolve(__dirname, "src/content-script.js"),
        inject: resolve(__dirname, "src/inject.js"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
    outDir: "dist",
    assetsDir: "", // Keeps assets in the root of the dist folder
  },
});
