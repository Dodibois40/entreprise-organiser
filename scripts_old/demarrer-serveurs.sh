#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}DÉMARRAGE DES SERVEURS DANS DES TERMINAUX SÉPARÉS${NC}"
echo -e "${GREEN}==========================================${NC}"

# Arrêter tous les processus existants
echo -e "${YELLOW}Nettoyage des processus existants...${NC}"
pkill -f node 2>/dev/null || true
pkill -f npm 2>/dev/null || true
pkill -f vite 2>/dev/null || true

# Libérer les ports
echo -e "${YELLOW}Libération des ports...${NC}"
sudo fuser -k 3000/tcp 2>/dev/null || true
sudo fuser -k 5001/tcp 2>/dev/null || true
sleep 2

# Démarrer le backend dans un terminal
echo -e "${GREEN}Démarrage du backend dans un terminal séparé...${NC}"
gnome-terminal --title="Backend Server" -- bash -c "cd $(pwd) && ./run-backend-simple.sh; bash" || \
xterm -T "Backend Server" -e "cd $(pwd) && ./run-backend-simple.sh; bash" || \
konsole --new-tab -p tabtitle="Backend Server" -e "cd $(pwd) && ./run-backend-simple.sh; bash" || \
xfce4-terminal --title="Backend Server" -e "cd $(pwd) && ./run-backend-simple.sh; bash" || \
echo -e "${RED}Impossible d'ouvrir un terminal graphique pour le backend${NC}"

sleep 5

# Démarrer le frontend dans un autre terminal
echo -e "${GREEN}Démarrage du frontend dans un terminal séparé...${NC}"
gnome-terminal --title="Frontend Server" -- bash -c "cd $(pwd) && ./run-frontend-simple.sh; bash" || \
xterm -T "Frontend Server" -e "cd $(pwd) && ./run-frontend-simple.sh; bash" || \
konsole --new-tab -p tabtitle="Frontend Server" -e "cd $(pwd) && ./run-frontend-simple.sh; bash" || \
xfce4-terminal --title="Frontend Server" -e "cd $(pwd) && ./run-frontend-simple.sh; bash" || \
echo -e "${RED}Impossible d'ouvrir un terminal graphique pour le frontend${NC}"

echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}Les serveurs ont été démarrés dans des terminaux séparés${NC}"
echo -e "${GREEN}Backend: http://localhost:5001${NC}"
echo -e "${GREEN}Frontend: http://localhost:3000${NC}"
echo -e "${GREEN}==========================================${NC}" 