#!/bin/bash

# Couleurs pour un meilleur affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Correction des problèmes de planning ===${NC}"

# 1. Arrêt des processus existants
echo -e "${YELLOW}Arrêt des serveurs...${NC}"
pkill -f node
sleep 2

# 2. Réparation des chemins d'API
echo -e "${YELLOW}Vérification des chemins d'API...${NC}"

# Vérifier la présence du préfixe /api dans les URL du service planning
if grep -q "const PLANNING_URL = '/plannings'" frontend/src/services/planningService.js; then
  echo -e "${YELLOW}Correction du chemin API dans planningService.js${NC}"
  sed -i "s|const PLANNING_URL = '/plannings'|const PLANNING_URL = '/api/plannings'|g" frontend/src/services/planningService.js
  echo -e "${GREEN}✓ Chemin API corrigé${NC}"
else
  echo -e "${GREEN}✓ Chemin API déjà correct${NC}"
fi

# 3. Vérifier les routes du backend
echo -e "${YELLOW}Vérification des routes dans le backend...${NC}"
if ! grep -q "app.use('/api/plannings', planningRoutes)" backend/src/index.js; then
  if grep -q "app.use('/plannings', planningRoutes)" backend/src/index.js; then
    echo -e "${YELLOW}Correction des routes dans index.js${NC}"
    sed -i "s|app.use('/plannings', planningRoutes)|app.use('/api/plannings', planningRoutes)|g" backend/src/index.js
    echo -e "${GREEN}✓ Routes backend corrigées${NC}"
  else
    echo -e "${RED}⚠ Routes de planning non trouvées dans le backend${NC}"
  fi
else
  echo -e "${GREEN}✓ Routes backend déjà correctes${NC}"
fi

# 4. Nettoyage du localStorage des données de planning
echo -e "${YELLOW}Effacement des données localStorage du planning...${NC}"
echo "Si vous êtes sur Firefox, vous pouvez effacer manuellement en ouvrant les outils développeurs (F12) puis Application > LocalStorage, et supprimer les entrées commençant par 'planning_'."
echo "Si vous êtes sur Chrome, allez dans les outils développeurs (F12) puis Application > LocalStorage, et supprimer les entrées commençant par 'planning_'."

# 5. Démarrage de l'application avec le script fiable
echo -e "${YELLOW}Redémarrage de l'application...${NC}"
echo -e "${GREEN}=============================${NC}"
echo -e "${GREEN}Utilisation du script start-reliable.sh${NC}"
echo -e "${GREEN}=============================${NC}"

# Exécuter le script fiable
./start-reliable.sh 