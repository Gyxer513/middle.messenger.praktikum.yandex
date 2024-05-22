import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@core': resolve(__dirname, 'src/@core'),
    },
  },
  server: {
    port: 3000
  },
  root: resolve(__dirname, 'src'),
  build: {
   outDir: resolve(__dirname, 'dist')
  }
});
