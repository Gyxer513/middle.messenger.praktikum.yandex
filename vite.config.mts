import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000
  },
  root: resolve(__dirname, 'src'),
  build: {
   outDir: resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
});
