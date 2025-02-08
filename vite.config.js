import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    server: {
        open: "/",
    },
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@contexts': '/src/contexts',
        }
    }
})
