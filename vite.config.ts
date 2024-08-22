import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "https://mydocctor-server-7.onrender.com",
        secure: false,
        ws: true,
      },
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
});
