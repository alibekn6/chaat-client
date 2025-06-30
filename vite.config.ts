import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // This is equivalent to '0.0.0.0' and makes it accessible
    port: 5173,
    watch: {
      usePolling: true,
    },
    // Removed proxy configuration - we handle API routing through environment variables
    // Development: Direct connection to localhost:8000
    // Production: nginx proxies /api to backend
  },
})
