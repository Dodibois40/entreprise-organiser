#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}     DÉMARRAGE RAPIDE DES SERVEURS    ${NC}"
echo -e "${BLUE}======================================${NC}"

# Arrêter les processus existants
echo -e "${YELLOW}Arrêt des processus existants...${NC}"
if pm2 list | grep -q "backend"; then
  pm2 delete backend
fi

# Vérifier et tuer le processus sur le port 5173 (Vite)
PORT_PID=$(lsof -ti:5173 2>/dev/null)
if [ -n "$PORT_PID" ]; then
  echo -e "${YELLOW}Arrêt du processus frontend existant...${NC}"
  kill -9 $PORT_PID 2>/dev/null
fi

# Démarrer le backend
echo -e "${GREEN}Démarrage du backend...${NC}"
cd backend
npm run build
pm2 start npm --name "backend" -- run start
cd ..

# Démarrer le frontend
echo -e "${GREEN}Démarrage du frontend...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo -e "${GREEN}✅ Serveurs démarrés avec succès!${NC}"
echo -e "Backend: http://localhost:5001"
echo -e "Frontend: http://localhost:5173"
echo -e "Logs backend: pm2 logs backend"

# Attendre que l'utilisateur arrête le script
echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter les serveurs...${NC}"
trap "kill $FRONTEND_PID 2>/dev/null; pm2 delete backend; echo -e '${RED}Serveurs arrêtés.${NC}'; exit" INT
wait 