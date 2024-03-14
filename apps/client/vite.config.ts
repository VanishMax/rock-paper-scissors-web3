/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/client',

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  plugins: [
    react(),
    nxViteTsPaths(),

    svgr({
      include: '**/*.svg',
      svgrOptions: {
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        }
      }
    }),
  ],

  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },

  build: {
    outDir: '../../dist/apps/client',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  resolve: {
    alias: {
      app: fileURLToPath(new URL('./src/app', import.meta.url)),
      features: fileURLToPath(new URL('./src/features', import.meta.url)),
      shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
      entities: fileURLToPath(new URL('./src/entities', import.meta.url)),
      widgets: fileURLToPath(new URL('./src/widgets', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
    },
  },
});
