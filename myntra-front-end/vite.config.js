import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirect API requests from the frontend to the backend
      '/items': {
        target: 'http://localhost:8080', // Your backend server
        changeOrigin: true, // Needed for virtual hosted sites
        secure: true, // If you're using self-signed certificates for HTTPS
      },
    },
  },
});

