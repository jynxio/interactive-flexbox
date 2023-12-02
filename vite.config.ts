import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '$': path.resolve(__dirname, './'),
        },
    },
    build: {
        outDir: 'docs',
    },
});
