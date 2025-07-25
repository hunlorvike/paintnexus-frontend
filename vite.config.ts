import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
