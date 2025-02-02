import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Get the absolute path of the current working directory
const root = path.resolve(__dirname);

export default defineConfig({
    plugins: [react()],
    base: '/cs2-config-generator/',
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
                main: 'index.html',
            },
            output: {
                manualChunks: undefined,
            },
        },
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(root, 'src') }
        ]
    },
});