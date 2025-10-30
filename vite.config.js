import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://proyectoretos-production.up.railway.app', // Si necesitas comunicarte con un backend Laravel
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        outDir: 'dist',
    },
});
