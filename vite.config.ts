import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    {
      name: "inline-webp-dev",
      apply: "serve",
      enforce: "pre",
      load(id) {
        const cleanId = id.split("?")[0];
        if (cleanId.endsWith(".webp") && fs.existsSync(cleanId)) {
          const base64 = fs.readFileSync(cleanId).toString("base64");
          return `export default "data:image/webp;base64,${base64}";`;
        }
      },
    },
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
