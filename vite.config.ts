import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "http://mydocctor.online",
        secure: false,
        ws: true,
      },
    },
    host: true,
    strictPort: true,
  },
});
