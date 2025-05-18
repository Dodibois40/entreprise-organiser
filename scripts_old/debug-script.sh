#!/bin/bash

# Couleurs pour un meilleur affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Débogage de l'application Entreprise Organiser ===${NC}"

# Nettoyage complet
echo -e "${YELLOW}Arrêt total des processus Node...${NC}"
pkill -9 -f node
sleep 3

echo -e "${YELLOW}Nettoyage des ports...${NC}"
fuser -k -n tcp 3000 2>/dev/null
fuser -k -n tcp 5001 2>/dev/null
sleep 2

echo -e "${YELLOW}Vérification des ports libres...${NC}"
if lsof -i:3000 > /dev/null; then
  echo -e "${RED}Port 3000 toujours occupé - tentative d'arrêt forcé${NC}"
  lsof -i:3000 -t | xargs kill -9 2>/dev/null
  sleep 1
fi

if lsof -i:5001 > /dev/null; then
  echo -e "${RED}Port 5001 toujours occupé - tentative d'arrêt forcé${NC}"
  lsof -i:5001 -t | xargs kill -9 2>/dev/null
  sleep 1
fi

# Vérification de l'installation
echo -e "${YELLOW}Vérification de l'installation...${NC}"

# Vérification des dépendances
echo -e "${YELLOW}Vérification et réparation des dépendances frontend...${NC}"
cd frontend
npm install --force
cd ..

echo -e "${YELLOW}Vérification et réparation des dépendances backend...${NC}"
cd backend
npm install --force
cd ..

# Démarrage manuel simple des serveurs
echo -e "${YELLOW}Démarrage manuel du backend...${NC}"
cd backend
node src/index.js > ../backend_debug.log 2>&1 &
BACKEND_PID=$!
cd ..

echo -e "${YELLOW}Attente du démarrage du backend (10 secondes)...${NC}"
sleep 10

# Vérification manuelle du backend
echo -e "${YELLOW}Test manuel du backend...${NC}"
curl -v http://localhost:5001/api > backend_test.log 2>&1
BACKEND_TEST=$?

if [ $BACKEND_TEST -eq 0 ]; then
  echo -e "${GREEN}✓ Backend semble fonctionner correctement${NC}"
else
  echo -e "${RED}✗ Backend ne répond pas correctement${NC}"
  echo -e "${YELLOW}Démarrage du backend avec affichage direct des logs...${NC}"
  
  # Arrêt du backend si en cours
  if ps -p $BACKEND_PID > /dev/null; then
    kill $BACKEND_PID 2>/dev/null
    sleep 2
  fi
  
  echo -e "${YELLOW}ATTENTION: Ce terminal va maintenant afficher les logs du backend en direct.${NC}"
  echo -e "${YELLOW}Ouvrez un nouveau terminal pour démarrer le frontend.${NC}"
  echo -e "${YELLOW}Utilisez ./start-frontend.sh dans le nouveau terminal.${NC}"
  
  # Création d'un script pour démarrer le frontend
  cat > start-frontend.sh << 'EOF'
#!/bin/bash
cd frontend
echo "Démarrage du frontend..."
npm run dev
EOF
  chmod +x start-frontend.sh
  
  # Démarrage du backend en premier plan
  cd backend
  echo -e "${GREEN}Démarrage du backend en mode débogage...${NC}"
  exec node src/index.js
  exit 0
fi

# Si le backend fonctionne, on continue avec le frontend
echo -e "${YELLOW}Démarrage du frontend...${NC}"
cd frontend
npm run dev > ../frontend_debug.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo -e "${YELLOW}Attente du démarrage du frontend (15 secondes)...${NC}"
sleep 15

# Affichage des informations
echo -e "\n${GREEN}=============== INFORMATIONS DE DÉBOGAGE =================${NC}"
echo -e "${YELLOW}Backend PID: ${NC}$BACKEND_PID (Logs: backend_debug.log)"
echo -e "${YELLOW}Frontend PID: ${NC}$FRONTEND_PID (Logs: frontend_debug.log)"
echo -e "${YELLOW}Logs de test backend: ${NC}backend_test.log"
echo -e "${GREEN}=====================================================${NC}"
echo -e "${YELLOW}Après avoir terminé vos tests, utilisez cette commande pour arrêter:${NC}"
echo -e "${BLUE}pkill -f node${NC}"
echo -e "${GREEN}=====================================================${NC}"

echo -e "\n${YELLOW}Consultez les fichiers log pour plus de détails.${NC}"
echo -e "${YELLOW}Tentez d'accéder aux applications:${NC}"
echo -e "${BLUE}Frontend: ${NC}http://localhost:3000"
echo -e "${BLUE}Backend: ${NC}http://localhost:5001\n"

# On garde le script actif
wait $BACKEND_PID $FRONTEND_PID 