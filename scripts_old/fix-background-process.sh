#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${RED}=====================================${NC}"
echo -e "${RED}RÉPARATION DU PROCESSUS D'ARRIÈRE-PLAN${NC}"
echo -e "${RED}=====================================${NC}"

# 1. Vérifier et nettoyer les processus Node.js zombies
echo -e "${YELLOW}Étape 1/6: Vérification des processus Node.js zombies...${NC}"
ZOMBIE_PROCS=$(ps aux | grep node | grep defunct | awk '{print $2}')
if [ -n "$ZOMBIE_PROCS" ]; then
    echo -e "${RED}Processus zombies détectés: $ZOMBIE_PROCS${NC}"
    for pid in $ZOMBIE_PROCS; do
        kill -9 $pid 2>/dev/null || true
    done
    echo -e "${GREEN}Processus zombies nettoyés.${NC}"
else
    echo -e "${GREEN}Aucun processus zombie détecté.${NC}"
fi

# 2. Vérifier et arrêter proprement les processus Node.js actifs
echo -e "${YELLOW}Étape 2/6: Arrêt propre des processus Node.js...${NC}"
NODE_PROCS=$(ps aux | grep node | grep -v grep | awk '{print $2}')
if [ -n "$NODE_PROCS" ]; then
    echo -e "${BLUE}Processus Node.js actifs: $NODE_PROCS${NC}"
    for pid in $NODE_PROCS; do
        echo -e "${BLUE}Arrêt du processus $pid...${NC}"
        kill $pid 2>/dev/null
        sleep 2
        if ps -p $pid > /dev/null; then
            echo -e "${RED}Le processus $pid ne répond pas, arrêt forcé...${NC}"
            kill -9 $pid 2>/dev/null
        else
            echo -e "${GREEN}Processus $pid arrêté correctement.${NC}"
        fi
    done
else
    echo -e "${GREEN}Aucun processus Node.js actif détecté.${NC}"
fi

# 3. Vérifier et réparer les modules manquants
echo -e "${YELLOW}Étape 3/6: Vérification des modules Node.js...${NC}"

# Vérifier et réparer le backend
echo -e "${BLUE}Vérification des modules backend...${NC}"
cd backend
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo -e "${RED}Modules backend manquants ou corrompus. Réinstallation...${NC}"
    rm -rf node_modules package-lock.json
    npm cache clean --force
    npm ci
    echo -e "${GREEN}Modules backend réinstallés.${NC}"
else
    echo -e "${GREEN}Modules backend OK.${NC}"
fi

# Vérifier et réparer le frontend
echo -e "${BLUE}Vérification des modules frontend...${NC}"
cd ../frontend
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.vite" ]; then
    echo -e "${RED}Modules frontend manquants ou corrompus. Réinstallation...${NC}"
    rm -rf node_modules package-lock.json
    npm cache clean --force
    npm ci
    echo -e "${GREEN}Modules frontend réinstallés.${NC}"
else
    echo -e "${GREEN}Modules frontend OK.${NC}"
fi

cd ..

# 4. Vérifier et corriger les permissions
echo -e "${YELLOW}Étape 4/6: Vérification des permissions...${NC}"
chmod -R 755 .
chmod -R 755 backend/node_modules 2>/dev/null || true
chmod -R 755 frontend/node_modules 2>/dev/null || true
chmod -R 755 backend/src
chmod -R 755 frontend/src
chmod -R 755 *.sh
echo -e "${GREEN}Permissions corrigées.${NC}"

# 5. Vérifier et corriger la connexion à MongoDB
echo -e "${YELLOW}Étape 5/6: Vérification de la connexion MongoDB...${NC}"
if command -v mongod >/dev/null 2>&1; then
    MONGO_STATUS=$(ps aux | grep mongod | grep -v grep)
    if [ -z "$MONGO_STATUS" ]; then
        echo -e "${RED}MongoDB n'est pas en cours d'exécution. Tentative de démarrage...${NC}"
        sudo systemctl start mongod 2>/dev/null || mongod --fork --logpath /tmp/mongod.log 2>/dev/null || true
        sleep 3
        if ps aux | grep mongod | grep -v grep >/dev/null; then
            echo -e "${GREEN}MongoDB démarré avec succès.${NC}"
        else
            echo -e "${RED}Impossible de démarrer MongoDB. Basculement vers MongoDB Memory Server...${NC}"
            # Ajout de MongoDB Memory Server dans backend/package.json si nécessaire
            if ! grep -q "mongodb-memory-server" backend/package.json; then
                cd backend
                npm install --save-dev mongodb-memory-server
                cd ..
            fi
        fi
    else
        echo -e "${GREEN}MongoDB est déjà en cours d'exécution.${NC}"
    fi
