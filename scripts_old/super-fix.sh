#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${MAGENTA}====================================================${NC}"
echo -e "${MAGENTA}RÉPARATION COMPLÈTE DE L'APPLICATION ENTREPRISE-ORGANISER${NC}"
echo -e "${MAGENTA}====================================================${NC}"

# Vérifier que tous les scripts nécessaires existent
echo -e "${YELLOW}Vérification des scripts de réparation...${NC}"

# Créer le script fix-background-process.sh s'il n'existe pas
if [ ! -f "fix-background-process.sh" ]; then
    echo -e "${RED}Script fix-background-process.sh manquant, création...${NC}"
    ./emergency-fix.sh
    exit 1
fi

# Créer le script fix-vite-config.sh s'il n'existe pas
if [ ! -f "fix-vite-config.sh" ]; then
    echo -e "${RED}Script fix-vite-config.sh manquant, veuillez l'exécuter séparément.${NC}"
    echo -e "${YELLOW}Continuons avec les scripts disponibles...${NC}"
fi

# Vérifier que les répertoires frontend et backend existent
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo -e "${RED}Répertoires frontend ou backend manquants. Vérifiez votre structure de projet.${NC}"
    exit 1
fi

# Étape 1: Arrêter tous les processus
echo -e "\n${CYAN}Étape 1/5: Arrêt de tous les processus NodeJS...${NC}"
echo "------------------------------------------------"
pkill -f node || true
pkill -f npm || true
pkill -f vite || true
sleep 3

# Libérer les ports
sudo fuser -k 3000/tcp 2>/dev/null || true
sudo fuser -k 5001/tcp 2>/dev/null || true
sleep 2

# Étape 2: Exécuter la réparation des processus d'arrière-plan
echo -e "\n${CYAN}Étape 2/5: Réparation des processus d'arrière-plan...${NC}"
echo "------------------------------------------------"
./fix-background-process.sh
if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors de la réparation des processus d'arrière-plan. Interruption.${NC}"
    exit 1
fi

# Étape 3: Corriger la configuration Vite si le script existe
echo -e "\n${CYAN}Étape 3/5: Amélioration de la configuration Vite...${NC}"
echo "------------------------------------------------"
if [ -f "fix-vite-config.sh" ]; then
    ./fix-vite-config.sh
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}Avertissement: Erreur lors de la correction de la configuration Vite.${NC}"
        echo -e "${YELLOW}Continuons avec les étapes suivantes...${NC}"
    fi
else
    echo -e "${YELLOW}Le script fix-vite-config.sh n'existe pas. Étape ignorée.${NC}"
fi

# Étape 4: Vérification et réparation du système MongoDB
echo -e "\n${CYAN}Étape 4/5: Vérification de MongoDB...${NC}"
echo "------------------------------------------------"
if command -v mongod >/dev/null 2>&1; then
    if ! ps aux | grep -v grep | grep -q mongod; then
        echo -e "${YELLOW}MongoDB n'est pas en cours d'exécution. Tentative de démarrage...${NC}"
        sudo systemctl start mongod 2>/dev/null || mongod --fork --logpath /tmp/mongod.log 2>/dev/null || true
        sleep 3
        if ps aux | grep -v grep | grep -q mongod; then
            echo -e "${GREEN}MongoDB démarré avec succès!${NC}"
        else
            echo -e "${RED}Impossible de démarrer MongoDB.${NC}"
            echo -e "${YELLOW}Installation de mongodb-memory-server comme alternative...${NC}"
            if ! grep -q "mongodb-memory-server" backend/package.json; then
                (cd backend && npm install --save-dev mongodb-memory-server)
            fi
        fi
    else
        echo -e "${GREEN}MongoDB est en cours d'exécution.${NC}"
    fi
else
    echo -e "${YELLOW}MongoDB n'est pas installé. Installation de mongodb-memory-server comme alternative...${NC}"
    if ! grep -q "mongodb-memory-server" backend/package.json; then
        (cd backend && npm install --save-dev mongodb-memory-server)
    fi
fi

# Étape 5: Créer un script pour démarrer l'application avec une surveillance
echo -e "\n${CYAN}Étape 5/5: Création du script de démarrage avec surveillance...${NC}"
echo "------------------------------------------------"

