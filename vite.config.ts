import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

import svgrTemplate from './svgr-template';

export default defineConfig(() => ({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    nodePolyfills(),
    svgr({
      svgrOptions: {
        template: svgrTemplate,
      },
      include: ['src/**/*.svg'],
    }),
  ],
  test: {
    // for vitest-preview
    css: true,

    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'istanbul' as const,
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      all: true,
    },
    globals: true, // needed to avoid import of describe, it, expect
    environment: 'jsdom', // for integration tests using testing library
    setupFiles: ['./src/vitest-setup.ts'],
    // https://github.com/vitest-dev/vitest/issues/2834#issuecomment-1439576110
    alias: [{ find: /^@\//, replacement: './src/' }],
  },
  define: {
    'process.env': {},
  },
}));
