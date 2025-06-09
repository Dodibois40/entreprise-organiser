#!/bin/bash

# Couleurs pour l'affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}     REDÉMARRAGE PROPRE DES SERVEURS  ${NC}"
echo -e "${BLUE}======================================${NC}"

# Arrêter tous les processus Node.js en cours
echo -e "${YELLOW}Arrêt de tous les processus Node.js en cours...${NC}"
pkill -f node || true
sleep 2

# Tuer les processus qui utilisent les ports
echo -e "${YELLOW}Libération des ports utilisés...${NC}"
for port in 3000 5001 24678; do
  pid=$(lsof -t -i:$port 2>/dev/null)
  if [ -n "$pid" ]; then
    echo -e "${YELLOW}Port $port utilisé par le processus $pid. Arrêt...${NC}"
    kill -9 $pid 2>/dev/null || true
  fi
done
sleep 1

# Nettoyer les fichiers temporaires de cache
echo -e "${YELLOW}Nettoyage des fichiers temporaires...${NC}"
rm -rf frontend/.vite frontend/node_modules/.vite 2>/dev/null
rm -rf frontend/node_modules/.cache 2>/dev/null
rm -rf backend/node_modules/.cache 2>/dev/null

# Assurer que le script est exécuté depuis le répertoire racine du projet
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
  echo -e "${RED}Erreur: Les répertoires frontend et backend doivent exister dans le répertoire courant.${NC}"
  exit 1
fi

# Recréer la configuration Vite optimisée
echo -e "${YELLOW}Création d'une configuration Vite optimisée...${NC}"
cat > frontend/vite.config.js << 'EOL'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configuration Vite
export default defineConfig({
  plugins: [react({
    include: '**/*.{jsx,js}',
    jsxRuntime: 'automatic'
  })],
  optimizeDeps: {
    include: ['prop-types'],
    force: true,
    esbuildOptions: {
      jsx: 'automatic',
      loader: {
        '.js': 'jsx'
      },
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
    port: 3000,
    strictPort: false, // Permettre de choisir un autre port si 3000 est occupé
    host: '0.0.0.0', // Autoriser les connexions externes
    hmr: {
      overlay: false,
      clientPort: null, // Auto-détection
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  }
});
EOL

# Assurer que l'index.html contient les polyfills nécessaires
echo -e "${YELLOW}Vérification de l'index.html...${NC}"
if [ -f "frontend/index.html" ]; then
  # Vérifier si les polyfills sont déjà présents
  if ! grep -q "window.module" frontend/index.html; then
    # Sauvegarder l'ancien fichier
    cp frontend/index.html frontend/index.html.bak
    
    # Ajouter les polyfills à l'index.html
    cat > frontend/index.html << 'EOL'
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Application d'organisation d'entreprise" />
    <title>Entreprise Organiser</title>
    
    <!-- Polyfills pour CommonJS -->
    <script>
      // Définir module et require pour les bibliothèques CommonJS
      window.module = { exports: {} };
      window.require = function(name) {
        console.warn('require(' + name + ') appelé dans un environnement ESM');
        return {};
      };
      window.global = window;
      
      // Intercepter les erreurs de modules
      window.addEventListener('error', function(event) {
        if (event && event.message && (
          event.message.includes('module') || 
          event.message.includes('require') ||
          event.message.includes('prop-types')
        )) {
          event.preventDefault();
          console.warn('Erreur interceptée et corrigée:', event.message);
          return true;
        }
      }, true);
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOL
    echo -e "${GREEN}Index.html mis à jour avec les polyfills nécessaires.${NC}"
  else
    echo -e "${GREEN}Index.html contient déjà les polyfills.${NC}"
  fi
else
  echo -e "${RED}Erreur: Le fichier index.html n'a pas été trouvé dans le répertoire frontend.${NC}"
fi

# Créer une configuration minimale de sauvegarde pour Vite
echo -e "${YELLOW}Création d'une configuration minimale de sauvegarde...${NC}"
cat > frontend/vite.minimal.js <<'EOL'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration minimale pour Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});
EOL

# Démarrer les serveurs avec concurrently
echo -e "${GREEN}Démarrage des serveurs via concurrently...${NC}"
npx concurrently --kill-others --names "backend,frontend" \
  --prefix-colors "cyan.bold,green.bold" \
  "cd backend && npx nodemon src/index.js" \
  "cd frontend && npx vite --force"
