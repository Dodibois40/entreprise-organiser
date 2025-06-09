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

# Vérifier la présence des modules node
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installation des dépendances frontend...${NC}"
    npm install
fi

# Démarrer le serveur frontend
echo -e "${GREEN}Démarrage du serveur frontend sur http://localhost:5173${NC}"
echo -e "${GREEN}Appuyez sur Ctrl+C pour arrêter le serveur${NC}"

# Lancer le serveur de développement
npm run dev 