cat > start-with-monitoring.sh << 'EOF'
#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${MAGENTA}===============================================${NC}"
echo -e "${MAGENTA}DÉMARRAGE SÉCURISÉ AVEC SURVEILLANCE AUTOMATIQUE${NC}"
echo -e "${MAGENTA}===============================================${NC}"

# 1. Vérifier que MongoDB est en cours d'exécution
echo -e "${YELLOW}Vérification de MongoDB...${NC}"
if command -v mongod >/dev/null 2>&1; then
    if ! ps aux | grep -v grep | grep -q mongod; then
        echo -e "${RED}MongoDB n'est pas en cours d'exécution. Tentative de démarrage...${NC}"
        sudo systemctl start mongod 2>/dev/null || mongod --fork --logpath /tmp/mongod.log 2>/dev/null || true
        sleep 3
    fi
fi

# 2. Nettoyage des processus existants
echo -e "${YELLOW}Nettoyage des processus existants...${NC}"
pkill -f "node.*backend" 2>/dev/null || true
pkill -f "node.*frontend" 2>/dev/null || true
pkill -f "npm.*run.*dev" 2>/dev/null || true
sleep 2

# 3. Libération des ports
echo -e "${YELLOW}Libération des ports...${NC}"
sudo fuser -k 3000/tcp 2>/dev/null || true
sudo fuser -k 5001/tcp 2>/dev/null || true
sleep 1

# 4. Démarrage du backend
echo -e "${GREEN}Démarrage du backend...${NC}"
cd backend
node src/index.js > backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Vérifier que le backend a démarré correctement
echo -e "${YELLOW}Vérification du démarrage du backend...${NC}"
sleep 5
if ! ps -p $BACKEND_PID > /dev/null; then
    echo -e "${RED}Le backend n'a pas pu démarrer. Vérifiez backend.log pour plus de détails.${NC}"
    exit 1
fi

# 5. Démarrage du frontend
echo -e "${GREEN}Démarrage du frontend...${NC}"
cd frontend
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Vérifier que le frontend a démarré correctement
echo -e "${YELLOW}Vérification du démarrage du frontend...${NC}"
sleep 10
if ! ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${RED}Le frontend n'a pas pu démarrer. Vérifiez frontend.log pour plus de détails.${NC}"
    kill $BACKEND_PID
    exit 1
fi

# 6. Démarrage du moniteur de processus
echo -e "${GREEN}Démarrage du moniteur de processus...${NC}"
./process-monitor.sh > monitor.log 2>&1 &
MONITOR_PID=$!

# 7. Affichage des informations
echo -e "${MAGENTA}===============================================${NC}"
echo -e "${GREEN}APPLICATION DÉMARRÉE AVEC SUCCÈS!${NC}"
echo -e "${MAGENTA}===============================================${NC}"
echo -e "${YELLOW}Backend: ${GREEN}http://localhost:5001${NC}"
echo -e "${YELLOW}Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "${YELLOW}Surveillance: ${GREEN}Activée (PID: $MONITOR_PID)${NC}"
echo -e "${MAGENTA}===============================================${NC}"
echo -e "${BLUE}Pour arrêter l'application, exécutez:${NC}"
echo -e "${RED}pkill -f node${NC}"
echo -e "${MAGENTA}===============================================${NC}"

# 8. Ouvrir le navigateur
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open http://localhost:3000
elif command -v open >/dev/null 2>&1; then
    open http://localhost:3000
fi

# Attendre que l'utilisateur appuie sur Ctrl+C
echo "Appuyez sur Ctrl+C pour arrêter l'application..."
wait
EOF

chmod +x start-with-monitoring.sh

# Affichage des instructions finales
echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}RÉPARATION TERMINÉE AVEC SUCCÈS!${NC}"
echo -e "${GREEN}====================================================${NC}"
echo -e "${YELLOW}Pour démarrer votre application avec surveillance automatique:${NC}"
echo -e "${BLUE}./start-with-monitoring.sh${NC}"
echo -e "\n${YELLOW}Pour uniquement réparer en cas de problèmes futurs:${NC}"
echo -e "${BLUE}./fix-background-process.sh${NC}"
echo -e "\n${YELLOW}Pour réparer et améliorer la stabilité des connexions:${NC}"
echo -e "${BLUE}./fix-vite-config.sh${NC}"
echo -e "${GREEN}====================================================${NC}" 