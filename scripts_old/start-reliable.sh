#!/bin/bash

# Couleurs pour un meilleur affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Démarrage fiable de l'application Entreprise Organiser ===${NC}"

# Fonction pour vérifier si un port est disponible
check_port() {
  local port=$1
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
    return 0  # Port est utilisé
  else
    return 1  # Port est libre
  fi
}

# Fonction pour tuer les processus sur un port spécifique
kill_process_on_port() {
  local port=$1
  echo -e "${YELLOW}Port $port déjà utilisé, arrêt du processus...${NC}"
  fuser -k -n tcp $port > /dev/null 2>&1
  sleep 2
}

# Fonction pour vérifier si un serveur répond
check_server() {
  local url=$1
  local max_attempts=$2
  local attempt=1
  
  echo -e "${YELLOW}Vérification de $url (max $max_attempts tentatives)${NC}"
  
  while [ $attempt -le $max_attempts ]; do
    if curl -s --head --request GET $url | grep "200 OK\|404 Not Found" > /dev/null; then
      echo -e "${GREEN}✓ Serveur $url répond${NC}"
      return 0
    else
      echo -e "${YELLOW}Tentative $attempt/$max_attempts: $url ne répond pas encore...${NC}"
      sleep 2
      attempt=$((attempt+1))
    fi
  done
  
  echo -e "${RED}✗ Serveur $url ne répond pas après $max_attempts tentatives${NC}"
  return 1
}

# Arrêt propre lors de Ctrl+C
cleanup() {
  echo -e "\n${YELLOW}Arrêt des serveurs...${NC}"
  
  if [ ! -z "$BACKEND_PID" ]; then
    echo -e "${YELLOW}Arrêt du backend (PID: $BACKEND_PID)...${NC}"
    kill $BACKEND_PID > /dev/null 2>&1
  fi
  
  if [ ! -z "$FRONTEND_PID" ]; then
    echo -e "${YELLOW}Arrêt du frontend (PID: $FRONTEND_PID)...${NC}"
    kill $FRONTEND_PID > /dev/null 2>&1 
  fi
  
  echo -e "${GREEN}Serveurs arrêtés, au revoir !${NC}"
  exit 0
}

trap cleanup SIGINT SIGTERM

# 1. Arrêt des processus existants
echo -e "${YELLOW}Nettoyage préliminaire...${NC}"
pkill -f "node.*backend" > /dev/null 2>&1
pkill -f "node.*frontend" > /dev/null 2>&1
pkill -f "vite" > /dev/null 2>&1
sleep 2

# 2. Vérification des ports
echo -e "${YELLOW}Vérification des ports...${NC}"
if check_port 5001; then
  kill_process_on_port 5001
fi

if check_port 3000; then
  kill_process_on_port 3000
fi

# 3. Nettoyage des caches
echo -e "${YELLOW}Nettoyage des caches...${NC}"
rm -rf frontend/node_modules/.vite 2>/dev/null
rm -rf frontend/.cache 2>/dev/null
rm -rf frontend/.eslintcache 2>/dev/null
rm -rf backend/.cache 2>/dev/null

# 4. Démarrage du backend
echo -e "${YELLOW}Démarrage du serveur backend...${NC}"
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# 5. Vérification que le backend démarre correctement
echo -e "${YELLOW}Attente du démarrage du backend...${NC}"
sleep 5
if ! ps -p $BACKEND_PID > /dev/null; then
  echo -e "${RED}Le backend n'a pas démarré correctement${NC}"
  echo -e "${RED}Consultez le fichier backend.log pour plus de détails${NC}"
  exit 1
fi

echo -e "${GREEN}Backend démarré avec PID: $BACKEND_PID${NC}"

# 6. Vérification que le backend répond
if ! check_server "http://localhost:5001/api" 10; then
  echo -e "${RED}Le backend ne répond pas. Consultez le fichier backend.log${NC}"
  # On continue quand même, le backend peut prendre plus de temps à démarrer
fi

# 7. Démarrage du frontend
echo -e "${YELLOW}Démarrage du serveur frontend...${NC}"
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# 8. Vérification que le frontend démarre correctement
echo -e "${YELLOW}Attente du démarrage du frontend...${NC}"
sleep 5
if ! ps -p $FRONTEND_PID > /dev/null; then
  echo -e "${RED}Le frontend n'a pas démarré correctement${NC}"
  echo -e "${RED}Consultez le fichier frontend.log pour plus de détails${NC}"
  cleanup
  exit 1
fi

echo -e "${GREEN}Frontend démarré avec PID: $FRONTEND_PID${NC}"

# 9. Vérification que le frontend répond
if ! check_server "http://localhost:3000" 15; then
  echo -e "${RED}Le frontend ne répond pas. Consultez le fichier frontend.log${NC}"
  cleanup
  exit 1
fi

# 10. Affichage des informations finales
echo -e "\n${GREEN}=========================================${NC}"
echo -e "${GREEN}✓ Application démarrée avec succès !${NC}"
echo -e "${GREEN}=========================================${NC}"
echo -e "${BLUE}Frontend : ${NC}http://localhost:3000"
echo -e "${BLUE}Backend  : ${NC}http://localhost:5001"
echo -e "${YELLOW}PIDs     : ${NC}Frontend=${FRONTEND_PID}, Backend=${BACKEND_PID}"
echo -e "${YELLOW}Logs     : ${NC}frontend.log, backend.log"
echo -e "${GREEN}=========================================${NC}"
echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter les serveurs${NC}\n"

# Attendre que l'utilisateur arrête le script
wait $BACKEND_PID $FRONTEND_PID 