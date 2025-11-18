import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePreloadPlugin from "vite-plugin-preload";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  build: {
    minify: "esbuild",
    target: "esnext",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("node_modules/gsap")) return "gsap";
          if (id.includes("node_modules/react")) return "react";
        },
      },
    },
  },
  plugins: [
    react(),
    vitePreloadPlugin({
      rel: "preload",
      as: "style",
      includeCss: true,
      includeJs: false,
    }),
    glsl({
      include: ["**/*.glsl", "**/*.wgsl", "**/*.vert", "**/*.frag"],
    }),
  ],
});
