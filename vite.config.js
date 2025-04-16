/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
// import { analyzer } from 'vite-bundle-analyzer';
import VitePreload from 'vite-plugin-preload';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/src\//,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /\/node_modules\//,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /.*\.(png|jpg|jpeg|svg|mp3|woff2)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
          {
            urlPattern: /\/assets\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      manifest: {
        name: 'FeelZChat',
        short_name: 'FZ',
        description: 'Мессенджер для общения с ИИ',
        theme_color: '#0E7490',
        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      screenshots: [
        {
          src: "screenshots/app-mobile.png",
          sizes: "540x720",
          type: "image/png",
          form_factor: "narrow"
        },
        {
          src: "screenshots/app-desktop.png",
          sizes: "1024x768",
          type: "image/png",
          form_factor: "wide"
        }
      ]
    }),
    // analyzer(),
    ViteImageOptimizer({
      jpeg: {
        quality: 75,
      },
      png: {
        quality: 75,
      },
      svg: {
        multipass: true,
      },
      gif: {
        optimizationLevel: 3,
      },
      webp: {
        quality: 75,
      }
    }),
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


    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         if (id.includes('react') || id.includes('react-dom')) return 'react';
    //         if (id.includes('formik')) return 'formik';
    //         if (id.includes('framer-motion')) return 'motion';
    //         if (id.includes('axios')) return 'axios';
    //         if (id.includes('react-router')) return 'router';
    //         return 'vendor';
    //       }

    //       const srcPath = (dir) => id.includes(path.resolve(__dirname, `src/${dir}`));

    //       if (srcPath('assets')) return 'assets';
    //       if (srcPath('components')) return 'components';
    //       if (srcPath('hooks')) return 'hooks';
    //       if (srcPath('services')) return 'services';
    //       if (srcPath('utils')) return 'utils';
    //       if (srcPath('validate')) return 'validate';

    
    //       return 'misc';
    //     },
    //   }
    // }

  },
});
