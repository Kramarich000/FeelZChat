/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import { analyzer } from 'vite-bundle-analyzer';
import VitePreload from 'vite-plugin-preload';
import { VitePWA } from 'vite-plugin-pwa';
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // VitePWA(),
    // analyzer(),
    // ViteImageOptimizer ({
    //   jpeg: {
    //     quality: 75,
    //   },
    //   png: {
    //     quality: [0.65, 0.9],
    //   },
    //   svg: {
    //     multipass: true,
    //   },
    //   gif: {
    //     optimizationLevel: 3,
    //   },
    //   webp: {
    //     quality: 75,
    //   }
    // }),
    VitePreload()
  ],
  optimizeDeps: {
    include: ['framer-motion'],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@errors': path.resolve(__dirname, 'src/pages/errors'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@metadata': path.resolve(__dirname, 'src/metadata'),
      '@validate': path.resolve(__dirname, 'src/validate'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  },
  server: {
    historyApiFallback: true,
  },
  mode: 'production',
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/assets')) {
            return 'assets';
          }
          if (id.includes('src/components')) {
            return 'components';
          }
          if (id.includes('src/hooks')) {
            return 'hooks';
          }
          if (id.includes('src/services')) {
            return 'services';
          }
          if (id.includes('src/utils')) {
            return 'utils';
          }
          if (id.includes('src/validate')) {
            return 'validate';
          }
        },
      }
    }
  },
});
