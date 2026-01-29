import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./client/src"),
            "@templates": path.resolve(__dirname, "./templates/ecommerce/retail-v1"),
        },
    },
    build: {
        outDir: 'dist-template',
        rollupOptions: {
            input: 'generated-index.html',
        },
        emptyOutDir: true,
    }
})
