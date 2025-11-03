import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setupTest.ts",
    include: ["**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  }
});
