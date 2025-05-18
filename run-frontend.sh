#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}     DÉMARRAGE DU SERVEUR FRONTEND    ${NC}"
echo -e "${BLUE}======================================${NC}"

# Vérifier si le processus existe déjà sur le port 5173 (port par défaut de Vite)
PORT_PID=$(lsof -ti:5173 2>/dev/null)
if [ -n "$PORT_PID" ]; then
    echo -e "${YELLOW}Le port 5173 est déjà utilisé par le processus $PORT_PID.${NC}"
    echo -e "${YELLOW}Arrêt du processus...${NC}"
    kill $PORT_PID
    sleep 2
    
    # Vérifier si le processus s'est arrêté
    if lsof -ti:5173 >/dev/null 2>&1; then
        echo -e "${RED}Impossible d'arrêter le processus. Tentative d'arrêt forcé...${NC}"
        kill -9 $(lsof -ti:5173)
        sleep 1
    fi
fi

# Accéder au répertoire frontend
cd frontend

# Vérifier la présence des modules node
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installation des dépendances frontend...${NC}"
    npm install
fi

# Toujours recréer la configuration Vite pour s'assurer qu'elle contient les bonnes options
echo -e "${YELLOW}La configuration Vite a été mise à jour.${NC}"

# Mise à jour du package.json pour ajouter le script dev
if ! grep -q '"dev"' package.json; then
    echo -e "${YELLOW}Mise à jour du package.json...${NC}"
    sed -i 's/"scripts": {/"scripts": {\n    "dev": "vite",/' package.json
fi

# Créer un script de démarrage pour le navigateur
if [ ! -d "public" ]; then
    mkdir -p public
fi

cat > public/spa-redirect.js << EOL
// Ce script gère les redirections SPA et définit les variables globales requises
(function() {
  // Définir module et require pour les bibliothèques CommonJS
  if (typeof window.module === 'undefined') {
    window.module = { exports: {} };
  }
  if (typeof window.require === 'undefined') {
    window.require = function(name) {
      console.warn('require(' + name + ') appelé dans un environnement ESM');
      return {};
    };
  }
  if (typeof window.global === 'undefined') {
    window.global = window;
  }
  
  // Gestion des redirections SPA
  const path = window.location.pathname;
  if (path !== '/' && !path.includes('.')) {
    sessionStorage.setItem('spa-redirect', path);
  }
})();
EOL

# Démarrer le serveur frontend
echo -e "${GREEN}Démarrage du serveur frontend sur http://localhost:5173${NC}"
echo -e "${GREEN}Appuyez sur Ctrl+C pour arrêter le serveur${NC}"

# Lancer le serveur de développement
npm run dev 