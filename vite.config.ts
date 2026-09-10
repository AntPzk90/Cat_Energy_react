import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // автоматически подключаем переменные и миксины в каждый .scss файл
        additionalData: `@use "@/styles/title" as *; @use "@/styles/variables" as *; @use "@/styles/mixins" as *;`,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
