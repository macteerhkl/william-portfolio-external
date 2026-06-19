import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // 开发环境使用 '/'，生产环境使用 '/william-portfolio-external/'
  const base = mode === 'production' ? '/william-portfolio-external/' : '/'

  return {
    plugins: [react()],
    base: base,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            motion: ['framer-motion'],
          },
        },
      },
    },
  }
})
