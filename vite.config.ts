// vite.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'lcov', 'html'],
    },
    // Fix "Failed to load url local-pkg" with pnpm: inline so Vite resolves it
    server: {
      deps: {
        inline: ['local-pkg'],
      },
    },
  },
});
