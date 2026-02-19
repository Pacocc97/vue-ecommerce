// vitest.config.ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true, // Permite usar 'describe', 'it', 'expect' sin importarlos cada vez
      environment: 'jsdom', // Simula el navegador
    },
  }),
);
