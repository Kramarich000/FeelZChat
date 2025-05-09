/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// import checker from 'vite-plugin-checker';
import viteCompression from "vite-plugin-compression";
// import { analyzer } from 'vite-bundle-analyzer';
import VitePreload from "vite-plugin-preload";
import { VitePWA } from "vite-plugin-pwa";
// import { visualizer } from 'rollup-plugin-visualizer';
import imp from "vite-plugin-imp";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import legacy from "@vitejs/plugin-legacy";
import removeConsole from "vite-plugin-remove-console";

import svgr from "vite-plugin-svgr";

const compressionOpts = {
  threshold: 10240,
  filter: /\.(js|css|html|svg|json|txt|xml|wasm)$/,
};
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    //   additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    // }),
    // removeConsole({
    //   exclude: ["error", "warn"],
    // }),
    svgr(),
    imp({
      libList: [
        {
          libName: "lodash-es",
          libDirectory: "",
          camel2DashComponentName: false,
        },
        {
          libName: "date-fns",
          libDirectory: "",
          camel2DashComponentName: false,
        },
        {
          libName: "react-icons",
          libDirectory: "",
          camel2DashComponentName: false,
        },
      ],
    }),
    // visualizer({
    //   filename: './dist/stats.html',
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
    viteCompression({
      ...compressionOpts,
      algorithm: "brotliCompress",
      ext: ".br",
      compressionOptions: { level: 11 },
    }),
    viteCompression({
      ...compressionOpts,
      algorithm: "gzip",
      ext: ".gz",
    }),
    ViteImageOptimizer({
      jpeg: { quality: 75 },
      png: { quality: 75 },
      svg: { multipass: true },
      gif: { optimizationLevel: 3 },
      webp: { quality: 75 },
    }),
    VitePreload({
      rel: "modulepreload",
      include: ["**/*.js"],
    }),

    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/src\//,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /\/node_modules\//,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /.*\.(png|jpg|jpeg|svg|mp3|woff2)/,
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
          {
            urlPattern: /\/assets\//,
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      manifest: {
        name: "FeelZChat",
        short_name: "FZ",
        description: "Мессенджер для общения с ИИ",
        start_url: "/?utm_source=homescreen",
        scope: "/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#0E7490",
        lang: "ru-RU",
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/app-mobile.png",
            sizes: "540x720",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/screenshots/app-desktop.png",
            sizes: "1024x768",
            type: "image/png",
            form_factor: "wide",
          },
        ],
        categories: ["social", "communication"],
      },
    }),

    // analyzer(),

    // checker({ typescript: true, eslint: { lintCommand: 'eslint "src/**/*.{ts,tsx,js,jsx}"' } }),
  ],
  optimizeDeps: {
    include: ["framer-motion"],
    // esbuildOptions: {
    //   plugins: [esbuildCssModules()],
    // },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@errors": path.resolve(__dirname, "src/pages/errors"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@metadata": path.resolve(__dirname, "src/metadata"),
      "@validate": path.resolve(__dirname, "src/validate"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@config": path.resolve(__dirname, "src/config"),
    },
  },
  server: {
    historyApiFallback: true,
    watch: {
      usePolling: true,
    },
    logLevel: "info",
  },
  build: {
    target: "esnext",
    mode: "production",
    minify: "terser",
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
    },
    polyfillModulePreload: true,

    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
});
