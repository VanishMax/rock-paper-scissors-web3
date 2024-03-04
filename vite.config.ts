import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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

  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
