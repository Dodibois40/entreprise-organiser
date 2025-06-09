#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}     DÉMARRAGE DES SERVEURS           ${NC}"
echo -e "${BLUE}======================================${NC}"

# Rendre les scripts exécutables
chmod +x backend/start-backend.sh
chmod +x frontend/start-frontend.sh

# Démarrer le backend en arrière-plan
echo -e "${YELLOW}Démarrage du serveur backend...${NC}"
cd backend
./start-backend.sh &
BACKEND_PID=$!
echo -e "${GREEN}Serveur backend démarré avec PID: $BACKEND_PID${NC}"

# Attendre un peu pour que le backend démarre
sleep 3

# Démarrer le frontend en arrière-plan
echo -e "${YELLOW}Démarrage du serveur frontend...${NC}"
cd ../frontend
./start-frontend.sh &
FRONTEND_PID=$!
echo -e "${GREEN}Serveur frontend démarré avec PID: $FRONTEND_PID${NC}"

echo -e "${GREEN}Les deux serveurs sont démarrés.${NC}"
echo -e "${GREEN}Frontend: http://localhost:5173${NC}"
echo -e "${GREEN}Backend: http://localhost:5001${NC}"
echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter les deux serveurs${NC}"

# Attendre une entrée utilisateur pour arrêter les serveurs
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo -e '${RED}Arrêt des serveurs...${NC}'; exit" INT
wait 
