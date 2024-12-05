import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@headlessui/react', '@heroicons/react'],
            utils: ['axios', 'date-fns', 'clsx'],
            chat: ['socket.io-client', 'emoji-picker-react'],
            animations: ['framer-motion', 'react-spring'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      target: 'esnext',
      minify: 'esbuild',
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/socket.io': {
          target: env.VITE_SOCKET_URL,
          ws: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@headlessui/react',
        '@heroicons/react',
        'socket.io-client',
        'framer-motion',
      ],
    },
  };
});