// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // Pastikan root benar
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: {
        main: './index.html' // Pastikan path ke index.html benar
      }
    }
  },
  base: './' // Untuk relative paths
})