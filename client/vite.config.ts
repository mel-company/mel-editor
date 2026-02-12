import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@templates': path.resolve(__dirname, '../templates/ecommerce/retail-v1'),
        },
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    },
    server: {
        fs: {
            allow: ['..'],
        },
    },
    ssr: {
        // Mark problematic dependencies as external (use Node resolution)
        external: ['react-router-dom', 'react-router'],
        // Exclude problematic files from SSR
        noExternal: [],
    },
    build: {
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
    // Fix for Chrome DevTools JSON parsing issue
    optimizeDeps: {
        exclude: ['.well-known'],
    },
})
