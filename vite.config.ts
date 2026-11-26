import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/MOTIONX/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Keep heavy 3D and animation runtimes in their own cacheable chunks.
        manualChunks: {
          three: ["three", "@react-three/fiber"],
          gsap: ["gsap", "@gsap/react", "lenis"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
