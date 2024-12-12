// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig(({ mode }) => {
  // Load environment variables with VITE_ prefix
  const env = loadEnv(mode, process.cwd(), "VITE_");

  // Determine if HTTPS should be enabled based on VITE_ENV
  const isDevelopment = env.VITE_ENV === "development";

  // Define the server configuration
  const serverConfig = {
    port: 5173,
  };

  // Conditionally add HTTPS configuration if in development
  if (isDevelopment) {
    serverConfig.https = {
      key: fs.readFileSync("./localhost-5173-key.pem"),
      cert: fs.readFileSync("./localhost-5173.pem"),
    };
  }

  return {
    plugins: [react()],
    server: serverConfig,
  };
});
