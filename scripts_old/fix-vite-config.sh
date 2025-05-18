#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}AMÉLIORATION DE LA CONFIGURATION VITE${NC}"
echo -e "${BLUE}=====================================${NC}"

# Sauvegarder la configuration actuelle
echo -e "${YELLOW}Sauvegarde de la configuration Vite actuelle...${NC}"
cp frontend/vite.config.js frontend/vite.config.js.backup

# Mettre à jour la configuration Vite
echo -e "${YELLOW}Mise à jour de la configuration Vite...${NC}"

cat > frontend/vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Plugin personnalisé pour intercepter les imports de prop-types
    {
      name: 'replace-prop-types',
      resolveId(id) {
        // Si on demande prop-types, rediriger vers notre fichier patch.js
        if (id === 'prop-types') {
          return path.resolve(__dirname, 'src/patch.js');
        }
        return null;
      }
    },
    // Plugin personnalisé pour surveiller les erreurs de WebSocket
    {
      name: 'ws-reconnect-plugin',
      configureServer(server) {
        const originalWsClose = server.ws.close;
        server.ws.close = function() {
          console.log('WebSocket se ferme, tentative de reconnexion...');
          setTimeout(() => {
            try {
              server.ws.open();
              console.log('WebSocket reconnecté avec succès!');
            } catch (error) {
              console.error('Erreur lors de la reconnexion WebSocket:', error);
            }
          }, 1000);
          return originalWsClose.apply(this, arguments);
        };
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true, // Échouer si le port est déjà utilisé
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Erreur de proxy:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxy request:', req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Proxy response:', proxyRes.statusCode, req.url);
          });
        },
        // Options avancées pour améliorer la stabilité
        proxyTimeout: 10000, // 10 secondes de timeout
        timeout: 10000
      },
    },
    hmr: {
      overlay: true,
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
      clientPort: 3000, 
      // Options pour améliorer la stabilité du HMR
      timeout: 10000,
      maxRetries: 5,
      reconnect: true,
    },
    watch: {
      usePolling: true,
      interval: 500, // Intervalle de polling plus élevé pour réduire la charge CPU
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
    },
    // Ajout d'un middleware pour vérifier l'état du backend
    middlewares: [
      (req, res, next) => {
        if (req.url.startsWith('/api')) {
          // Vérifier si le backend est accessible
          const http = require('http');
          const options = {
            hostname: 'localhost',
            port: 5001,
            path: '/',
            method: 'GET',
            timeout: 1000
          };
          
          const healthCheck = http.request(options, (response) => {
            if (response.statusCode === 200) {
              next();
            } else {
              res.statusCode = 503;
              res.end(JSON.stringify({ error: 'Le serveur backend est indisponible' }));
            }
          });
          
          healthCheck.on('error', () => {
            res.statusCode = 503;
            res.end(JSON.stringify({ error: 'Le serveur backend est indisponible' }));
          });
          
          healthCheck.end();
        } else {
          next();
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'prop-types': path.resolve(__dirname, './src/patch.js'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mantine: ['@mantine/core', '@mantine/hooks', '@mantine/form'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Ne pas supprimer les console.log en production
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    exclude: ['prop-types'], // Exclure prop-types de l'optimisation
    include: ['react', 'react-dom', 'react-router-dom', '@mantine/core', '@mantine/hooks'],
    force: true,
    esbuildOptions: {
      target: 'esnext',
      supported: { 
        'top-level-await': true 
      },
    },
  },
  esbuild: {
    target: 'esnext',
    supported: { 
      'top-level-await': true 
    },
  },
});
EOF

# Mettre à jour le code API.js pour améliorer la gestion des erreurs
echo -e "${YELLOW}Mise à jour de la configuration API.js...${NC}"
cp frontend/src/services/api.js frontend/src/services/api.js.backup

cat > frontend/src/services/api.js << 'EOF'
import axios from 'axios';
import { notifications } from '@mantine/notifications';

// Définir l'URL de base de l'API
const baseURL = import.meta.env.VITE_API_URL || '/api';

// Cache simple pour les requêtes GET
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Compteur de tentatives
const retryCounter = new Map();
const MAX_RETRIES = 3;

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Timeout de 15 secondes
  // Répétition automatique des requêtes en cas d'échec réseau
  retry: MAX_RETRIES,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Délai exponentiel entre les tentatives
  }
});

