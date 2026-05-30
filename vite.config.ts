import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/omniverse-3d-visions/",
  plugins: [
    tailwindcss(),
    TanStackRouterVite(),
    react(),
    tsconfigPaths(),
  ],
});
