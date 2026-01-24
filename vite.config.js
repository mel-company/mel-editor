import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // Mark problematic dependencies as external (use Node resolution)
    external: ['react-router-dom', 'react-router'],
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
