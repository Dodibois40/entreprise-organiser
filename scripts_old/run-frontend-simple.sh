#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Démarrage du frontend...${NC}"

# S'assurer qu'aucun autre processus n'utilise le port 3000
echo -e "${YELLOW}Libération du port 3000 si nécessaire...${NC}"
sudo fuser -k 3000/tcp 2>/dev/null || true
sleep 1

# Se déplacer dans le répertoire frontend
cd frontend

# Démarrer le serveur
echo -e "${GREEN}Serveur frontend disponible sur http://localhost:3000${NC}"
npm run dev 