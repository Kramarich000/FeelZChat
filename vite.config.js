/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
// import viteCompression from 'vite-plugin-compression';
// import { analyzer } from 'vite-bundle-analyzer'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // viteCompression(),
    // analyzer(),
  ], 
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
  build: {
    target: 'esnext',  
    minify: 'esbuild',  
    cssCodeSplit: true,  
  },
});