// Fonction pour gérer le cache
const getCachedData = (url) => {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (url, data) => {
  cache.set(url, {
    data,
    timestamp: Date.now(),
  });
};

// Fonction pour vérifier la santé du backend
const checkBackendHealth = async () => {
  try {
    await axios.get('/api', { timeout: 2000 });
    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification de santé du backend:', error);
    return false;
  }
};

// Ajouter l'intercepteur pour les requêtes
API.interceptors.request.use(
  async (config) => {
    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Vérifier le cache pour les requêtes GET
    if (config.method === 'get') {
      const cachedData = getCachedData(config.url);
      if (cachedData) {
        return Promise.reject({
          __CACHE_HIT__: true,
          data: cachedData,
        });
      }
    }
    
    // Ajouter un identifiant de requête unique
    config.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    return config;
  },
  (error) => {
    console.error('Erreur de requête API:', error);
    return Promise.reject(error);
  }
);

// Ajouter l'intercepteur pour les réponses
API.interceptors.response.use(
  (response) => {
    // Réinitialiser le compteur de tentatives
    retryCounter.delete(response.config.url);
    
    // Mettre en cache les réponses GET
    if (response.config.method === 'get') {
      setCachedData(response.config.url, response.data);
    }
    return response;
  },
  async (error) => {
    // Gérer les hits de cache
    if (error.__CACHE_HIT__) {
      return Promise.resolve({ data: error.data });
    }

    // Récupérer l'URL et la config
    const { config } = error;
    if (!config) {
      return Promise.reject(error);
    }

    // Compter les tentatives
    const retryCount = retryCounter.get(config.url) || 0;
    
    // Réessayer si on n'a pas dépassé le nombre max de tentatives pour les erreurs réseau
    if ((error.code === 'ECONNABORTED' || !error.response) && retryCount < MAX_RETRIES) {
      retryCounter.set(config.url, retryCount + 1);
      
      // Notification de nouvelle tentative
      notifications.show({
        title: 'Problème de connexion',
        message: `Nouvelle tentative (${retryCount + 1}/${MAX_RETRIES})...`,
        color: 'orange',
        autoClose: 2000,
      });
      
      // Délai avant nouvelle tentative
      await new Promise(resolve => setTimeout(resolve, (retryCount + 1) * 1000));
      
      return API(config);
    }

    // Gérer les erreurs de timeout
    if (error.code === 'ECONNABORTED') {
      notifications.show({
        title: 'Erreur de connexion',
        message: 'La requête a pris trop de temps. Vérifiez que le serveur backend est actif.',
        color: 'red',
      });
    }

    // Gérer les erreurs de réseau
    if (!error.response) {
      // Vérifier si le backend est en vie
      const isBackendAlive = await checkBackendHealth();
      
      if (!isBackendAlive) {
        notifications.show({
          title: 'Erreur de connexion',
          message: 'Le serveur backend semble être arrêté. Veuillez redémarrer l\'application.',
          color: 'red',
        });
      } else {
        notifications.show({
          title: 'Erreur de connexion',
          message: 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.',
          color: 'red',
        });
      }
    }

    return Promise.reject(error);
  }
);

// Fonction pour vider le cache
export const clearCache = () => {
  cache.clear();
};

// Fonction pour vider le cache d'une URL spécifique
export const clearCacheForUrl = (url) => {
  cache.delete(url);
};

export default API;
EOF

echo -e "${GREEN}Configuration Vite et API mises à jour avec succès!${NC}"
echo -e "${YELLOW}Les fichiers originaux ont été sauvegardés avec l'extension .backup${NC}"

# Ajouter un gestionnaire d'erreurs global au frontend
echo -e "${YELLOW}Ajout d'un gestionnaire d'erreurs global au frontend...${NC}"

# Créer le fichier de gestionnaire d'erreurs
cat > frontend/src/utils/errorHandler.js << 'EOF'
/**
 * Gestionnaire d'erreurs global pour l'application frontend
 */

import { notifications } from '@mantine/notifications';

// Compteur d'erreurs
let errorCount = 0;
const ERROR_THRESHOLD = 5;
let lastErrorTime = 0;

// Fonction pour réinitialiser le compteur d'erreurs après un certain temps
const resetErrorCountAfterDelay = () => {
  const now = Date.now();
  if (now - lastErrorTime > 60000) { // 1 minute
    errorCount = 0;
  }
  lastErrorTime = now;
};

// Fonction pour redémarrer l'application en cas de problèmes critiques
const attemptRestart = () => {
  notifications.show({
    title: 'Redémarrage de l\'application',
    message: 'Tentative de récupération après erreurs multiples...',
    color: 'orange',
    autoClose: false,
  });
  
  // Vider le localStorage
  localStorage.removeItem('last_error');
  
  // Recharger la page après un court délai
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};

// Gestionnaire d'erreurs global
const handleGlobalError = (error, errorInfo = null) => {
  console.error('Erreur globale interceptée:', error);
  
  // Incrémenter le compteur et vérifier s'il faut réinitialiser
  resetErrorCountAfterDelay();
  errorCount++;
  
  // Stocker la dernière erreur dans le localStorage
  try {
    localStorage.setItem('last_error', JSON.stringify({
      message: error.message || 'Erreur inconnue',
      stack: error.stack,
      time: new Date().toISOString(),
    }));
  } catch (e) {
    console.error('Impossible de stocker l\'erreur dans localStorage:', e);
  }
  
  // Afficher une notification d'erreur
  notifications.show({
    title: 'Erreur dans l\'application',
    message: error.message || 'Une erreur inattendue s\'est produite',
    color: 'red',
  });
  
  // Si trop d'erreurs se produisent, tenter un redémarrage
  if (errorCount >= ERROR_THRESHOLD) {
    attemptRestart();
  }
};

// Configuration du gestionnaire d'erreurs non interceptées
const setupGlobalErrorHandlers = () => {
  // Erreurs JavaScript non interceptées
  window.onerror = (message, source, lineno, colno, error) => {
    handleGlobalError(error || new Error(message));
    return false; // Permet également au gestionnaire d'erreurs par défaut de s'exécuter
  };
  
  // Rejets de promesses non gérés
  window.onunhandledrejection = (event) => {
    handleGlobalError(event.reason || new Error('Promesse rejetée non gérée'));
  };
};

export { handleGlobalError, setupGlobalErrorHandlers };
EOF

# Modifier le fichier main.jsx pour intégrer le gestionnaire d'erreurs
echo -e "${YELLOW}Intégration du gestionnaire d'erreurs dans main.jsx...${NC}"
cp frontend/src/main.jsx frontend/src/main.jsx.backup

cat > frontend/src/main.jsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import App from './App';
import './index.css';
import { setupGlobalErrorHandlers } from './utils/errorHandler';

// Configurer les gestionnaires d'erreurs globaux
setupGlobalErrorHandlers();

// Classe de composant d'erreur pour capturer les erreurs React
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erreur capturée par ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Une erreur s'est produite</h2>
          <p>L'application a rencontré un problème. Veuillez rafraîchir la page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 15px',
              backgroundColor: '#228be6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '15px'
            }}
          >
            Rafraîchir la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <MantineProvider>
        <Notifications position="top-right" />
        <App />
      </MantineProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
EOF

echo -e "${GREEN}Toutes les modifications ont été appliquées avec succès!${NC}"
echo -e "${YELLOW}Redémarrez les serveurs pour appliquer les changements.${NC}" 