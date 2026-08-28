import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(process.cwd(), "client/src") } },
  root: path.resolve(process.cwd(), "client"),
  publicDir: path.resolve(process.cwd(), "client/public"),
  build: { outDir: path.resolve(process.cwd(), "docs"), emptyOutDir: true }
});
