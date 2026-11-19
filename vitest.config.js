import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  test: {
    testTimeout: 15000,
    environment: 'jsdom',
    setupFiles: ['./src/library/testSetup.js'],
    globals: true,
    css: true,
  },
});