else
    echo -e "${YELLOW}MongoDB n'est pas installé localement. Utilisation de MongoDB Memory Server...${NC}"
    # Ajout de MongoDB Memory Server dans backend/package.json si nécessaire
    if ! grep -q "mongodb-memory-server" backend/package.json; then
        cd backend
        npm install --save-dev mongodb-memory-server
        cd ..
    fi
fi

# 6. Création des scripts de démarrage améliorés
echo -e "${YELLOW}Étape 6/6: Création des scripts de démarrage améliorés...${NC}"

# Script de démarrage backend fiable
cat > run-backend-reliable.sh << 'EOF'
#!/bin/bash
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

cd backend

echo -e "${YELLOW}Démarrage du serveur backend...${NC}"

# Vérification et nettoyage des processus existants sur le port 5001
EXISTING_PID=$(lsof -ti:5001)
if [ -n "$EXISTING_PID" ]; then
    echo -e "${RED}Port 5001 déjà utilisé par le processus $EXISTING_PID. Tentative d'arrêt...${NC}"
    kill $EXISTING_PID 2>/dev/null
    sleep 2
    if lsof -ti:5001 >/dev/null; then
        echo -e "${RED}Impossible de libérer le port 5001. Arrêt forcé...${NC}"
        kill -9 $(lsof -ti:5001) 2>/dev/null
        sleep 1
    fi
fi

# Vérification de l'environnement
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Fichier .env non trouvé. Création d'un fichier par défaut...${NC}"
    echo "PORT=5001" > .env
    echo "NODE_ENV=development" >> .env
    echo "MONGO_URI=mongodb://localhost:27017/entreprise-organiser" >> .env
    echo "JWT_SECRET=entreprise_organiser_secret_key_2025" >> .env
    echo "CORS_ORIGIN=http://localhost:3000" >> .env
fi

# Démarrage du serveur avec redémarrage automatique en cas d'erreur
echo -e "${GREEN}Démarrage du serveur backend sur http://localhost:5001${NC}"
echo -e "${BLUE}Logs du backend:${NC}"
while true; do
    node src/index.js
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 0 ]; then
        echo -e "${GREEN}Serveur backend arrêté normalement.${NC}"
        break
    else
        echo -e "${RED}Serveur backend arrêté avec le code d'erreur $EXIT_CODE. Redémarrage dans 3 secondes...${NC}"
        sleep 3
    fi
done
EOF
chmod +x run-backend-reliable.sh

# Script de démarrage frontend fiable
cat > run-frontend-reliable.sh << 'EOF'
#!/bin/bash
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

cd frontend

echo -e "${YELLOW}Démarrage du serveur frontend...${NC}"

# Vérification et nettoyage des processus existants sur le port 3000
EXISTING_PID=$(lsof -ti:3000)
if [ -n "$EXISTING_PID" ]; then
    echo -e "${RED}Port 3000 déjà utilisé par le processus $EXISTING_PID. Tentative d'arrêt...${NC}"
    kill $EXISTING_PID 2>/dev/null
    sleep 2
    if lsof -ti:3000 >/dev/null; then
        echo -e "${RED}Impossible de libérer le port 3000. Arrêt forcé...${NC}"
        kill -9 $(lsof -ti:3000) 2>/dev/null
        sleep 1
    fi
fi

# Vérification et correction du fichier package.json
if ! grep -q "\"dev\":" package.json; then
    echo -e "${RED}Script 'dev' manquant dans package.json. Correction...${NC}"
    sed -i 's/"scripts": {/"scripts": {\n    "dev": "vite",/g' package.json
fi

# Démarrage du serveur avec redémarrage automatique en cas d'erreur
echo -e "${GREEN}Démarrage du serveur frontend sur http://localhost:3000${NC}"
echo -e "${BLUE}Logs du frontend:${NC}"

