#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}     DÉMARRAGE DU SERVEUR BACKEND     ${NC}"
echo -e "${BLUE}======================================${NC}"

# Vérifier si le processus existe déjà sur le port 5001
PORT_PID=$(lsof -ti:5001 2>/dev/null)
if [ -n "$PORT_PID" ]; then
    echo -e "${YELLOW}Le port 5001 est déjà utilisé par le processus $PORT_PID.${NC}"
    echo -e "${YELLOW}Arrêt du processus...${NC}"
    kill $PORT_PID
    sleep 2
    
    # Vérifier si le processus s'est arrêté
    if lsof -ti:5001 >/dev/null 2>&1; then
        echo -e "${RED}Impossible d'arrêter le processus. Tentative d'arrêt forcé...${NC}"
        kill -9 $(lsof -ti:5001)
        sleep 1
    fi
fi

# Vérifier la présence des modules node
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installation des dépendances backend...${NC}"
    npm install
fi

# Vérifier si nodemon est installé localement
if ! npm list nodemon >/dev/null 2>&1; then
    echo -e "${YELLOW}Installation de nodemon...${NC}"
    npm install --save-dev nodemon
fi

# Créer un fichier de configuration nodemon si nécessaire
if [ ! -f "nodemon.json" ]; then
    echo -e "${YELLOW}Création de la configuration nodemon...${NC}"
    cat > nodemon.json << EOL
{
  "verbose": true,
  "ignore": [
    ".git",
    "node_modules/**/node_modules",
    "logs/*"
  ],
  "watch": [
    "src/**/*.js"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js,json",
  "delay": "1000",
  "restartable": "rs"
}
EOL
fi

# Démarrer le serveur backend
echo -e "${GREEN}Démarrage du serveur backend sur http://localhost:5001${NC}"
echo -e "${GREEN}Appuyez sur Ctrl+C pour arrêter le serveur${NC}"

# Lancer le serveur avec nodemon pour un redémarrage automatique en cas de changement
npx nodemon src/index.js 