import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
