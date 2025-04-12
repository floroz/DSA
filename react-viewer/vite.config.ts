import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import path module
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  // Root directory is set by the CLI command ('vite react-viewer ...')
  // Define the base public path when served in development or production.
  // Since index.html is at the root of 'react-viewer', base should be '/'
  base: "/",
  resolve: {
    alias: {
      // Alias @ to the parent directory (project root: /Users/floroz/Repository/DSA)
      "@": path.resolve(__dirname, "../"),
    },
  },
  server: {
    // Optional: Configure server port if needed
    // port: 3000,
  },
  build: {
    // Output directory relative to the 'root' option
    outDir: "dist",
  },
});
