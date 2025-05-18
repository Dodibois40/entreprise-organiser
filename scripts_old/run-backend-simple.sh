#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Démarrage du backend...${NC}"

# S'assurer qu'aucun autre processus n'utilise le port 5001
echo -e "${YELLOW}Libération du port 5001 si nécessaire...${NC}"
sudo fuser -k 5001/tcp 2>/dev/null || true
sleep 1

# Se déplacer dans le répertoire backend
cd backend

# Démarrer le serveur
echo -e "${GREEN}Serveur backend disponible sur http://localhost:5001${NC}"
node src/index.js 