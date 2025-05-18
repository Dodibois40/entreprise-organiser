import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configuration Vite
export default defineConfig({
  plugins: [
    react({
      // Activer le JSX runtime pour améliorer les performances
      jsxRuntime: 'automatic',
      // Forcer React en mode développement pour les meilleurs messages d'erreur
      jsxDev: true,
      // Inclure les composants qui créent souvent des problèmes
      include: [
        /\.[jt]sx?$/,
        '/node_modules/react-transition-group',
        '/node_modules/@mantine/'
      ]
    })
  ],
  resolve: {
    alias: {
      // Définir les alias pour faciliter les imports
      '@': path.resolve(__dirname, './src'),
      // Assurer que les mêmes instances de React sont utilisées partout
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
  },
  optimizeDeps: {
    include: [
      'prop-types',
      'react',
      'react-dom',
      'react-router-dom', 
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/dates',
      '@mantine/notifications',
      'dayjs'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,
      },
    },
    // Passer de 3000 à 5173 (port par défaut de Vite)
    port: 5173,
    strictPort: true, 
    host: true,
    hmr: {
      overlay: false,
      clientPort: 5173,
      timeout: 120000,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  define: {
    'process.env': {},
    'global': 'window',
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    // Générer des sourcemaps pour faciliter le débogage
    sourcemap: true,
    // Éviter de minifier pour faciliter le débogage
    minify: false,
    // Configurer le rollup pour traiter certains modules problématiques
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mantine-vendor': ['@mantine/core', '@mantine/hooks', '@mantine/dates', '@mantine/notifications']
        }
      }
    }
  }
});
