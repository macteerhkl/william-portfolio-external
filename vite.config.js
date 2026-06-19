import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/william-portfolio-external/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
        },
      },
    },
  },
})
