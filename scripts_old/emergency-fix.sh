#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${RED}================================${NC}"
echo -e "${RED}RÉPARATION D'URGENCE DES SERVEURS${NC}"
echo -e "${RED}================================${NC}"

# 1. Arrêt agressif de tous les processus problématiques
echo -e "${YELLOW}Étape 1/5: Arrêt BRUTAL de tous les processus Node...${NC}"
pkill -9 -f node
pkill -9 -f npm
pkill -9 -f vite
sleep 3

# 2. Nettoyage des ports
echo -e "${YELLOW}Étape 2/5: Libération FORCÉE des ports...${NC}"
sudo fuser -k 3000/tcp 2>/dev/null || true
sudo fuser -k 5001/tcp 2>/dev/null || true
sleep 2

# 3. Nettoyage profond des fichiers temporaires
echo -e "${YELLOW}Étape 3/5: Nettoyage PROFOND des fichiers temporaires...${NC}"
rm -rf frontend/node_modules/.vite 2>/dev/null
rm -rf frontend/.cache frontend/.eslintcache 2>/dev/null
rm -rf frontend/dist 2>/dev/null
rm -rf backend/dist 2>/dev/null
rm -rf backend/.cache 2>/dev/null
rm -f *.log 2>/dev/null
rm -f backend.log frontend.log 2>/dev/null

# 4. Restauration des fichiers de configuration critiques
echo -e "${YELLOW}Étape 4/5: Restauration des configurations...${NC}"

# a) Corriger le service planningService.js
echo -e "import API from './api';

const PLANNING_URL = '/api/plannings';

// Récupérer tous les plannings
export const getAllPlannings = async () => {
  try {
    console.log('Requête getAllPlannings');
    const response = await API.get(PLANNING_URL);
    console.log('Réponse getAllPlannings:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur getAllPlannings:', error);
    throw error;
  }
};

// Récupérer un planning par ID
export const getPlanningById = async (id) => {
  try {
    console.log('Requête getPlanningById', id);
    const response = await API.get(\`\${PLANNING_URL}/\${id}\`);
    console.log('Réponse getPlanningById:', response.data);
    return response.data.planning;
  } catch (error) {
    console.error('Erreur getPlanningById:', error);
    throw error;
  }
};

// Créer un nouveau planning
export const createPlanning = async (planningData) => {
  try {
    console.log('Requête createPlanning:', planningData);
    const response = await API.post(PLANNING_URL, planningData);
    console.log('Réponse createPlanning:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur createPlanning:', error);
    throw error;
  }
};

// Mettre à jour un planning existant
export const updatePlanning = async (id, planningData) => {
  try {
    console.log('Requête updatePlanning:', id, planningData);
    const response = await API.put(\`\${PLANNING_URL}/\${id}\`, planningData);
    console.log('Réponse updatePlanning:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur updatePlanning:', error);
    throw error;
  }
};

// Supprimer un planning
export const deletePlanning = async (id) => {
  try {
    console.log('Requête deletePlanning:', id);
    const response = await API.delete(\`\${PLANNING_URL}/\${id}\`);
    console.log('Réponse deletePlanning:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur deletePlanning:', error);
    throw error;
  }
};
" > frontend/src/services/planningService.js

# b) Vérifier que les routes sont correctement configurées dans le backend
grep -q "app.use('/api/plannings', planningRoutes)" backend/src/index.js
if [ $? -ne 0 ]; then
  # La route n'existe pas au bon format, corrigeons-la
  sed -i "s|app.use('/plannings', planningRoutes)|app.use('/api/plannings', planningRoutes)|g" backend/src/index.js || true
  echo -e "${GREEN}Routes API backend corrigées${NC}"
fi

# 5. Démarrage des serveurs en mode très simple
echo -e "${YELLOW}Étape 5/5: Démarrage des serveurs en mode simplifié...${NC}"

# a) Créer un script pour démarrer le serveur backend
cat > run-backend.sh << 'EOF'
#!/bin/bash
cd backend
echo -e "\033[0;32mDémarrage du serveur backend...\033[0m"
echo -e "\033[0;33mServeur backend disponible sur http://localhost:5001\033[0m"
node src/index.js
EOF
chmod +x run-backend.sh

# b) Créer un script pour démarrer le serveur frontend
cat > run-frontend.sh << 'EOF'
#!/bin/bash
cd frontend
echo -e "\033[0;32mDémarrage du serveur frontend...\033[0m"
echo -e "\033[0;33mServeur frontend disponible sur http://localhost:3000\033[0m"
npm run dev
EOF
chmod +x run-frontend.sh

# c) Instructions finales
echo -e "\n${GREEN}===============================================${NC}"
echo -e "${GREEN}RÉPARATION TERMINÉE!${NC}"
echo -e "${GREEN}===============================================${NC}"
echo -e "${YELLOW}Pour démarrer l'application:${NC}"
echo -e "${BLUE}1. Ouvrez un premier terminal${NC}"
echo -e "${BLUE}   et exécutez: ${GREEN}./run-backend.sh${NC}"
echo -e "${BLUE}2. Ouvrez un second terminal${NC}" 
echo -e "${BLUE}   et exécutez: ${GREEN}./run-frontend.sh${NC}"
echo -e "${GREEN}===============================================${NC}"
echo -e "${YELLOW}⚠ IMPORTANT:${NC} Démarrez d'abord le backend dans un terminal"
echo -e "              puis le frontend dans un autre terminal"
echo -e "${GREEN}===============================================${NC}" 