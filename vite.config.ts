import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('./src', import.meta.url))),
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
  // Оптимизация для production build
  build: {
    // Увеличиваем chunk warning лимит
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Настройка manual chunks для оптимизации
        manualChunks: {
          // Vendor chunk - все node_modules
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI components chunk
          ui: ['@radix-ui/react-label', 'lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          // Utils chunk
          utils: ['axios'],
          // Syntax highlighter отдельно (довольно тяжелый)
          syntax: ['react-syntax-highlighter']
        }
      }
    },
    // Минификация
    minify: 'terser',
    // Оптимизация CSS
    cssMinify: true,
    // Source maps только для production debug
    sourcemap: false,
    // Оптимизация размера
    target: 'esnext',
    // Удаление console.log в production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