# Définir le nombre maximal de tentatives
MAX_ATTEMPTS=3
ATTEMPT=1

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    echo -e "${YELLOW}Tentative $ATTEMPT/$MAX_ATTEMPTS${NC}"
    npm run dev
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 0 ]; then
        echo -e "${GREEN}Serveur frontend arrêté normalement.${NC}"
        break
    else
        echo -e "${RED}Serveur frontend arrêté avec le code d'erreur $EXIT_CODE.${NC}"
        if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
            echo -e "${YELLOW}Tentative de redémarrage dans 3 secondes...${NC}"
            sleep 3
        else
            echo -e "${RED}Nombre maximal de tentatives atteint. Essayez de démarrer le frontend avec 'npm run dev' manuellement.${NC}"
        fi
        ATTEMPT=$((ATTEMPT+1))
    fi
done
EOF
chmod +x run-frontend-reliable.sh

# Script de démarrage complet
cat > start-all.sh << 'EOF'
#!/bin/bash
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}==========================${NC}"
echo -e "${BLUE}DÉMARRAGE DE L'APPLICATION${NC}"
echo -e "${BLUE}==========================${NC}"

# Nettoyage des processus existants
echo -e "${YELLOW}Nettoyage des processus existants...${NC}"
pkill -f "node.*backend" 2>/dev/null
pkill -f "node.*frontend" 2>/dev/null
sleep 2

# Démarrage du backend en arrière-plan
echo -e "${YELLOW}Démarrage du backend...${NC}"
gnome-terminal --tab --title="Backend Server" --command="bash -c './run-backend-reliable.sh; bash'" 2>/dev/null || \
xterm -T "Backend Server" -e "bash -c './run-backend-reliable.sh; bash'" 2>/dev/null || \
konsole --new-tab -p tabtitle="Backend Server" -e "bash -c './run-backend-reliable.sh; bash'" 2>/dev/null || \
./run-backend-reliable.sh &

# Attendre que le backend soit démarré
echo -e "${YELLOW}Attente du démarrage du backend...${NC}"
for i in $(seq 1 10); do
    if curl -s http://localhost:5001 > /dev/null; then
        echo -e "${GREEN}Backend démarré avec succès!${NC}"
        break
    fi
    if [ $i -eq 10 ]; then
        echo -e "${RED}Timeout lors du démarrage du backend. Le frontend pourrait ne pas fonctionner correctement.${NC}"
    fi
    echo -e "${YELLOW}Tentative $i/10...${NC}"
    sleep 2
done

# Démarrage du frontend dans un nouvel onglet/terminal
echo -e "${YELLOW}Démarrage du frontend...${NC}"
gnome-terminal --tab --title="Frontend Server" --command="bash -c './run-frontend-reliable.sh; bash'" 2>/dev/null || \
xterm -T "Frontend Server" -e "bash -c './run-frontend-reliable.sh; bash'" 2>/dev/null || \
konsole --new-tab -p tabtitle="Frontend Server" -e "bash -c './run-frontend-reliable.sh; bash'" 2>/dev/null || \
./run-frontend-reliable.sh &

echo -e "${GREEN}==========================${NC}"
echo -e "${GREEN}APPLICATION DÉMARRÉE${NC}"
echo -e "${GREEN}==========================${NC}"
echo -e "${YELLOW}Backend: ${GREEN}http://localhost:5001${NC}"
echo -e "${YELLOW}Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "${GREEN}==========================${NC}"
EOF
chmod +x start-all.sh

# Instructions finales
echo -e "\n${GREEN}===============================================${NC}"
echo -e "${GREEN}RÉPARATION TERMINÉE!${NC}"
echo -e "${GREEN}===============================================${NC}"
echo -e "${YELLOW}Pour démarrer l'application, vous avez 3 options:${NC}"
echo -e "\n${BLUE}1. Démarrage complet (recommandé):${NC}"
echo -e "   ${GREEN}./start-all.sh${NC}"
echo -e "\n${BLUE}2. Démarrage séparé du backend:${NC}"
echo -e "   ${GREEN}./run-backend-reliable.sh${NC}"
echo -e "\n${BLUE}3. Démarrage séparé du frontend:${NC}"
echo -e "   ${GREEN}./run-frontend-reliable.sh${NC}"
echo -e "\n${YELLOW}⚠ ATTENTION:${NC} En cas de problème persistant, exécutez:"
echo -e "   ${RED}./fix-background-process.sh${NC} à nouveau"
echo -e "${GREEN}===============================================${NC}" 