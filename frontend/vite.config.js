import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config with a dev-server proxy so the frontend can call /api without CORS issues
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
